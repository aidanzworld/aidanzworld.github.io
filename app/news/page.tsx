import type { Metadata } from "next"
import NewsPageClient from "./NewsPageClient"

export const metadata: Metadata = {
  title: "News | Sports Talk Club",
  description: "Latest news and updates from Season 12 of the Sports Talk Club",
  openGraph: {
    title: "STC News",
    description: "Latest news and updates from Season 12 of the Sports Talk Club",
    images: ["/api/og?title=League%20News&subtitle=Latest%20Updates%20and%20Stories&bg=%23003B66"],
  },
  twitter: {
    card: "summary_large_image",
    title: "STC News",
    description: "Latest news and updates from Season 12 of the Sports Talk Club",
    images: ["/api/og?title=League%20News&subtitle=Latest%20Updates%20and%20Stories&bg=%23003B66"],
  },
}

export default function NewsPage() {
  return <NewsPageClient />
}
