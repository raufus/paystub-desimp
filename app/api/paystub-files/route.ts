import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { query } from "@/lib/db/mysql"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user ID from token (you'll need to decode this properly)
    // For now, we'll get it from a query parameter or session
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = 20
    const offset = (page - 1) * limit

    // TODO: Extract userId from token properly
    // For now, this is a placeholder - you need to implement proper token decoding
    const userId = searchParams.get("userId")
    
    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const files = await query(
      `SELECT id, filename, employee_name, pay_date, gross_pay, net_pay, created_at 
       FROM paystub_files 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    ) as any[]

    const countResult = await query(
      "SELECT COUNT(*) as total FROM paystub_files WHERE user_id = ?",
      [userId]
    ) as any[]
    const total = countResult[0]?.total || 0

    return NextResponse.json({
      files: files || [],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error("Get paystub files error:", error)
    return NextResponse.json({ error: "Failed to fetch paystubs" }, { status: 500 })
  }
}
