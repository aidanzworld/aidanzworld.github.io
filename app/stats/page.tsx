import type { Metadata } from "next"
import StatsPageClient from "./StatsPageClient"

export const metadata: Metadata = {
  title: "Stats | Sports Talk Club",
  description: "Player and team statistics for Season 12 of the Sports Talk Club",
  openGraph: {
    title: "STC Stats",
    description: "Player and team statistics for Season 12 of the Sports Talk Club",
    images: ["/api/og?title=Statistics&subtitle=Player%20and%20Team%20Stats&bg=%23eab308&text=black"],
  },
  twitter: {
    card: "summary_large_image",
    title: "STC Stats",
    description: "Player and team statistics for Season 12 of the Sports Talk Club",
    images: ["/api/og?title=Statistics&subtitle=Player%20and%20Team%20Stats&bg=%23eab308&text=black"],
  },
}

export default function StatsPage() {
  return <StatsPageClient />
}
