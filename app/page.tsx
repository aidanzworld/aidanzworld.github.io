import type { Metadata } from "next"
import HomePageClient from "./HomePageClient"

export const metadata: Metadata = {
  title: "Home | Sports Talk Club",
  description: "The premier football league experience on Roblox - Season 13",
  openGraph: {
    title: "Sports Talk Club - Season 13",
    description: "The premier football league experience on Roblox",
    images: ["/api/og?title=Welcome&subtitle=Season%2013"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports Talk Club - Season 13",
    description: "The premier football league experience on Roblox",
    images: ["/api/og?title=Welcome&subtitle=Season%2013"],
  },
}

export default function Home() {
  return <HomePageClient />
}
