"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { newsItems, type NewsItem } from "@/lib/news-data"
import { ArrowLeft, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NewsArticleClient({ params }: { params: { slug: string } }) {
  const [isClient, setIsClient] = useState(false)
  const [article, setArticle] = useState<NewsItem | null>(null)
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([])
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    try {
      setIsClient(true)

      if (!params.slug) {
        console.error("No slug provided")
        setError(true)
        return
      }

      // Normalize the slug for comparison
      const normalizedSlug = params.slug.trim().toLowerCase()

      // Log all available slugs for debugging
      console.log(
        "Available slugs:",
        newsItems.map((item) => item.slug.trim().toLowerCase()),
      )
      console.log("Looking for slug:", normalizedSlug)

      // Find the article with case-insensitive matching
      const foundArticle = newsItems.find((item) => item.slug.trim().toLowerCase() === normalizedSlug)

      console.log("Found article:", foundArticle ? foundArticle.title : "Not found")

      if (foundArticle) {
        setArticle(foundArticle)

        // Get related news (excluding current article)
        const latest = newsItems.filter((item) => item.id !== foundArticle.id).slice(0, 3)
        setRelatedNews(latest)
      } else {
        // If article not found, set error state
        setError(true)
      }
    } catch (err) {
      console.error("Error loading article:", err)
      setError(true)
    }
  }, [params.slug])

  if (!isClient) {
    return null // Prevent SSR flash
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link href="/news">
          <Button>Back to News</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/news" className="inline-flex items-center text-[#CE1126] hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to News
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
          <Image
            src={article.image || "/placeholder.svg?height=600&width=800"}
            alt={article.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="flex items-center mb-6">
          <span
            className={`inline-block ${
              article.category === "breaking"
                ? "bg-[#CE1126] text-white"
                : article.category === "player"
                  ? "bg-yellow-400 text-black"
                  : article.category === "team"
                    ? "bg-[#003B66] text-white"
                    : "bg-green-500 text-white"
            } px-3 py-1 text-sm font-semibold rounded-full mr-3`}
          >
            {article.category === "breaking"
              ? "Breaking News"
              : article.category === "player"
                ? "Player Spotlight"
                : article.category === "team"
                  ? "Team Update"
                  : "Event"}
          </span>
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">{article.date}</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

        <div
          className="article-content prose max-w-none text-gray-800 leading-relaxed mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {relatedNews.length > 0 && (
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Related News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((news) => (
                <div key={news.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-40 relative">
                    <Image
                      src={news.image || "/placeholder.svg?height=300&width=500"}
                      alt={news.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{news.title}</h3>
                    <Link href={`/news/${news.slug}`}>
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
