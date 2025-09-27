import type { Metadata } from "next"
import AdminDashboardClient from "./AdminDashboardClient"

export const metadata: Metadata = {
  title: "Admin Dashboard | Sports Talk Club",
  description: "Admin dashboard for Sports Talk Club management",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminDashboardPage() {
  return <AdminDashboardClient />
}
