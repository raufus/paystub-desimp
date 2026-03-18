import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAllServices, createService } from "@/lib/services"
import { verifyAdminToken } from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminToken = cookieStore.get("admin_token")?.value

    if (!adminToken || !verifyAdminToken(adminToken)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    const result = await getAllServices(page, limit)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Get services error:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminToken = cookieStore.get("admin_token")?.value

    if (!adminToken || !verifyAdminToken(adminToken)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const result = await createService(data)

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error("Create service error:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
