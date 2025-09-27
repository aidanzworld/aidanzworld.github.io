import type { Metadata } from "next"
import AdminDashboardClient from "./AdminDashboardClient"

export const metadata: Metadata = {
  title: "Admin Dashboard - STC League",
  description: "Sports Talk Club League administration dashboard",
}

export default function AdminDashboardPage() {
  return <AdminDashboardClient />
}
