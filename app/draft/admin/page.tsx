import type { Metadata } from "next"
import DraftAdminClient from "./DraftAdminClient"

export const metadata: Metadata = {
  title: "Draft Admin | Sports Talk Club",
  description: "Admin control panel for the STC draft",
  robots: {
    index: false,
    follow: false,
  },
}

export default function DraftAdminPage() {
  return <DraftAdminClient />
}
