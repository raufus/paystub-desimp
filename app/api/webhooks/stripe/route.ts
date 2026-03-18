import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db/mysql"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16"
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature") || ""

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Handle different event types
    switch (event.type) {
      case "charge.succeeded":
        await handleChargeSucceeded(event.data.object as Stripe.Charge)
        break

      case "charge.failed":
        await handleChargeFailed(event.data.object as Stripe.Charge)
        break

      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break

      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

async function handleChargeSucceeded(charge: Stripe.Charge) {
  try {
    console.log("Charge succeeded:", charge.id)

    // Get metadata from charge
    const transactionId = charge.metadata?.transactionId
    const orderId = charge.metadata?.orderId

    if (!transactionId) {
      console.warn("No transactionId in charge metadata")
      return
    }

    // Update transaction status
    await query(
      "UPDATE payment_transactions SET status = 'completed', transaction_id = ? WHERE id = ?",
      [charge.id, transactionId]
    )

    // Update order status
    if (orderId) {
      await query(
        "UPDATE orders SET status = 'completed' WHERE id = ?",
        [orderId]
      )
    }

    console.log("Transaction and order updated successfully")
  } catch (error) {
    console.error("Error handling charge succeeded:", error)
  }
}

async function handleChargeFailed(charge: Stripe.Charge) {
  try {
    console.log("Charge failed:", charge.id)

    const transactionId = charge.metadata?.transactionId

    if (!transactionId) {
      console.warn("No transactionId in charge metadata")
      return
    }

    // Update transaction status to failed
    await query(
      "UPDATE payment_transactions SET status = 'failed', transaction_id = ? WHERE id = ?",
      [charge.id, transactionId]
    )

    console.log("Transaction marked as failed")
  } catch (error) {
    console.error("Error handling charge failed:", error)
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log("Payment intent succeeded:", paymentIntent.id)

    const transactionId = paymentIntent.metadata?.transactionId
    const orderId = paymentIntent.metadata?.orderId

    if (!transactionId) {
      console.warn("No transactionId in payment intent metadata")
      return
    }

    // Update transaction status
    await query(
      "UPDATE payment_transactions SET status = 'completed', transaction_id = ? WHERE id = ?",
      [paymentIntent.id, transactionId]
    )

    // Update order status
    if (orderId) {
      await query(
        "UPDATE orders SET status = 'completed' WHERE id = ?",
        [orderId]
      )
    }

    console.log("Payment intent transaction updated successfully")
  } catch (error) {
    console.error("Error handling payment intent succeeded:", error)
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log("Payment intent failed:", paymentIntent.id)

    const transactionId = paymentIntent.metadata?.transactionId

    if (!transactionId) {
      console.warn("No transactionId in payment intent metadata")
      return
    }

    // Update transaction status to failed
    await query(
      "UPDATE payment_transactions SET status = 'failed', transaction_id = ? WHERE id = ?",
      [paymentIntent.id, transactionId]
    )

    console.log("Payment intent marked as failed")
  } catch (error) {
    console.error("Error handling payment intent failed:", error)
  }
}
