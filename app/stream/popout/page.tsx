import type { Metadata } from "next"
import StreamPopoutClient from "./StreamPopoutClient"

export const metadata: Metadata = {
  title: "STC Bowl XII Stream | Popout Player",
  description: "STC Bowl XII live stream popout player",
}

export default function StreamPopoutPage() {
  return <StreamPopoutClient />
}
