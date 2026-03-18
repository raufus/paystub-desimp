import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { query } from "@/lib/db/mysql"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminToken = cookieStore.get("admin_token")?.value

    if (!adminToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = 20
    const offset = (page - 1) * limit

    const transactions = await query(
      `SELECT pt.*, u.email FROM payment_transactions pt 
       JOIN users u ON pt.user_id = u.id 
       ORDER BY pt.created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    ) as any[]

    const countResult = await query("SELECT COUNT(*) as total FROM payment_transactions") as any[]
    const total = countResult[0]?.total || 0

    return NextResponse.json({
      transactions: transactions || [],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error("Get payments error:", error)
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}
