"use client"

import { useState, useEffect, useRef } from "react"
import ReactPlayer from "react-player"

export default function StreamPopoutClient() {
  const [isClient, setIsClient] = useState(false)
  const [isLive, setIsLive] = useState(false)
  const [streamUrl, setStreamUrl] = useState("")
  const playerRef = useRef<ReactPlayer>(null)

  useEffect(() => {
    setIsClient(true)

    // For demo purposes, we'll use a placeholder stream URL
    setStreamUrl("https://example.com/live/stcbowl12")

    // Check if stream is live (this would be a real API call in production)
    const checkStreamStatus = () => {
      // Simulate stream being live for demo purposes
      setIsLive(true)
    }

    checkStreamStatus()
    const interval = setInterval(checkStreamStatus, 30000) // Check every 30 seconds

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (!isClient) {
    return null // Prevent SSR flash
  }

  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center">
      <div className="w-full h-full">
        {isLive ? (
          <ReactPlayer
            ref={playerRef}
            url={streamUrl}
            width="100%"
            height="100%"
            playing={true}
            controls={true}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                },
              },
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-2xl font-bold text-gray-400 mb-2">Stream Offline</div>
            <div className="text-sm text-gray-500">The broadcast will begin soon</div>
          </div>
        )}
      </div>
    </div>
  )
}
