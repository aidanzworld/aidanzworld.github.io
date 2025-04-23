import { newsItems } from "@/lib/news-data"
import NewsArticleClientPage from "./NewsArticleClientPage"
import type { Metadata } from "next"

// Generate metadata for each news article
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = newsItems.find(
    (item) => item.slug === params.slug || item.slug.toLowerCase() === params.slug.toLowerCase(),
  )

  if (!article) {
    return {
      title: "Article Not Found | Sports Talk Club",
      description: "The article you're looking for doesn't exist or has been removed.",
    }
  }

  return {
    title: `${article.title} | Sports Talk Club News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  }
}

// Generate static paths for all articles
export async function generateStaticParams() {
  return newsItems.map((item) => ({
    slug: item.slug,
  }))
}

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  return <NewsArticleClientPage params={params} />
}
