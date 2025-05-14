import PlayoffsClientPage from "./PlayoffsClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Playoffs Coming Soon | Sports Talk Club",
  description: "The Season 13 playoff picture will be available as the season progresses",
  openGraph: {
    title: "STC Season 13 Playoffs - Coming Soon",
    description: "The Season 13 playoff picture will be available as the season progresses",
    images: ["/api/og?title=Playoffs&subtitle=Coming%20Soon&bg=%23a855f7&text=white"],
  },
  twitter: {
    card: "summary_large_image",
    title: "STC Season 13 Playoffs - Coming Soon",
    description: "The Season 13 playoff picture will be available as the season progresses",
    images: ["/api/og?title=Playoffs&subtitle=Coming%20Soon&bg=%23a855f7&text=white"],
  },
}

export default function PlayoffsPage() {
  return <PlayoffsClientPage />
}
