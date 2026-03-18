import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { savePaystubFile } from "@/lib/paystub-files"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const {
      userId,
      htmlContent,
      filename,
      transactionId,
      orderId,
      employeeName,
      payDate,
      grossPay,
      netPay
    } = await request.json()

    if (!userId || !htmlContent || !filename) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await savePaystubFile(
      userId,
      htmlContent,
      filename,
      transactionId,
      orderId,
      employeeName,
      payDate,
      grossPay,
      netPay
    )

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true, fileId: result.fileId })
  } catch (error) {
    console.error("Save paystub error:", error)
    return NextResponse.json({ error: "Failed to save paystub" }, { status: 500 })
  }
}
