import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAllBlogPosts, createBlogPost } from "@/lib/blog"
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

    const result = await getAllBlogPosts(page, limit)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Get blog posts error:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
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
    const result = await createBlogPost(data)

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error("Create blog post error:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
