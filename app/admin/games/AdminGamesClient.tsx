"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Save, Calendar } from "lucide-react"
import Link from "next/link"

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
  status: "scheduled" | "final"
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
      const auth = localStorage.getItem("stc-admin-auth")
      if (auth === "authenticated") {
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
    // Sample game data
    const sampleGames: Game[] = [
      {
        id: "1",
        week: 12,
        homeTeam: { name: "Chiefs", city: "Kansas City", logo: "/images/team-logos/KAN.png" },
        awayTeam: { name: "Raiders", city: "Las Vegas", logo: "/images/team-logos/LV.png" },
        homeScore: 28,
        awayScore: 17,
        status: "final",
        date: "2024-11-24",
        time: "1:00 PM",
      },
      {
        id: "2",
        week: 12,
        homeTeam: { name: "Colts", city: "Indianapolis", logo: "/images/team-logos/IND.png" },
        awayTeam: { name: "Dolphins", city: "Miami", logo: "/images/team-logos/MIA.png" },
        status: "scheduled",
        date: "2024-11-24",
        time: "4:00 PM",
      },
      {
        id: "3",
        week: 12,
        homeTeam: { name: "Broncos", city: "Denver", logo: "/images/team-logos/DEN.png" },
        awayTeam: { name: "Oilers", city: "Houston", logo: "/images/team-logos/OILERS.png" },
        homeScore: 21,
        awayScore: 14,
        status: "final",
        date: "2024-11-24",
        time: "8:00 PM",
      },
      {
        id: "4",
        week: 13,
        homeTeam: { name: "Raiders", city: "Las Vegas", logo: "/images/team-logos/LV.png" },
        awayTeam: { name: "Colts", city: "Indianapolis", logo: "/images/team-logos/IND.png" },
        status: "scheduled",
        date: "2024-12-01",
        time: "1:00 PM",
      },
      {
        id: "5",
        week: 13,
        homeTeam: { name: "Dolphins", city: "Miami", logo: "/images/team-logos/MIA.png" },
        awayTeam: { name: "Chiefs", city: "Kansas City", logo: "/images/team-logos/KAN.png" },
        status: "scheduled",
        date: "2024-12-01",
        time: "4:00 PM",
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
      // Update status to final if scores are added
      const updatedGame = {
        ...editingGame,
        status:
          editingGame.homeScore !== undefined && editingGame.awayScore !== undefined
            ? ("final" as const)
            : ("scheduled" as const),
      }

      setGames(games.map((game) => (game.id === updatedGame.id ? updatedGame : game)))
      setIsDialogOpen(false)
      setEditingGame(null)
    }
  }

  const filteredGames = selectedWeek === "all" ? games : games.filter((game) => game.week.toString() === selectedWeek)

  const weeks = Array.from(new Set(games.map((game) => game.week))).sort((a, b) => a - b)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-yellow-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-yellow-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm" className="bg-black/50 border-red-500/30 text-white hover:bg-red-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white">Game Management</h1>
              <p className="text-gray-300">Manage game scores and schedules</p>
            </div>
          </div>
        </div>

        {/* Week Filter */}
        <div className="mb-6">
          <Label htmlFor="week-filter" className="text-white mb-2 block">
            Filter by Week
          </Label>
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-48 bg-black/50 border-red-500/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black border-red-500/30">
              <SelectItem value="all">All Weeks</SelectItem>
              {weeks.map((week) => (
                <SelectItem key={week} value={week.toString()}>
                  Week {week}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGames.map((game) => (
            <Card
              key={game.id}
              className="bg-black/50 border-red-500/30 backdrop-blur-sm hover:bg-black/70 transition-colors"
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Week {game.week}</CardTitle>
                  <Badge
                    variant={game.status === "final" ? "default" : "secondary"}
                    className={game.status === "final" ? "bg-green-600" : "bg-yellow-600"}
                  >
                    {game.status === "final" ? "Final" : "Scheduled"}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {game.date} at {game.time}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Away Team */}
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={game.awayTeam.logo || "/placeholder.svg"}
                      alt={`${game.awayTeam.city} ${game.awayTeam.name} logo`}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <span className="text-white font-medium">
                      {game.awayTeam.city} {game.awayTeam.name}
                    </span>
                  </div>
                  <span className="text-white text-xl font-bold">{game.awayScore ?? "-"}</span>
                </div>

                {/* Home Team */}
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={game.homeTeam.logo || "/placeholder.svg"}
                      alt={`${game.homeTeam.city} ${game.homeTeam.name} logo`}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <span className="text-white font-medium">
                      {game.homeTeam.city} {game.homeTeam.name}
                    </span>
                  </div>
                  <span className="text-white text-xl font-bold">{game.homeScore ?? "-"}</span>
                </div>

                <Button onClick={() => handleEditGame(game)} className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  {game.status === "final" ? "Edit Score" : "Add Score"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Game Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-black border-red-500/30 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Game Score</DialogTitle>
              <DialogDescription className="text-gray-400">Update the final score for this game</DialogDescription>
            </DialogHeader>
            {editingGame && (
              <div className="space-y-4">
                <div className="text-center text-white font-medium mb-4">
                  Week {editingGame.week} - {editingGame.date}
                </div>

                {/* Away Team Score */}
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={editingGame.awayTeam.logo || "/placeholder.svg"}
                      alt={`${editingGame.awayTeam.city} ${editingGame.awayTeam.name} logo`}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <span className="text-white">
                      {editingGame.awayTeam.city} {editingGame.awayTeam.name}
                    </span>
                  </div>
                  <Input
                    type="number"
                    value={editingGame.awayScore ?? ""}
                    onChange={(e) =>
                      setEditingGame({
                        ...editingGame,
                        awayScore: e.target.value ? Number.parseInt(e.target.value) : undefined,
                      })
                    }
                    className="w-20 bg-gray-700 border-gray-600 text-white text-center"
                    placeholder="0"
                  />
                </div>

                {/* Home Team Score */}
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={editingGame.homeTeam.logo || "/placeholder.svg"}
                      alt={`${editingGame.homeTeam.city} ${editingGame.homeTeam.name} logo`}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <span className="text-white">
                      {editingGame.homeTeam.city} {editingGame.homeTeam.name}
                    </span>
                  </div>
                  <Input
                    type="number"
                    value={editingGame.homeScore ?? ""}
                    onChange={(e) =>
                      setEditingGame({
                        ...editingGame,
                        homeScore: e.target.value ? Number.parseInt(e.target.value) : undefined,
                      })
                    }
                    className="w-20 bg-gray-700 border-gray-600 text-white text-center"
                    placeholder="0"
                  />
                </div>

                <Button onClick={handleSaveGame} className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Score
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
