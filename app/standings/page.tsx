import type { Metadata } from "next"
import StandingsClientPage from "./StandingsClientPage"

export const metadata: Metadata = {
  title: "Standings | Sports Talk Club",
  description: "Current standings for Season 12 of the Sports Talk Club",
  openGraph: {
    title: "STC Standings",
    description: "Current standings for Season 12 of the Sports Talk Club",
    images: ["/api/og?title=Standings&subtitle=Season%2012%20Leaderboard&bg=%23000000&text=white"],
  },
  twitter: {
    card: "summary_large_image",
    title: "STC Standings",
    description: "Current standings for Season 12 of the Sports Talk Club",
    images: ["/api/og?title=Standings&subtitle=Season%2012%20Leaderboard&bg=%23000000&text=white"],
  },
}

export default function StandingsPage() {
  return <StandingsClientPage />
}
