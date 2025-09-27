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
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Edit, Save } from "lucide-react"
import Link from "next/link"

interface Team {
  id: string
  name: string
  city: string
  logo: string
  conference: string
  division: string
  wins: number
  losses: number
  description: string
}

export default function AdminTeamsClient() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [teams, setTeams] = useState<Team[]>([])
  const [editingTeam, setEditingTeam] = useState<Team | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("stc-admin-auth")
      if (auth === "authenticated") {
        setIsAuthenticated(true)
        loadTeams()
      } else {
        router.push("/admin")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const loadTeams = () => {
    // Sample team data
    const sampleTeams: Team[] = [
      {
        id: "1",
        name: "Chiefs",
        city: "Kansas City",
        logo: "/images/team-logos/KAN.png",
        conference: "AFC",
        division: "West",
        wins: 10,
        losses: 2,
        description: "The defending champions with a high-powered offense.",
      },
      {
        id: "2",
        name: "Raiders",
        city: "Las Vegas",
        logo: "/images/team-logos/LV.png",
        conference: "AFC",
        division: "West",
        wins: 6,
        losses: 6,
        description: "A team with a rich history and passionate fanbase.",
      },
      {
        id: "3",
        name: "Broncos",
        city: "Denver",
        logo: "/images/team-logos/DEN.png",
        conference: "AFC",
        division: "West",
        wins: 7,
        losses: 5,
        description: "Known for their strong defense and running game.",
      },
      {
        id: "4",
        name: "Colts",
        city: "Indianapolis",
        logo: "/images/team-logos/IND.png",
        conference: "AFC",
        division: "South",
        wins: 8,
        losses: 4,
        description: "A franchise with a storied history and great tradition.",
      },
      {
        id: "5",
        name: "Oilers",
        city: "Houston",
        logo: "/images/team-logos/OILERS.png",
        conference: "AFC",
        division: "South",
        wins: 5,
        losses: 7,
        description: "A classic franchise making their mark in the league.",
      },
      {
        id: "6",
        name: "Dolphins",
        city: "Miami",
        logo: "/images/team-logos/MIA.png",
        conference: "AFC",
        division: "East",
        wins: 9,
        losses: 3,
        description: "Known for their explosive offensive capabilities.",
      },
    ]
    setTeams(sampleTeams)
  }

  const handleEditTeam = (team: Team) => {
    setEditingTeam({ ...team })
    setIsDialogOpen(true)
  }

  const handleSaveTeam = () => {
    if (editingTeam) {
      setTeams(teams.map((team) => (team.id === editingTeam.id ? editingTeam : team)))
      setIsDialogOpen(false)
      setEditingTeam(null)
    }
  }

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
              <h1 className="text-4xl font-bold text-white">Team Management</h1>
              <p className="text-gray-300">Manage team information and records</p>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Card
              key={team.id}
              className="bg-black/50 border-red-500/30 backdrop-blur-sm hover:bg-black/70 transition-colors"
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Image
                    src={team.logo || "/placeholder.svg"}
                    alt={`${team.city} ${team.name} logo`}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                </div>
                <CardTitle className="text-white text-xl">
                  {team.city} {team.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {team.conference} {team.division}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Record:</span>
                  <span className="text-white font-bold">
                    {team.wins}-{team.losses}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{team.description}</p>
                <Button onClick={() => handleEditTeam(team)} className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Team
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Team Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-black border-red-500/30 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Team</DialogTitle>
              <DialogDescription className="text-gray-400">Update team information and records</DialogDescription>
            </DialogHeader>
            {editingTeam && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-300">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={editingTeam.city}
                      onChange={(e) => setEditingTeam({ ...editingTeam, city: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      Team Name
                    </Label>
                    <Input
                      id="name"
                      value={editingTeam.name}
                      onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="conference" className="text-gray-300">
                      Conference
                    </Label>
                    <Select
                      value={editingTeam.conference}
                      onValueChange={(value) => setEditingTeam({ ...editingTeam, conference: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="AFC">AFC</SelectItem>
                        <SelectItem value="NFC">NFC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="division" className="text-gray-300">
                      Division
                    </Label>
                    <Select
                      value={editingTeam.division}
                      onValueChange={(value) => setEditingTeam({ ...editingTeam, division: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="North">North</SelectItem>
                        <SelectItem value="South">South</SelectItem>
                        <SelectItem value="East">East</SelectItem>
                        <SelectItem value="West">West</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wins" className="text-gray-300">
                      Wins
                    </Label>
                    <Input
                      id="wins"
                      type="number"
                      value={editingTeam.wins}
                      onChange={(e) => setEditingTeam({ ...editingTeam, wins: Number.parseInt(e.target.value) || 0 })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="losses" className="text-gray-300">
                      Losses
                    </Label>
                    <Input
                      id="losses"
                      type="number"
                      value={editingTeam.losses}
                      onChange={(e) => setEditingTeam({ ...editingTeam, losses: Number.parseInt(e.target.value) || 0 })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={editingTeam.description}
                    onChange={(e) => setEditingTeam({ ...editingTeam, description: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    rows={3}
                  />
                </div>

                <Button onClick={handleSaveTeam} className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
