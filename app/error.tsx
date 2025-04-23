"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-8">We're sorry, but there was an error loading this page.</p>
      <div className="flex justify-center gap-4">
        <Button onClick={reset}>Try again</Button>
        <Link href="/">
          <Button variant="outline">Go to Home</Button>
        </Link>
      </div>
    </div>
  )
}
