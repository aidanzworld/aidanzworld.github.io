import type { Metadata } from "next"
import DraftTrackerClient from "./DraftTrackerClient"

export const metadata: Metadata = {
  title: "Draft Tracker | Sports Talk Club",
  description: "Live draft tracker for Season 13 of the Sports Talk Club",
  openGraph: {
    title: "STC Draft Tracker",
    description: "Live draft tracker for Season 13 of the Sports Talk Club",
    images: ["/api/og?title=Draft%20Tracker&subtitle=Season%2013%20Draft&bg=%23000000&text=white"],
  },
  twitter: {
    card: "summary_large_image",
    title: "STC Draft Tracker",
    description: "Live draft tracker for Season 13 of the Sports Talk Club",
    images: ["/api/og?title=Draft%20Tracker&subtitle=Season%2013%20Draft&bg=%23000000&text=white"],
  },
}

export default function DraftPage() {
  return <DraftTrackerClient />
}
