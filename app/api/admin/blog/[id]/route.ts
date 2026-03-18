import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { updateBlogPost, deleteBlogPost } from "@/lib/blog"
import { verifyAdminToken } from "@/lib/admin-auth"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies()
    const adminToken = cookieStore.get("admin_token")?.value

    if (!adminToken || !verifyAdminToken(adminToken)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()
    const result = await updateBlogPost(parseInt(id), data)

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update blog post error:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies()
    const adminToken = cookieStore.get("admin_token")?.value

    if (!adminToken || !verifyAdminToken(adminToken)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const result = await deleteBlogPost(parseInt(id))

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete blog post error:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
