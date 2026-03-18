import { NextRequest, NextResponse } from "next/server"
import { getPublishedBlogPosts } from "@/lib/blog"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "10")

    const posts = await getPublishedBlogPosts(limit)
    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Get blog posts error:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
