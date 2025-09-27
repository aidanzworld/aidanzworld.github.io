"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Edit, Save, Calendar, Trophy } from "lucide-react"
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
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<Game[]>([])
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState<string>("all")

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("stc-admin-auth") === "true"
      if (!isLoggedIn) {
        router.push("/admin")
        return
      }
      setIsAuthenticated(true)
      loadGames()
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const loadGames = () => {
    // Sample game data - in a real app, this would come from an API
    const sampleGames: Game[] = [
      {
        id: "1",
        week: 13,
        homeTeam: { name: "Chiefs", city: "Kansas City", logo: "/images/team-logos/KAN.png" },
        awayTeam: { name: "Raiders", city: "Las Vegas", logo: "/images/team-logos/LV.png" },
        homeScore: 28,
        awayScore: 17,
        status: "final",
        date: "2024-12-01",
        time: "1:00 PM",
      },
      {
        id: "2",
        week: 13,
        homeTeam: { name: "Dolphins", city: "Miami", logo: "/images/team-logos/MIA.png" },
        awayTeam: { name: "Colts", city: "Indianapolis", logo: "/images/team-logos/IND.png" },
        homeScore: 24,
        awayScore: 21,
        status: "final",
        date: "2024-12-01",
        time: "4:25 PM",
      },
      {
        id: "3",
        week: 14,
        homeTeam: { name: "49ers", city: "San Francisco", logo: "/images/team-logos/49ERS.png" },
        awayTeam: { name: "Saints", city: "New Orleans", logo: "/images/team-logos/NO.png" },
        status: "scheduled",
        date: "2024-12-08",
        time: "1:00 PM",
      },
      {
        id: "4",
        week: 14,
        homeTeam: { name: "Falcons", city: "Atlanta", logo: "/images/team-logos/ATL.png" },
        awayTeam: { name: "Oilers", city: "Houston", logo: "/images/team-logos/OILERS.png" },
        status: "scheduled",
        date: "2024-12-08",
        time: "4:25 PM",
      },
      {
        id: "5",
        week: 15,
        homeTeam: { name: "Colts", city: "Indianapolis", logo: "/images/team-logos/IND.png" },
        awayTeam: { name: "Chiefs", city: "Kansas City", logo: "/images/team-logos/KAN.png" },
        status: "scheduled",
        date: "2024-12-15",
        time: "8:20 PM",
      },
    ]
    setGames(sampleGames)
  }

  const handleEditGame = (game: Game) => {
    setEditingGame({ ...game })
    setIsDialogOpen(true)
  }

  const handleSaveGame = () => {
    if (!editingGame) return

    // Auto-update status when scores are added
    if (editingGame.homeScore !== undefined && editingGame.awayScore !== undefined) {
      editingGame.status = "final"
    }

    setGames(games.map((game) => (game.id === editingGame.id ? editingGame : game)))
    setIsDialogOpen(false)
    setEditingGame(null)
  }

  const updateEditingGame = (field: keyof Game, value: any) => {
    if (!editingGame) return
    setEditingGame({ ...editingGame, [field]: value })
  }

  const filteredGames = selectedWeek === "all" ? games : games.filter((game) => game.week.toString() === selectedWeek)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "final":
        return <Badge className="bg-green-600 text-white">Final</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-600 text-black">Live</Badge>
      case "scheduled":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-400">
            Scheduled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-yellow-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-yellow-900">
      {/* Header */}
      <div className="border-b border-red-800/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push("/admin/dashboard")}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-white hover:bg-red-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Game Management</h1>
                <p className="text-red-300">Update scores and game information</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-32 bg-black/40 border-red-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-red-800">
                  <SelectItem value="all" className="text-white">
                    All Weeks
                  </SelectItem>
                  <SelectItem value="13" className="text-white">
                    Week 13
                  </SelectItem>
                  <SelectItem value="14" className="text-white">
                    Week 14
                  </SelectItem>
                  <SelectItem value="15" className="text-white">
                    Week 15
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">{filteredGames.length} Games</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGames.map((game) => (
            <Card
              key={game.id}
              className="bg-black/40 border-red-800/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <CardTitle className="text-white">Week {game.week}</CardTitle>
                    {getStatusBadge(game.status)}
                  </div>
                  <Button
                    onClick={() => handleEditGame(game)}
                    size="sm"
                    variant="outline"
                    className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-black"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription className="text-red-300">
                  {game.date} at {game.time}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Away Team */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-950/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 relative">
                        <Image
                          src={game.awayTeam.logo || "/placeholder.svg"}
                          alt={`${game.awayTeam.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-white font-medium">
                        {game.awayTeam.city} {game.awayTeam.name}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white">{game.awayScore ?? "-"}</div>
                  </div>

                  {/* Home Team */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-950/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 relative">
                        <Image
                          src={game.homeTeam.logo || "/placeholder.svg"}
                          alt={`${game.homeTeam.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-white font-medium">
                        {game.homeTeam.city} {game.homeTeam.name}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white">{game.homeScore ?? "-"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Game Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black border-red-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Game</DialogTitle>
            <DialogDescription className="text-red-300">Update game scores and information</DialogDescription>
          </DialogHeader>

          {editingGame && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Week {editingGame.week} - {editingGame.date}
                </h3>
              </div>

              {/* Away Team Score */}
              <div className="space-y-2">
                <Label className="text-red-300">
                  {editingGame.awayTeam.city} {editingGame.awayTeam.name} Score
                </Label>
                <Input
                  type="number"
                  value={editingGame.awayScore ?? ""}
                  onChange={(e) =>
                    updateEditingGame("awayScore", e.target.value ? Number.parseInt(e.target.value) : undefined)
                  }
                  placeholder="Enter score"
                  className="bg-red-950/30 border-red-800 text-white"
                />
              </div>

              {/* Home Team Score */}
              <div className="space-y-2">
                <Label className="text-red-300">
                  {editingGame.homeTeam.city} {editingGame.homeTeam.name} Score
                </Label>
                <Input
                  type="number"
                  value={editingGame.homeScore ?? ""}
                  onChange={(e) =>
                    updateEditingGame("homeScore", e.target.value ? Number.parseInt(e.target.value) : undefined)
                  }
                  placeholder="Enter score"
                  className="bg-red-950/30 border-red-800 text-white"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-red-300">Game Status</Label>
                <Select value={editingGame.status} onValueChange={(value) => updateEditingGame("status", value)}>
                  <SelectTrigger className="bg-red-950/30 border-red-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-red-800">
                    <SelectItem value="scheduled" className="text-white">
                      Scheduled
                    </SelectItem>
                    <SelectItem value="in-progress" className="text-white">
                      In Progress
                    </SelectItem>
                    <SelectItem value="final" className="text-white">
                      Final
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={() => setIsDialogOpen(false)}
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
            >
              Cancel
            </Button>
            <Button onClick={handleSaveGame} className="bg-yellow-600 text-black hover:bg-yellow-500">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
