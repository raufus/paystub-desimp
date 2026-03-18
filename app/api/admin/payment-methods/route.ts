import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { query } from "@/lib/db/mysql"

// GET - Fetch all payment methods
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminToken = cookieStore.get("admin_token")?.value

    console.log("Admin token check:", adminToken ? "Present" : "Missing")

    if (!adminToken) {
      console.log("No admin token, returning 401")
      return NextResponse.json({ error: "Unauthorized", methods: [] }, { status: 401 })
    }

    const methods = await query("SELECT * FROM payment_methods") as any[]
    console.log("Payment methods fetched:", methods.length)

    return NextResponse.json({
      methods: methods.map(m => ({
        ...m,
        config: typeof m.config === 'string' ? JSON.parse(m.config) : m.config
      }))
    })
  } catch (error) {
    console.error("Get payment methods error:", error)
    return NextResponse.json({ error: "Failed to fetch payment methods", methods: [] }, { status: 500 })
  }
}

// PUT - Update payment methods
export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminToken = cookieStore.get("admin_token")?.value

    if (!adminToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { methods } = await request.json()

    for (const method of methods) {
      await query(
        "UPDATE payment_methods SET enabled = ?, config = ?, updated_at = NOW() WHERE id = ?",
        [method.enabled, JSON.stringify(method.config), method.id]
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update payment methods error:", error)
    return NextResponse.json({ error: "Failed to update payment methods" }, { status: 500 })
  }
}
