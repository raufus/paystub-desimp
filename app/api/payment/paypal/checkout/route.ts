import { NextRequest, NextResponse } from "next/server"
import { getPaymentMethodConfig } from "@/lib/payment-methods"
import { getTransaction } from "@/lib/payment-transactions"
import { query } from "@/lib/db/mysql"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const transactionId = searchParams.get("transactionId")

    if (!transactionId) {
      return NextResponse.json({ error: "Missing transaction ID" }, { status: 400 })
    }

    // Get transaction details
    const transaction = await getTransaction(parseInt(transactionId))
    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    // Get PayPal config
    const paypalConfig = await getPaymentMethodConfig("paypal")
    if (!paypalConfig?.client_id) {
      return NextResponse.json({ error: "PayPal not configured" }, { status: 500 })
    }

    // Get user email
    const userResult = await query(
      "SELECT email FROM users WHERE id = ?",
      [transaction.user_id]
    ) as any[]
    const userEmail = userResult[0]?.email || "customer@example.com"

    // Create PayPal order
    const auth = Buffer.from(`${paypalConfig.client_id}:${paypalConfig.secret}`).toString("base64")
    
    const orderResponse = await fetch("https://api.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: transaction.amount.toString()
            },
            description: "Paystub Document"
          }
        ],
        payer: {
          email_address: userEmail
        },
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/order-confirmation?transactionId=${transactionId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout`
      })
    })

    if (!orderResponse.ok) {
      throw new Error("Failed to create PayPal order")
    }

    const order = await orderResponse.json()
    
    // Find approval link
    const approvalLink = order.links?.find((link: any) => link.rel === "approve")?.href
    if (!approvalLink) {
      throw new Error("No approval link in PayPal response")
    }

    // Redirect to PayPal
    return NextResponse.redirect(approvalLink)
  } catch (error) {
    console.error("PayPal checkout error:", error)
    return NextResponse.json({ error: "Checkout failed: " + (error instanceof Error ? error.message : "Unknown error") }, { status: 500 })
  }
}
