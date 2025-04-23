import type { Metadata } from "next"

// Base URL for the website
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://stcleague.com"

// Default metadata
export const defaultMetadata: Metadata = {
  title: "Sports Talk Club - Season 12",
  description: "The premier football league experience on Roblox",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Sports Talk Club",
    title: "Sports Talk Club - Season 12",
    description: "The premier football league experience on Roblox",
    images: [
      {
        url: `${baseUrl}/images/og-default.png`,
        width: 1200,
        height: 630,
        alt: "Sports Talk Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports Talk Club - Season 12",
    description: "The premier football league experience on Roblox",
    images: [`${baseUrl}/images/og-default.png`],
  },
}

// Generate metadata for specific pages
export function generateMetadata(title: string, description: string, imagePath: string, url: string): Metadata {
  const fullUrl = `${baseUrl}${url}`
  const imageUrl = imagePath.startsWith("http") ? imagePath : `${baseUrl}${imagePath}`

  return {
    title: `${title} | Sports Talk Club`,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: fullUrl,
      siteName: "Sports Talk Club",
      title: `${title} | Sports Talk Club`,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Sports Talk Club`,
      description,
      images: [imageUrl],
    },
  }
}
