"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, AlertCircle } from "lucide-react"
import Image from "next/image"
import {
  initialDraftPicks,
  initialDraftState,
  type DraftPick,
  type DraftState,
  groupPicksByRound,
} from "@/lib/draft-data"
import {
  initBroadcastChannel,
  getLatestDraftData,
  fetchDraftDataFromServer,
  type DraftUpdateMessage,
} from "@/lib/draft-communication"
import { useToast } from "@/hooks/use-toast"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
}

export default function DraftTrackerClient() {
  const [isClient, setIsClient] = useState(false)
  const [draftPicks, setDraftPicks] = useState<DraftPick[]>(initialDraftPicks)
  const [draftState, setDraftState] = useState<DraftState>(initialDraftState)
  const [activeRound, setActiveRound] = useState("1")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Polling interval reference
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize and set up broadcast channel listener and server polling
  useEffect(() => {
    setIsClient(true)

    // Check for stored data first
    const storedData = getLatestDraftData()
    if (storedData) {
      if (storedData.picks) setDraftPicks(storedData.picks)
      if (storedData.state) setDraftState(storedData.state)
    }

    // Initialize broadcast channel for same-device updates
    const channel = initBroadcastChannel()

    if (channel) {
      // Listen for updates from admin panel on same device
      channel.onmessage = (event: MessageEvent<DraftUpdateMessage>) => {
        if (event.data.type === "DRAFT_UPDATE") {
          const { picks, state } = event.data.data

          if (picks) {
            setDraftPicks(picks)
          }

          if (state) {
            setDraftState(state)

            // If the active round changes, update the tab
            if (state.currentRound.toString() !== activeRound) {
              setActiveRound(state.currentRound.toString())
            }
          }
        }
      }
    }

    // Set up polling for server updates (for cross-device real-time updates)
    const pollForUpdates = async () => {
      const serverData = await fetchDraftDataFromServer()
      if (serverData) {
        // Only update if the data is newer than what we have
        const currentLastUpdated = new Date(draftState.lastUpdated).getTime()
        const serverLastUpdated = new Date(serverData.state.lastUpdated).getTime()

        if (serverLastUpdated > currentLastUpdated) {
          if (serverData.picks) setDraftPicks(serverData.picks)
          if (serverData.state) {
            setDraftState(serverData.state)

            // If the active round changes, update the tab
            if (serverData.state.currentRound.toString() !== activeRound) {
              setActiveRound(serverData.state.currentRound.toString())
            }
          }
        }
      }
    }

    // Start polling (every 3 seconds)
    pollingIntervalRef.current = setInterval(pollForUpdates, 3000)

    // Initial fetch from server
    fetchDraftData()

    // Clean up
    return () => {
      if (channel) {
        channel.close()
      }
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
      }
    }
  }, [activeRound, toast])

  // Fetch draft data from server
  const fetchDraftData = async () => {
    try {
      setLoading(true)
      const serverData = await fetchDraftDataFromServer()

      if (serverData) {
        if (serverData.picks) setDraftPicks(serverData.picks)
        if (serverData.state) {
          setDraftState(serverData.state)
          setActiveRound(serverData.state.currentRound.toString())
        }
      }

      setLoading(false)
    } catch (err) {
      setError("Failed to load draft data")
      setLoading(false)
      console.error(err)
    }
  }

  // Find the last completed pick
  const findLastCompletedPick = () => {
    // Sort picks by round and pick number in descending order
    const sortedPicks = [...draftPicks]
      .filter((pick) => pick.isComplete && pick.player)
      .sort((a, b) => {
        if (a.round !== b.round) {
          return b.round - a.round // Higher round first
        }
        return b.pick - a.pick // Higher pick number first
      })

    // Return the first pick in the sorted array (the most recent pick)
    return sortedPicks.length > 0 ? sortedPicks[0] : null
  }

  // Group picks by round
  const picksByRound = groupPicksByRound(draftPicks)
  const rounds = Object.keys(picksByRound).map(Number)

  // Find the current pick
  const currentPick = draftPicks.find(
    (pick) => pick.round === draftState.currentRound && pick.pick === draftState.currentPick,
  )

  if (!isClient) {
    return null // Prevent SSR flash
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        STC Season 13 Draft Tracker
      </motion.h1>

      {/* Draft Status */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="bg-black text-white border-yellow-500">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="mr-4">
                  {draftState.isActive ? (
                    <Badge className="bg-green-600 text-white px-3 py-1 text-sm">
                      <Clock className="w-4 h-4 mr-1" /> LIVE
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-600 text-white px-3 py-1 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" /> NOT ACTIVE
                    </Badge>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    Round {draftState.currentRound}, Pick {draftState.currentPick}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Last updated: {new Date(draftState.lastUpdated).toLocaleString()}
                  </p>
                </div>
              </div>

              {(() => {
                // Find the last completed pick
                const lastPick = findLastCompletedPick()

                // If there's a last pick, show it
                if (lastPick && lastPick.player) {
                  return (
                    <div className="flex items-center bg-gray-800 rounded-lg p-3">
                      <div className="w-12 h-12 relative mr-3">
                        <Image
                          src={lastPick.teamLogo || "/placeholder.svg"}
                          alt={`${lastPick.team} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-yellow-400 font-bold">LAST PICK</p>
                        <p className="text-lg font-bold">{lastPick.player.name}</p>
                        <p className="text-sm text-gray-300">
                          {lastPick.player.position} • {lastPick.team}
                        </p>
                      </div>
                    </div>
                  )
                }

                // If no picks have been made yet but there's a team on the clock
                else if (currentPick && draftState.isActive) {
                  return (
                    <div className="flex items-center bg-gray-800 rounded-lg p-3">
                      <div className="w-12 h-12 relative mr-3">
                        <Image
                          src={currentPick.teamLogo || "/placeholder.svg"}
                          alt={`${currentPick.team} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-yellow-400 font-bold">{currentPick.pickStatus || "ON THE CLOCK"}</p>
                        <p className="text-lg font-bold">{currentPick.team}</p>
                      </div>
                    </div>
                  )
                }

                // If nothing to show
                return null
              })()}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Draft Rounds Tabs */}
      <Tabs value={activeRound} className="w-full" onValueChange={setActiveRound}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <TabsList className="grid grid-cols-4 mb-8">
            {rounds.map((round) => (
              <TabsTrigger key={round} value={round.toString()} className="text-lg py-3">
                Round {round}
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>

        {rounds.map((round) => (
          <TabsContent key={round} value={round.toString()}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="bg-gradient-to-r from-[#CE1126] to-[#CE1126]/80 text-white">
                  <CardTitle>Round {round} Picks</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {picksByRound[round].map((pick, index) => (
                      <motion.div key={`${pick.round}-${pick.pick}`} variants={itemVariants} custom={index}>
                        <div
                          className={`flex flex-col md:flex-row items-center p-4 border-b last:border-b-0 ${
                            pick.isOnClock ? "bg-yellow-50" : pick.isComplete ? "bg-gray-50" : ""
                          }`}
                        >
                          {/* Pick Number */}
                          <div className="w-16 text-center mb-2 md:mb-0">
                            <span className="font-bold text-lg">{pick.pick}</span>
                          </div>

                          {/* Team Info */}
                          <div className="flex items-center flex-1 mb-2 md:mb-0">
                            <div className="w-10 h-10 relative mr-3">
                              <Image
                                src={pick.teamLogo || "/placeholder.svg"}
                                alt={`${pick.team} logo`}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <span className="font-medium">{pick.team}</span>
                              {pick.pickInfo && <span className="text-xs text-gray-500 block">{pick.pickInfo}</span>}
                            </div>

                            {pick.isOnClock && (
                              <Badge className="ml-3 bg-yellow-500 text-black">
                                <Clock className="w-3 h-3 mr-1" /> {pick.pickStatus || "On the Clock"}
                              </Badge>
                            )}

                            {!pick.isOnClock && pick.pickStatus === "The pick is in" && (
                              <Badge className="ml-3 bg-blue-500 text-white">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> The pick is in
                              </Badge>
                            )}
                          </div>

                          {/* Player Info (if pick is complete) */}
                          {pick.isComplete && pick.player ? (
                            <div className="flex items-center ml-0 md:ml-4 mt-2 md:mt-0">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                              <div>
                                <p className="font-bold">{pick.player.name}</p>
                                <p className="text-sm text-gray-600">
                                  {pick.player.position} • {pick.player.college}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="ml-0 md:ml-4 mt-2 md:mt-0 text-gray-400">
                              {pick.pickStatus === "The pick is in"
                                ? "Selection in progress..."
                                : pick.isOnClock
                                  ? "On the clock..."
                                  : "Not selected yet"}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
