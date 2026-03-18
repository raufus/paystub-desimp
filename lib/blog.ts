"use server"

import { query, queryOne, insert } from "./db/mysql"

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  featured_image: string
  status: "draft" | "published"
  views: number
  created_at: string
  updated_at: string
}

// Get all published blog posts
export async function getPublishedBlogPosts(limit?: number) {
  try {
    let sql = "SELECT * FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC"
    const params: any[] = []
    
    if (limit) {
      sql += " LIMIT ?"
      params.push(limit)
    }
    
    const posts = await query(sql, params) as BlogPost[]
    return posts || []
  } catch (error) {
    console.error("Get published blog posts error:", error)
    return []
  }
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await queryOne(
      "SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'",
      [slug]
    ) as BlogPost
    
    if (post) {
      // Increment views
      await query("UPDATE blog_posts SET views = views + 1 WHERE id = ?", [post.id])
    }
    
    return post
  } catch (error) {
    console.error("Get blog post by slug error:", error)
    return null
  }
}

// Get all blog posts (admin)
export async function getAllBlogPosts(page: number = 1, limit: number = 10) {
  try {
    const offset = (page - 1) * limit
    const posts = await query(
      "SELECT * FROM blog_posts ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [limit, offset]
    ) as BlogPost[]

    const countResult = await query("SELECT COUNT(*) as total FROM blog_posts") as any[]
    const total = countResult[0]?.total || 0

    return {
      posts: posts || [],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error("Get all blog posts error:", error)
    return { posts: [], total: 0, page, limit, pages: 0 }
  }
}

// Create blog post
export async function createBlogPost(data: Omit<BlogPost, 'id' | 'views' | 'created_at' | 'updated_at'>) {
  try {
    const id = await insert(
      `INSERT INTO blog_posts (title, slug, excerpt, content, author, featured_image, status, views, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())`,
      [data.title, data.slug, data.excerpt, data.content, data.author, data.featured_image, data.status]
    )
    return { success: true, id }
  } catch (error) {
    console.error("Create blog post error:", error)
    return { error: "Failed to create blog post" }
  }
}

// Update blog post
export async function updateBlogPost(id: number, data: Partial<BlogPost>) {
  try {
    const updates: string[] = []
    const values: any[] = []

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'views' && key !== 'created_at') {
        updates.push(`${key} = ?`)
        values.push(value)
      }
    })

    values.push(id)
    updates.push("updated_at = NOW()")

    await query(
      `UPDATE blog_posts SET ${updates.join(', ')} WHERE id = ?`,
      values
    )
    return { success: true }
  } catch (error) {
    console.error("Update blog post error:", error)
    return { error: "Failed to update blog post" }
  }
}

// Delete blog post
export async function deleteBlogPost(id: number) {
  try {
    await query("DELETE FROM blog_posts WHERE id = ?", [id])
    return { success: true }
  } catch (error) {
    console.error("Delete blog post error:", error)
    return { error: "Failed to delete blog post" }
  }
}
