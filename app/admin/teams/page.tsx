import type { Metadata } from "next"
import AdminTeamsClient from "./AdminTeamsClient"

export const metadata: Metadata = {
  title: "Team Management - STC League Admin",
  description: "Manage teams in the STC League",
}

export default function AdminTeamsPage() {
  return <AdminTeamsClient />
}
