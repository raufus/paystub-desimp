import { NextRequest, NextResponse } from "next/server"
import { getPaymentMethodConfig } from "@/lib/payment-methods"
import { getTransaction } from "@/lib/payment-transactions"
import Stripe from "stripe"

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

    // Get Stripe config
    const stripeConfig = await getPaymentMethodConfig("stripe")
    if (!stripeConfig?.publishable_key || !stripeConfig?.secret_key) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeConfig.secret_key, {
      apiVersion: "2023-10-16"
    })

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Paystub Package",
              description: `Transaction ID: ${transactionId}`
            },
            unit_amount: Math.round(transaction.amount * 100)
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout?success=true&transactionId=${transactionId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout?cancelled=true`,
      metadata: {
        transactionId: transactionId.toString(),
        orderId: transaction.order_id.toString()
      }
    })

    // Redirect to Stripe checkout
    return NextResponse.redirect(session.url || "")
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}
