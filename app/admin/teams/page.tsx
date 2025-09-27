import type { Metadata } from "next"
import AdminTeamsClient from "./AdminTeamsClient"

export const metadata: Metadata = {
  title: "Team Management | Sports Talk Club Admin",
  description: "Manage teams for Sports Talk Club",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminTeamsPage() {
  return <AdminTeamsClient />
}
