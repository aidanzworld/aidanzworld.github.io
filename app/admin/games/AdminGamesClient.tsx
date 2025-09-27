"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { ArrowLeft, Edit, Save, Calendar, Trophy, Filter, RefreshCw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Game {
  id: string
  week: number
  homeTeam: {
    name: string
    city: string
    logo: string
  }
  awayTeam: {
    name: string
    city: string
    logo: string
  }
  homeScore?: number
  awayScore?: number
  status: "scheduled" | "in-progress" | "final"
  date: string
  time: string
}

export default function AdminGamesClient() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<Game[]>([])
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState<string>("all")

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("stc-admin")
      if (auth === "true") {
        setIsAuthenticated(true)
        loadGames()
      } else {
        router.push("/admin")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const loadGames = () => {
    // Sample game data - matches the schedule structure
    const sampleGames: Game[] = [
      {
        id: "w1-g1",
        week: 1,
        homeTeam: { name: "Chiefs", city: "Kansas City", logo: "/images/team-logos/KAN.png" },
        awayTeam: { name: "Bears", city: "Chicago", logo: "/images/team-logos/CHI.png" },
        homeScore: 28,
        awayScore: 14,
        status: "final",
        date: "2024-09-18",
        time: "8:20 PM ET",
      },
      {
        id: "w1-g2",
        week: 1,
        homeTeam: { name: "Dolphins", city: "Miami", logo: "/images/team-logos/MIA.png" },
        awayTeam: { name: "Jaguars", city: "Jacksonville", logo: "/images/team-logos/JAX.png" },
        homeScore: 17,
        awayScore: 21,
        status: "final",
        date: "2024-09-19",
        time: "9:00 PM ET",
      },
      {
        id: "w1-g3",
        week: 1,
        homeTeam: { name: "49ers", city: "San Francisco", logo: "/images/team-logos/49ERS.png" },
        awayTeam: { name: "Rams", city: "Los Angeles", logo: "/images/team-logos/LAR.png" },
        homeScore: 31,
        awayScore: 24,
        status: "final",
        date: "2024-09-19",
        time: "10:30 PM ET",
      },
      {
        id: "w2-g1",
        week: 2,
        homeTeam: { name: "49ers", city: "San Francisco", logo: "/images/team-logos/49ERS.png" },
        awayTeam: { name: "Dolphins", city: "Miami", logo: "/images/team-logos/MIA.png" },
        homeScore: 24,
        awayScore: 27,
        status: "final",
        date: "2024-09-21",
        time: "7:30 PM ET",
      },
      {
        id: "w2-g4",
        week: 2,
        homeTeam: { name: "Bears", city: "Chicago", logo: "/images/team-logos/CHI.png" },
        awayTeam: { name: "Jaguars", city: "Jacksonville", logo: "/images/team-logos/JAX.png" },
        status: "scheduled",
        date: "2024-09-26",
        time: "8:15 PM ET",
      },
      {
        id: "w3-g1",
        week: 3,
        homeTeam: { name: "Dolphins", city: "Miami", logo: "/images/team-logos/MIA.png" },
        awayTeam: { name: "Bears", city: "Chicago", logo: "/images/team-logos/CHI.png" },
        status: "scheduled",
        date: "2024-10-01",
        time: "8:15 PM ET",
      },
    ]
    setGames(sampleGames)
  }

  const handleEditGame = (game: Game) => {
    setEditingGame({ ...game })
    setIsDialogOpen(true)
  }

  const handleSaveGame = () => {
    if (editingGame) {
      // Auto-update status when scores are added
      if (editingGame.homeScore !== undefined && editingGame.awayScore !== undefined) {
        editingGame.status = "final"
      }

      // Update local games state
      setGames(games.map((game) => (game.id === editingGame.id ? editingGame : game)))

      // Save to localStorage to sync with public schedule
      const savedScores = localStorage.getItem("stc-game-scores")
      let allScores = []

      try {
        allScores = savedScores ? JSON.parse(savedScores) : []
      } catch (error) {
        allScores = []
      }

      // Update or add the game score
      const existingIndex = allScores.findIndex((s: any) => s.id === editingGame.id)
      const gameData = {
        id: editingGame.id,
        homeScore: editingGame.homeScore,
        awayScore: editingGame.awayScore,
        status: editingGame.status,
        date: editingGame.date,
        time: editingGame.time,
      }

      if (existingIndex >= 0) {
        allScores[existingIndex] = gameData
      } else {
        allScores.push(gameData)
      }

      localStorage.setItem("stc-game-scores", JSON.stringify(allScores))

      setIsDialogOpen(false)
      setEditingGame(null)
    }
  }

  const updateEditingGame = (field: string, value: any) => {
    if (editingGame) {
      if (field.includes(".")) {
        const [parent, child] = field.split(".")
        setEditingGame({
          ...editingGame,
          [parent]: {
            ...editingGame[parent as keyof Game],
            [child]: value,
          },
        })
      } else {
        setEditingGame({ ...editingGame, [field]: value })
      }
    }
  }

  const filteredGames = selectedWeek === "all" ? games : games.filter((game) => game.week.toString() === selectedWeek)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "final":
        return "bg-green-600 text-white"
      case "in-progress":
        return "bg-yellow-600 text-black"
      case "scheduled":
        return "bg-blue-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const weeks = Array.from(new Set(games.map((game) => game.week))).sort((a, b) => a - b)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stc-red via-black to-stc-gold flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Loading games...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stc-red via-black to-stc-gold">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Game Management</h1>
                <p className="text-gray-300">Manage game scores and schedules</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-stc-gold" />
                <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                  <SelectTrigger className="w-32 bg-black/40 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/20">
                    <SelectItem value="all">All Weeks</SelectItem>
                    {weeks.map((week) => (
                      <SelectItem key={week} value={week.toString()}>
                        Week {week}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-stc-gold" />
                <span className="text-white font-medium">{filteredGames.length} Games</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Info Banner */}
        <div className="mb-6 p-4 bg-blue-600/20 border border-blue-400/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-blue-400" />
            <p className="text-white">
              <strong>Note:</strong> Score updates will automatically appear on the public schedule page. Games with
              scores will be marked as "Final".
            </p>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm hover:bg-black/50 transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-stc-gold" />
                      <CardTitle className="text-white">Week {game.week}</CardTitle>
                      <Badge className={getStatusColor(game.status)}>
                        {game.status === "final" ? "Final" : game.status === "in-progress" ? "Live" : "Scheduled"}
                      </Badge>
                    </div>
                    <Button
                      onClick={() => handleEditGame(game)}
                      size="sm"
                      variant="outline"
                      className="border-stc-gold/30 text-stc-gold hover:bg-stc-gold hover:text-black"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-gray-400 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(game.date).toLocaleDateString()} at {game.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Away Team */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={game.awayTeam.logo || "/placeholder.svg"}
                          alt={`${game.awayTeam.name} logo`}
                          width={32}
                          height={32}
                          className="rounded"
                        />
                        <span className="text-white font-medium">
                          {game.awayTeam.city} {game.awayTeam.name}
                        </span>
                      </div>
                      <div
                        className={`text-2xl font-bold ${
                          game.status === "final" && (game.awayScore ?? 0) > (game.homeScore ?? 0)
                            ? "text-green-400"
                            : "text-white"
                        }`}
                      >
                        {game.awayScore ?? "-"}
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <span className="text-gray-500 text-sm">@</span>
                    </div>

                    {/* Home Team */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={game.homeTeam.logo || "/placeholder.svg"}
                          alt={`${game.homeTeam.name} logo`}
                          width={32}
                          height={32}
                          className="rounded"
                        />
                        <span className="text-white font-medium">
                          {game.homeTeam.city} {game.homeTeam.name}
                        </span>
                      </div>
                      <div
                        className={`text-2xl font-bold ${
                          game.status === "final" && (game.homeScore ?? 0) > (game.awayScore ?? 0)
                            ? "text-green-400"
                            : "text-white"
                        }`}
                      >
                        {game.homeScore ?? "-"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Edit Game Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-black border-white/20 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Game</DialogTitle>
              <DialogDescription className="text-gray-400">
                Update game scores and information. Changes will appear on the public schedule.
              </DialogDescription>
            </DialogHeader>
            {editingGame && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Week {editingGame.week} - {new Date(editingGame.date).toLocaleDateString()}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-gray-300">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={editingGame.date}
                      onChange={(e) => updateEditingGame("date", e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-gray-300">
                      Time
                    </Label>
                    <Input
                      id="time"
                      value={editingGame.time}
                      onChange={(e) => updateEditingGame("time", e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="8:20 PM ET"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Away Team Score</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Image
                      src={editingGame.awayTeam.logo || "/placeholder.svg"}
                      alt={`${editingGame.awayTeam.name} logo`}
                      width={24}
                      height={24}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-white flex-1">
                      {editingGame.awayTeam.city} {editingGame.awayTeam.name}
                    </span>
                    <Input
                      type="number"
                      value={editingGame.awayScore ?? ""}
                      onChange={(e) =>
                        updateEditingGame("awayScore", e.target.value ? Number.parseInt(e.target.value) : undefined)
                      }
                      className="w-20 bg-gray-800 border-gray-600 text-white"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Home Team Score</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Image
                      src={editingGame.homeTeam.logo || "/placeholder.svg"}
                      alt={`${editingGame.homeTeam.name} logo`}
                      width={24}
                      height={24}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-white flex-1">
                      {editingGame.homeTeam.city} {editingGame.homeTeam.name}
                    </span>
                    <Input
                      type="number"
                      value={editingGame.homeScore ?? ""}
                      onChange={(e) =>
                        updateEditingGame("homeScore", e.target.value ? Number.parseInt(e.target.value) : undefined)
                      }
                      className="w-20 bg-gray-800 border-gray-600 text-white"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status" className="text-gray-300">
                    Status
                  </Label>
                  <Select value={editingGame.status} onValueChange={(value) => updateEditingGame("status", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    variant="outline"
                    className="border-gray-600 text-gray-400 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveGame} className="bg-stc-gold text-black hover:bg-stc-gold/80">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
