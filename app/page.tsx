import type { Metadata } from "next"
import HomePageClient from "./HomePageClient"

export const metadata: Metadata = {
  title: "Home | Sports Talk Club",
  description: "The premier football league experience on Roblox - Season 12",
  openGraph: {
    title: "Sports Talk Club - Season 12",
    description: "The premier football league experience on Roblox",
    images: ["/api/og?title=Welcome&subtitle=Season%2012"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports Talk Club - Season 12",
    description: "The premier football league experience on Roblox",
    images: ["/api/og?title=Welcome&subtitle=Season%2012"],
  },
}

export default function Home() {
  return <HomePageClient />
}
