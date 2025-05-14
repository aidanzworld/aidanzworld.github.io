import type { Metadata } from "next"
import TeamsClientPage from "./TeamsClientPage"

export const metadata: Metadata = {
  title: "Teams | Sports Talk Club",
  description: "View all teams competing in Season 13 of the Sports Talk Club",
  openGraph: {
    title: "STC Teams",
    description: "View all teams competing in Season 13 of the Sports Talk Club",
    images: ["/api/og?title=Teams&subtitle=AFC%20and%20NFC%20Teams&bg=%23003B66"],
  },
  twitter: {
    card: "summary_large_image",
    title: "STC Teams",
    description: "View all teams competing in Season 13 of the Sports Talk Club",
    images: ["/api/og?title=Teams&subtitle=AFC%20and%20NFC%20Teams&bg=%23003B66"],
  },
}

export default function TeamsPage() {
  return <TeamsClientPage />
}
