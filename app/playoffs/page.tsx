import PlayoffsClientPage from "./PlayoffsClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Road to Vegas: STC Playoffs | Sports Talk Club",
  description: "Follow the playoff journey to STC Bowl XII at Allegiant Stadium in Las Vegas, Nevada",
  openGraph: {
    title: "Road to Vegas: STC Playoffs",
    description: "Follow the playoff journey to STC Bowl XII at Allegiant Stadium in Las Vegas, Nevada",
    images: ["/images/playoffs-vegas.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Road to Vegas: STC Playoffs",
    description: "Follow the playoff journey to STC Bowl XII at Allegiant Stadium in Las Vegas, Nevada",
    images: ["/images/playoffs-vegas.png"],
  },
}

export default function PlayoffsPage() {
  return <PlayoffsClientPage />
}
