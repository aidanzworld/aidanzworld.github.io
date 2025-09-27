import type { Metadata } from "next"
import AdminGamesClient from "./AdminGamesClient"

export const metadata: Metadata = {
  title: "Game Management - STC League Admin",
  description: "Manage games and scores in the Sports Talk Club League",
}

export default function AdminGamesPage() {
  return <AdminGamesClient />
}
