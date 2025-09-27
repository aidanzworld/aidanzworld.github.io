import type { Metadata } from "next"
import AdminDashboardClient from "./AdminDashboardClient"

export const metadata: Metadata = {
  title: "Admin Dashboard - STC League",
  description: "Admin dashboard for managing the STC League",
}

export default function AdminDashboardPage() {
  return <AdminDashboardClient />
}
