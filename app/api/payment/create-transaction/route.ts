import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { insert, query } from "@/lib/db/mysql"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId, paymentMethod, amount, packageType } = await request.json()

    // Create order first
    const orderId = await insert(
      `INSERT INTO orders (user_id, package_type, amount, status, created_at, updated_at) 
       VALUES (?, ?, ?, 'pending', NOW(), NOW())`,
      [userId, packageType, amount]
    )

    // Create payment transaction
    const transactionId = await insert(
      `INSERT INTO payment_transactions 
       (user_id, order_id, payment_method, amount, currency, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, 'USD', 'pending', NOW(), NOW())`,
      [userId, orderId, paymentMethod, amount]
    )

    return NextResponse.json({
      success: true,
      transactionId,
      orderId
    })
  } catch (error) {
    console.error("Create transaction error:", error)
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}
