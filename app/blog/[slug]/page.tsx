import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Calendar, User } from "lucide-react"
import Link from "next/link"

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts(100)
  return posts.map(post => ({
    slug: post.slug
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found"
    }
  }

  return {
    title: `${post.title} | Paystub Generator`,
    description: post.excerpt
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-primary hover:underline mb-8 inline-block">
          ← Back to Blog
        </Link>

        <article>
          {post.featured_image && (
            <div className="w-full h-96 bg-muted rounded-lg overflow-hidden mb-8">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap gap-6 text-muted-foreground mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{post.views} views</span>
            </div>
          </div>

          <div className="prose prose-sm max-w-none mb-12">
            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {post.content}
            </div>
          </div>

          <Card className="bg-muted">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">About the Author</h3>
              <p className="text-sm text-muted-foreground">{post.author}</p>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  )
}
