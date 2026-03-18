import { NextRequest, NextResponse } from "next/server"
import { getActiveServices } from "@/lib/services"

export async function GET(request: NextRequest) {
  try {
    const services = await getActiveServices()
    return NextResponse.json({ services })
  } catch (error) {
    console.error("Get services error:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}
