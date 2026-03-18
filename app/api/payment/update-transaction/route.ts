import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { query } from "@/lib/db/mysql"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { transactionId, status, externalTransactionId } = await request.json()

    await query(
      "UPDATE payment_transactions SET status = ?, transaction_id = ?, updated_at = NOW() WHERE id = ?",
      [status, externalTransactionId || null, transactionId]
    )

    // If payment completed, update order status
    if (status === "completed") {
      await query(
        "UPDATE orders SET status = 'completed' WHERE id = (SELECT order_id FROM payment_transactions WHERE id = ?)",
        [transactionId]
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update transaction error:", error)
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 })
  }
}
