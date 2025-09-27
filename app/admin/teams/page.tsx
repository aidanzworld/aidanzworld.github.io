import type { Metadata } from "next"
import AdminTeamsClient from "./AdminTeamsClient"

export const metadata: Metadata = {
  title: "Team Management - STC League Admin",
  description: "Manage teams in the Sports Talk Club League",
}

export default function AdminTeamsPage() {
  return <AdminTeamsClient />
}
