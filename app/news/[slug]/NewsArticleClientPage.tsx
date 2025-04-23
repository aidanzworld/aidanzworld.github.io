"use client"
import { ErrorBoundary } from "react-error-boundary"
import NewsArticleClient from "./NewsArticleClient"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function ErrorFallback() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-8">We're sorry, but there was an error loading this article.</p>
      <Link href="/news">
        <Button>Back to News</Button>
      </Link>
    </div>
  )
}

export default function NewsArticleClientPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <style jsx global>{`
        .article-content h1, 
        .article-content h2, 
        .article-content h3, 
        .article-content h4, 
        .article-content h5, 
        .article-content h6 {
          font-weight: 700;
          color: black;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        .article-content h1 {
          font-size: 2rem;
        }
        .article-content h2 {
          font-size: 1.5rem;
        }
        .article-content h3 {
          font-size: 1.25rem;
        }
        .article-content p {
          margin-bottom: 1rem;
        }
        .article-content a {
          color: #CE1126;
          text-decoration: underline;
        }
        .article-content a:hover {
          text-decoration: none;
        }
        .article-content ul, .article-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .article-content ul {
          list-style-type: disc;
        }
        .article-content ol {
          list-style-type: decimal;
        }
        .article-content blockquote {
          border-left: 4px solid #e2e8f0;
          padding-left: 1rem;
          font-style: italic;
          margin: 1rem 0;
        }
      `}</style>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <NewsArticleClient params={params} />
      </ErrorBoundary>
    </>
  )
}
