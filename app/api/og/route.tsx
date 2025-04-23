import { generateOgImage } from "@/app/og-image-generator"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const title = searchParams.get("title") || "Sports Talk Club"
  const subtitle = searchParams.get("subtitle") || "Season 12"
  const bgColor = searchParams.get("bg") || "#CE1126"
  const textColor = searchParams.get("text") || "white"
  const theme = searchParams.get("theme") || "default"

  return generateOgImage(title, subtitle, bgColor, textColor, theme)
}
