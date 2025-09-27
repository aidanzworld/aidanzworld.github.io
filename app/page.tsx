import type { Metadata } from "next"
import HomePageClient from "./HomePageClient"

export const metadata: Metadata = {
  title: "Sports Talk Club | Season 14",
  description: "The premier football league featuring 10 competitive teams in Season 14",
  openGraph: {
    title: "Sports Talk Club - Season 14",
    description: "The premier football league featuring 10 competitive teams in Season 14",
    images: ["/api/og?title=Sports%20Talk%20Club&subtitle=Season%2014&bg=%23DC2626&text=white"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports Talk Club - Season 14",
    description: "The premier football league featuring 10 competitive teams in Season 14",
    images: ["/api/og?title=Sports%20Talk%20Club&subtitle=Season%2014&bg=%23DC2626&text=white"],
  },
}

export default function HomePage() {
  return <HomePageClient />
}
