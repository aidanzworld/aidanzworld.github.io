import { newsItems } from "@/lib/news-data"
import { redirect } from "next/navigation"

export default function ArticleCatchAll() {
  // Redirect to the first article as a fallback
  redirect(`/news/${newsItems[0].slug}`)
}
