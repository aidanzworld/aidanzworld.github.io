import type { Metadata } from "next"
import AdminLoginClient from "./AdminLoginClient"

export const metadata: Metadata = {
  title: "Admin Login | Sports Talk Club",
  description: "Admin portal for Sports Talk Club management",
}

export default function AdminLoginPage() {
  return <AdminLoginClient />
}
