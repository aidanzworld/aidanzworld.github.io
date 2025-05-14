import type { Metadata } from "next"
import ScheduleClientPage from "./ScheduleClientPage"

export const metadata: Metadata = {
  title: "Schedule | Sports Talk Club",
  description: "Season 13 game schedule for the Sports Talk Club",
  openGraph: {
    title: "STC Schedule",
    description: "Season 13 game schedule for the Sports Talk Club",
    images: ["/api/og?title=Schedule&subtitle=Season%2013%20Games&bg=%23CE1126&text=white"],
  },
  twitter: {
    card: "summary_large_image",
    title: "STC Schedule",
    description: "Season 13 game schedule for the Sports Talk Club",
    images: ["/api/og?title=Schedule&subtitle=Season%2013%20Games&bg=%23CE1126&text=white"],
  },
}

export default function SchedulePage() {
  return <ScheduleClientPage />
}
