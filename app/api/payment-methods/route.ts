import { NextResponse } from "next/server"
import { query } from "@/lib/db/mysql"

export async function GET() {
  try {
    const methods = await query("SELECT id, name, slug, enabled FROM payment_methods WHERE enabled = true") as any[]

    return NextResponse.json({
      methods: methods || []
    })
  } catch (error) {
    console.error("Get payment methods error:", error)
    return NextResponse.json({ error: "Failed to fetch payment methods" }, { status: 500 })
  }
}
