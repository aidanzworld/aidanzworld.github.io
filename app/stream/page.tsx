import type { Metadata } from "next"
import StreamPageClient from "./StreamPageClient"

export const metadata: Metadata = {
  title: "STC Bowl XII Live Stream | Sports Talk Club",
  description: "Watch the STC Bowl XII live from Allegiant Stadium in Las Vegas",
  openGraph: {
    title: "STC Bowl XII Live Stream",
    description: "Watch the STC Bowl XII live from Allegiant Stadium in Las Vegas",
    images: ["/images/playoffs-vegas.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "STC Bowl XII Live Stream",
    description: "Watch the STC Bowl XII live from Allegiant Stadium in Las Vegas",
    images: ["/images/playoffs-vegas.png"],
  },
}

export default function StreamPage() {
  return <StreamPageClient />
}
