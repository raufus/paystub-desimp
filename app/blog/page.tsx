import { getPublishedBlogPosts } from "@/lib/blog"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Eye } from "lucide-react"

export const metadata = {
  title: "Blog | Paystub Generator",
  description: "Read our latest articles about payroll, taxes, and document generation"
}

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Latest articles about payroll, taxes, and document generation
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  {post.featured_image && (
                    <div className="w-full h-48 bg-muted overflow-hidden rounded-t-lg">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <h3 className="font-semibold text-lg line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.author}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        {post.views}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      Read More
                      <ArrowRight size={16} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
