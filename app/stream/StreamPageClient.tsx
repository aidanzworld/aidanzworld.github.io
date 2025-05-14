"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import ReactPlayer from "react-player"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Maximize, ExternalLink, Send, MessageSquare, Users } from "lucide-react"
import type { Socket } from "socket.io-client"
import { NeonText } from "@/components/neon-text"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Chat message type
interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: Date
}

export default function StreamPageClient() {
  const [isClient, setIsClient] = useState(false)
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const [isJoined, setIsJoined] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [viewerCount, setViewerCount] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLive, setIsLive] = useState(false)
  const [streamUrl, setStreamUrl] = useState("")
  const socketRef = useRef<Socket | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<ReactPlayer>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)

  // Connect to socket when component mounts
  useEffect(() => {
    setIsClient(true)

    // For demo purposes, we'll use a placeholder stream URL
    // In production, this would be your actual RTMP stream URL
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
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  // Handle joining the chat
  const handleJoinChat = () => {
    if (!username.trim()) return

    // In a real app, this would connect to your actual Socket.io server
    // For demo purposes, we'll simulate the connection and messages
    console.log(`User ${username} joined the chat`)
    setIsJoined(true)

    // Simulate receiving messages
    const simulatedMessages: ChatMessage[] = [
      {
        id: "1",
        username: "STC_Admin",
        message: "Welcome to the STC Bowl XII stream chat!",
        timestamp: new Date(),
      },
      {
        id: "2",
        username: "FootballFan22",
        message: "Let's go Oilers!",
        timestamp: new Date(),
      },
      {
        id: "3",
        username: "NinerNation",
        message: "49ers all the way!",
        timestamp: new Date(),
      },
    ]

    setChatMessages(simulatedMessages)
    setViewerCount(42) // Simulated viewer count
  }

  // Handle sending a chat message
  const handleSendMessage = () => {
    if (!message.trim() || !isJoined) return

    // In a real app, this would send the message via Socket.io
    // For demo purposes, we'll just add it to our local state
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username,
      message: message.trim(),
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, newMessage])
    setMessage("")
  }

  // Handle keypress for sending messages
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Open stream in a new window
  const openPopout = () => {
    window.open("/stream/popout", "STC_Stream", "width=800,height=600")
  }

  if (!isClient) {
    return null // Prevent SSR flash
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Vegas-themed header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-black to-black opacity-80 z-0"></div>

        {/* Decorative lights */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-10 left-[10%] w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 10px 2px #3b82f6" }}
          ></div>
          <div
            className="absolute top-20 left-[20%] w-2 h-2 bg-red-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 10px 2px #ef4444" }}
          ></div>
          <div
            className="absolute top-15 left-[30%] w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 10px 2px #eab308" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NeonText color="#ff2d55">STC BOWL XII LIVE STREAM</NeonText>
          </motion.h1>

          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Sparkles className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-lg text-yellow-400">TENNESSEE OILERS VS SAN FRANCISCO 49ERS • MAY 10TH</span>
            <Sparkles className="h-5 w-5 text-yellow-400 ml-2" />
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player Section - Takes up 2/3 on desktop */}
          <div className="lg:col-span-2">
            <Card className="bg-black border-gray-800">
              <CardHeader className="bg-gradient-to-r from-purple-900 to-black p-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white flex items-center">
                    <span
                      className={`h-3 w-3 rounded-full mr-2 ${isLive ? "bg-red-500 animate-pulse" : "bg-gray-500"}`}
                    ></span>
                    {isLive ? "LIVE: STC BOWL XII" : "Stream Offline"}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-gray-700 text-gray-300 hover:bg-gray-800"
                      onClick={openPopout}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-gray-700 text-gray-300 hover:bg-gray-800"
                      onClick={toggleFullscreen}
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div ref={playerContainerRef} className="aspect-video bg-black relative">
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-400 mb-2">Stream Offline</div>
                      <div className="text-sm text-gray-500">The broadcast will begin soon</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stream Info */}
            <Card className="mt-4 bg-black/50 border-gray-800">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-2">STC Bowl XII - Live from Las Vegas</h2>
                <p className="text-gray-400">
                  Watch the Tennessee Oilers take on the San Francisco 49ers in the championship game of Season 12.
                  Streaming live from Allegiant Stadium in Las Vegas, Nevada on May 10th.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chat Section - Takes up 1/3 on desktop */}
          <div className="lg:col-span-1">
            <Card className="bg-black border-gray-800 h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-purple-900 to-black p-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Live Chat
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-400">
                    <Users className="h-4 w-4 mr-1" />
                    {viewerCount}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow flex flex-col">
                {!isJoined ? (
                  <div className="p-4 flex-grow flex flex-col items-center justify-center">
                    <h3 className="text-lg font-medium mb-4">Join the conversation</h3>
                    <div className="w-full max-w-xs space-y-4">
                      <Input
                        type="text"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white"
                        maxLength={20}
                      />
                      <Button
                        className="w-full bg-purple-700 hover:bg-purple-600"
                        onClick={handleJoinChat}
                        disabled={!username.trim()}
                      >
                        Join Chat
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Tabs defaultValue="chat" className="w-full">
                      <TabsList className="w-full bg-gray-900">
                        <TabsTrigger value="chat" className="flex-1">
                          Chat
                        </TabsTrigger>
                        <TabsTrigger value="info" className="flex-1">
                          Info
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="chat" className="flex flex-col h-[400px] m-0">
                        <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-2 bg-gray-950">
                          {chatMessages.map((msg) => (
                            <div key={msg.id} className="break-words">
                              <span
                                className={`font-bold ${msg.username === "STC_Admin" ? "text-red-400" : "text-blue-400"}`}
                              >
                                {msg.username}:
                              </span>{" "}
                              <span className="text-gray-300">{msg.message}</span>
                            </div>
                          ))}
                        </div>
                        <div className="p-2 border-t border-gray-800 bg-gray-900 flex">
                          <Input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <Button
                            className="ml-2 bg-purple-700 hover:bg-purple-600 px-3"
                            onClick={handleSendMessage}
                            disabled={!message.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="info" className="h-[400px] overflow-y-auto p-4 bg-gray-950 m-0">
                        <h3 className="font-bold text-lg mb-2">Chat Rules</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-300">
                          <li>Be respectful to other users</li>
                          <li>No spamming or excessive caps</li>
                          <li>No hate speech or harassment</li>
                          <li>Keep discussions related to the game</li>
                          <li>Moderators have final say on all matters</li>
                        </ul>

                        <h3 className="font-bold text-lg mt-4 mb-2">About the Stream</h3>
                        <p className="text-gray-300">
                          This is the official stream for STC Bowl XII, broadcasting live from Allegiant Stadium in Las
                          Vegas. The game features the Tennessee Oilers against the San Francisco 49ers.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
