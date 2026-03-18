import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { queryOne, query } from "@/lib/db/mysql"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const fileId = parseInt(params.id)
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const file = await queryOne(
      "SELECT * FROM paystub_files WHERE id = ? AND user_id = ?",
      [fileId, userId]
    ) as any

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Return HTML file
    return new NextResponse(file.html_content, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="${file.filename}"`
      }
    })
  } catch (error) {
    console.error("Download paystub error:", error)
    return NextResponse.json({ error: "Failed to download paystub" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const fileId = parseInt(params.id)
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // Verify ownership
    const file = await queryOne(
      "SELECT id FROM paystub_files WHERE id = ? AND user_id = ?",
      [fileId, userId]
    )

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Delete file
    await query("DELETE FROM paystub_files WHERE id = ?", [fileId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete paystub error:", error)
    return NextResponse.json({ error: "Failed to delete paystub" }, { status: 500 })
  }
}
