import { MetadataRoute } from "next"
import { getPublishedBlogPosts } from "@/lib/blog"
import { getActiveServices } from "@/lib/services"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/create-paystub`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/create-w2`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/create-1099`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/create-tax-return`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    }
  ]

  // Blog posts
  const blogPosts = await getPublishedBlogPosts(100)
  const blogSitemap: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }))

  // Services
  const services = await getActiveServices()
  const servicesSitemap: MetadataRoute.Sitemap = services.map(service => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }))

  return [...staticPages, ...blogSitemap, ...servicesSitemap]
}
