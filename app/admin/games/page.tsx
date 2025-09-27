import type { Metadata } from "next"
import AdminGamesClient from "./AdminGamesClient"

export const metadata: Metadata = {
  title: "Game Management | Sports Talk Club Admin",
  description: "Manage games and scores for Sports Talk Club",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminGamesPage() {
  return <AdminGamesClient />
}
