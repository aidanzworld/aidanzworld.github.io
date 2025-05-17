"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Clock, Save, CheckCircle2, AlertCircle, RefreshCw, Lock } from "lucide-react"
import Image from "next/image"
import {
  initialDraftPicks,
  initialDraftState,
  type DraftPick,
  type DraftState,
  groupPicksByRound,
  positions,
  colleges,
} from "@/lib/draft-data"
import { useToast } from "@/hooks/use-toast"

// Declare containerVariants and itemVariants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function DraftAdminClient() {
  const [isClient, setIsClient] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [draftPicks, setDraftPicks] = useState<DraftPick[]>(initialDraftPicks)
  const [draftState, setDraftState] = useState<DraftState>(initialDraftState)
  const [activeRound, setActiveRound] = useState("1")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedPick, setSelectedPick] = useState<DraftPick | null>(null)
  const [playerName, setPlayerName] = useState("")
  const [playerPosition, setPlayerPosition] = useState("")
  const [playerCollege, setPlayerCollege] = useState("")
  const { toast } = useToast()

  // Add pickStatus to the state
  const [pickStatus, setPickStatus] = useState<"On the Clock" | "The pick is in" | "No Status">("No Status")

  // Authenticate admin
  const handleAuthenticate = () => {
    // In a real app, this would be a secure authentication process
    // For demo purposes, we'll use a simple password
    if (password === "admin123") {
      setIsAuthenticated(true)
      toast({
        title: "Authentication successful",
        description: "Welcome to the draft admin panel",
      })
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid password",
        variant: "destructive",
      })
    }
  }

  // Fetch draft data
  const fetchDraftData = async () => {
    try {
      setLoading(true)
      // In a real app, this would be an API call
      // For now, we'll simulate a delay and use the initial data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate fetching data
      // In production, replace with actual API calls
      // const response = await fetch('/api/draft')
      // const data = await response.json()
      // setDraftPicks(data.picks)
      // setDraftState(data.state)

      setLoading(false)
      toast({
        title: "Data refreshed",
        description: "Draft data has been updated",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load draft data",
        variant: "destructive",
      })
      setLoading(false)
      console.error(err)
    }
  }

  // Save draft data
  const saveDraftData = async () => {
    try {
      setSaving(true)
      // In a real app, this would be an API call
      // For now, we'll simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate saving data
      // In production, replace with actual API calls
      // await fetch('/api/draft', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ picks: draftPicks, state: draftState })
      // })

      setSaving(false)
      toast({
        title: "Changes saved",
        description: "Draft data has been updated successfully",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save draft data",
        variant: "destructive",
      })
      setSaving(false)
      console.error(err)
    }
  }

  // Add resetAllPicks function
  const resetAllPicks = async () => {
    try {
      setSaving(true)
      // Reset all picks
      const resetPicks = draftPicks.map((pick) => ({
        ...pick,
        isComplete: false,
        isOnClock: false,
        player: undefined,
        pickStatus: "No Status",
      }))

      setDraftPicks(resetPicks)

      // Reset draft state
      setDraftState({
        ...draftState,
        currentRound: 1,
        currentPick: 1,
        isActive: false,
        lastUpdated: new Date().toISOString(),
      })

      setSaving(false)
      toast({
        title: "Draft Reset",
        description: "All draft selections have been reset",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to reset draft data",
        variant: "destructive",
      })
      setSaving(false)
      console.error(err)
    }
  }

  // Update the setCurrentPick function to include pickStatus
  const setCurrentPick = (
    round: number,
    pick: number,
    status: "On the Clock" | "The pick is in" | "No Status" = "On the Clock",
  ) => {
    // Update draft state
    setDraftState({
      ...draftState,
      currentRound: round,
      currentPick: pick,
      lastUpdated: new Date().toISOString(),
    })

    // Update pick status
    const updatedPicks = draftPicks.map((p) => ({
      ...p,
      isOnClock: p.round === round && p.pick === pick,
      pickStatus: p.round === round && p.pick === pick ? status : p.pickStatus,
    }))
    setDraftPicks(updatedPicks)

    toast({
      title: "Pick updated",
      description: `Current pick set to Round ${round}, Pick ${pick}`,
    })
  }

  // Toggle draft active state
  const toggleDraftActive = () => {
    setDraftState({
      ...draftState,
      isActive: !draftState.isActive,
      lastUpdated: new Date().toISOString(),
    })

    toast({
      title: draftState.isActive ? "Draft paused" : "Draft activated",
      description: draftState.isActive ? "The draft has been paused" : "The draft is now live",
    })
  }

  // Select a pick to edit
  const handleSelectPick = (pick: DraftPick) => {
    setSelectedPick(pick)
    if (pick.player) {
      setPlayerName(pick.player.name || "")
      setPlayerPosition(pick.player.position || "")
      setPlayerCollege(pick.player.college || "")
    } else {
      setPlayerName("")
      setPlayerPosition("")
      setPlayerCollege("")
    }
  }

  // Update the submitPlayerSelection function to clear pickStatus
  const submitPlayerSelection = () => {
    if (!selectedPick) return

    // Update the pick with player info
    const updatedPicks = draftPicks.map((p) => {
      if (p.round === selectedPick.round && p.pick === selectedPick.pick) {
        return {
          ...p,
          isComplete: true,
          isOnClock: false,
          pickStatus: "No Status",
          player: {
            name: playerName,
            position: playerPosition,
            college: playerCollege,
          },
        }
      }
      return p
    })

    setDraftPicks(updatedPicks)

    // Move to next pick if this was the current pick
    if (selectedPick.round === draftState.currentRound && selectedPick.pick === draftState.currentPick) {
      let nextRound = draftState.currentRound
      let nextPick = draftState.currentPick + 1

      // If we're at the end of a round, move to the next round
      const picksInCurrentRound = draftPicks.filter((p) => p.round === draftState.currentRound).length
      if (nextPick > picksInCurrentRound) {
        nextRound++
        nextPick = 1
      }

      // If we're at the end of the draft, don't increment
      const maxRound = Math.max(...draftPicks.map((p) => p.round))
      if (nextRound <= maxRound) {
        setCurrentPick(nextRound, nextPick)
      }
    }

    // Reset form
    setSelectedPick(null)
    setPlayerName("")
    setPlayerPosition("")
    setPlayerCollege("")
    setPickStatus("No Status")

    toast({
      title: "Pick completed",
      description: `${playerName} has been selected by the ${selectedPick.team}`,
    })
  }

  // Reset a pick
  const resetPick = (pick: DraftPick) => {
    const updatedPicks = draftPicks.map((p) => {
      if (p.round === pick.round && p.pick === pick.pick) {
        return {
          ...p,
          isComplete: false,
          player: undefined,
          pickStatus: "No Status",
        }
      }
      return p
    })

    setDraftPicks(updatedPicks)

    toast({
      title: "Pick reset",
      description: `Round ${pick.round}, Pick ${pick.pick} has been reset`,
    })
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Group picks by round
  const picksByRound = groupPicksByRound(draftPicks)
  const rounds = Object.keys(picksByRound).map(Number)

  if (!isClient) {
    return null // Prevent SSR flash
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Lock className="mr-2 h-5 w-5" /> Draft Admin Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleAuthenticate}>
                Authenticate
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        STC Draft Admin Panel
      </motion.h1>

      {/* Draft Controls */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card>
          <CardHeader className="bg-black text-white">
            <CardTitle className="flex items-center justify-between">
              <span>Draft Controls</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchDraftData}
                  disabled={loading}
                  className="text-black border-white hover:bg-gray-800 hover:text-white"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={saveDraftData}
                  disabled={saving}
                  className="text-black border-white hover:bg-gray-800 hover:text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={resetAllPicks}
                  disabled={saving}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Reset Draft
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Draft Status</h3>
                <div className="flex items-center space-x-4 mb-6">
                  <Switch checked={draftState.isActive} onCheckedChange={toggleDraftActive} id="draft-active" />
                  <Label htmlFor="draft-active" className="font-medium">
                    {draftState.isActive ? (
                      <span className="text-green-600 flex items-center">
                        <Clock className="w-4 h-4 mr-1" /> Draft is LIVE
                      </span>
                    ) : (
                      <span className="text-gray-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" /> Draft is PAUSED
                      </span>
                    )}
                  </Label>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-round">Current Round</Label>
                    <Select
                      value={draftState.currentRound.toString()}
                      onValueChange={(value) => {
                        setCurrentPick(Number.parseInt(value), 1)
                      }}
                    >
                      <SelectTrigger id="current-round">
                        <SelectValue placeholder="Select round" />
                      </SelectTrigger>
                      <SelectContent>
                        {rounds.map((round) => (
                          <SelectItem key={round} value={round.toString()}>
                            Round {round}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="current-pick">Current Pick</Label>
                    <Select
                      value={draftState.currentPick.toString()}
                      onValueChange={(value) => {
                        setCurrentPick(draftState.currentRound, Number.parseInt(value))
                      }}
                    >
                      <SelectTrigger id="current-pick">
                        <SelectValue placeholder="Select pick" />
                      </SelectTrigger>
                      <SelectContent>
                        {picksByRound[draftState.currentRound]?.map((pick) => (
                          <SelectItem key={pick.pick} value={pick.pick.toString()}>
                            Pick {pick.pick} - {pick.team}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Current Selection</h3>
                {selectedPick ? (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 relative mr-3">
                        <Image
                          src={selectedPick.teamLogo || "/placeholder.svg"}
                          alt={`${selectedPick.team} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{selectedPick.team}</p>
                        <p className="text-sm text-gray-600">
                          Round {selectedPick.round}, Pick {selectedPick.pick}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="player-name">Player Name</Label>
                        <Input
                          id="player-name"
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          placeholder="Enter player name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="player-position">Position</Label>
                        <Select value={playerPosition} onValueChange={setPlayerPosition}>
                          <SelectTrigger id="player-position">
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            {positions.map((position) => (
                              <SelectItem key={position} value={position}>
                                {position}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="player-college">College</Label>
                        <Select value={playerCollege} onValueChange={setPlayerCollege}>
                          <SelectTrigger id="player-college">
                            <SelectValue placeholder="Select college" />
                          </SelectTrigger>
                          <SelectContent>
                            {colleges.map((college) => (
                              <SelectItem key={college} value={college}>
                                {college}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="pick-status">Pick Status</Label>
                        <Select value={pickStatus} onValueChange={setPickStatus}>
                          <SelectTrigger id="pick-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="On the Clock">On the Clock</SelectItem>
                            <SelectItem value="The pick is in">The pick is in</SelectItem>
                            <SelectItem value="No Status">No Status</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button
                          onClick={() => {
                            if (selectedPick) {
                              // Update the pick status first
                              const updatedPicks = draftPicks.map((p) => {
                                if (p.round === selectedPick.round && p.pick === selectedPick.pick) {
                                  return {
                                    ...p,
                                    pickStatus: pickStatus,
                                  }
                                }
                                return p
                              })
                              setDraftPicks(updatedPicks)

                              // Then submit the player selection
                              submitPlayerSelection()
                            }
                          }}
                          disabled={!playerName || !playerPosition || !playerCollege}
                          className="flex-1"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Submit Pick
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedPick(null)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">Select a pick from the list below to enter player details</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Draft Rounds Tabs */}
      <Tabs defaultValue="1" className="w-full" onValueChange={setActiveRound}>
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
                            <span className="font-medium">{pick.team}</span>

                            {pick.isOnClock && (
                              <Badge className="ml-3 bg-yellow-500 text-black">
                                <Clock className="w-3 h-3 mr-1" /> On Clock
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
                              {pick.isOnClock ? "Selection in progress..." : "Not selected yet"}
                            </div>
                          )}

                          {/* Admin Actions */}
                          <div className="flex space-x-2 ml-0 md:ml-4 mt-2 md:mt-0">
                            {!pick.isComplete ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleSelectPick(pick)}
                                  disabled={selectedPick?.round === pick.round && selectedPick?.pick === pick.pick}
                                >
                                  Enter Pick
                                </Button>
                                <Select
                                  value={pick.pickStatus || "No Status"}
                                  onValueChange={(value) => {
                                    const updatedPicks = draftPicks.map((p) => {
                                      if (p.round === pick.round && p.pick === pick.pick) {
                                        return {
                                          ...p,
                                          pickStatus: value as "On the Clock" | "The pick is in" | "No Status",
                                        }
                                      }
                                      return p
                                    })
                                    setDraftPicks(updatedPicks)
                                  }}
                                >
                                  <SelectTrigger className="h-9 w-32">
                                    <SelectValue placeholder="Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="No Status">No Status</SelectItem>
                                    <SelectItem value="On the Clock">On the Clock</SelectItem>
                                    <SelectItem value="The pick is in">The pick is in</SelectItem>
                                  </SelectContent>
                                </Select>
                              </>
                            ) : (
                              <Button size="sm" variant="outline" onClick={() => resetPick(pick)}>
                                Reset
                              </Button>
                            )}

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setCurrentPick(pick.round, pick.pick, "On the Clock")}
                              disabled={draftState.currentRound === pick.round && draftState.currentPick === pick.pick}
                            >
                              Set Current
                            </Button>
                          </div>
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
