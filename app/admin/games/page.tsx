import type { Metadata } from "next"
import AdminGamesClient from "./AdminGamesClient"

export const metadata: Metadata = {
  title: "Game Management - STC League Admin",
  description: "Manage games and scores in the STC League",
}

export default function AdminGamesPage() {
  return <AdminGamesClient />
}
