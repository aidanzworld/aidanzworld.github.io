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
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Edit, Save, Users } from "lucide-react"
import Image from "next/image"

interface Team {
  id: string
  name: string
  city: string
  logo: string
  conference: "AFC" | "NFC"
  division: "North" | "South" | "East" | "West"
  wins: number
  losses: number
  description: string
}

export default function AdminTeamsClient() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [teams, setTeams] = useState<Team[]>([])
  const [editingTeam, setEditingTeam] = useState<Team | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("stc-admin-auth") === "true"
      if (!isLoggedIn) {
        router.push("/admin")
        return
      }
      setIsAuthenticated(true)
      loadTeams()
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const loadTeams = () => {
    // Sample team data - in a real app, this would come from an API
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
        description: "The defending Super Bowl champions with explosive offense.",
      },
      {
        id: "2",
        name: "Colts",
        city: "Indianapolis",
        logo: "/images/team-logos/IND.png",
        conference: "AFC",
        division: "South",
        wins: 8,
        losses: 4,
        description: "Young team with strong potential and solid defense.",
      },
      {
        id: "3",
        name: "Dolphins",
        city: "Miami",
        logo: "/images/team-logos/MIA.png",
        conference: "AFC",
        division: "East",
        wins: 9,
        losses: 3,
        description: "High-powered offense with elite speed at skill positions.",
      },
      {
        id: "4",
        name: "Falcons",
        city: "Atlanta",
        logo: "/images/team-logos/ATL.png",
        conference: "NFC",
        division: "South",
        wins: 6,
        losses: 6,
        description: "Rebuilding franchise with promising young talent.",
      },
      {
        id: "5",
        name: "Saints",
        city: "New Orleans",
        logo: "/images/team-logos/NO.png",
        conference: "NFC",
        division: "South",
        wins: 7,
        losses: 5,
        description: "Veteran team with strong home field advantage.",
      },
      {
        id: "6",
        name: "49ers",
        city: "San Francisco",
        logo: "/images/team-logos/49ERS.png",
        conference: "NFC",
        division: "West",
        wins: 11,
        losses: 1,
        description: "Elite defense and balanced offense make them title contenders.",
      },
    ]
    setTeams(sampleTeams)
  }

  const handleEditTeam = (team: Team) => {
    setEditingTeam({ ...team })
    setIsDialogOpen(true)
  }

  const handleSaveTeam = () => {
    if (!editingTeam) return

    setTeams(teams.map((team) => (team.id === editingTeam.id ? editingTeam : team)))
    setIsDialogOpen(false)
    setEditingTeam(null)
  }

  const updateEditingTeam = (field: keyof Team, value: any) => {
    if (!editingTeam) return
    setEditingTeam({ ...editingTeam, [field]: value })
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
                <h1 className="text-2xl font-bold text-white">Team Management</h1>
                <p className="text-red-300">Edit team information and records</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">{teams.length} Teams</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Card
              key={team.id}
              className="bg-black/40 border-red-800/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={team.logo || "/placeholder.svg"}
                        alt={`${team.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-white">
                        {team.city} {team.name}
                      </CardTitle>
                      <CardDescription className="text-red-300">
                        {team.conference} {team.division}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleEditTeam(team)}
                    size="sm"
                    variant="outline"
                    className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-black"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-red-300">Record:</span>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      {team.wins}-{team.losses}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-300">Conference:</span>
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                      {team.conference}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-300">Division:</span>
                    <span className="text-white">{team.division}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">{team.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Team Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black border-red-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogDescription className="text-red-300">Update team information and records</DialogDescription>
          </DialogHeader>

          {editingTeam && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-red-300">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={editingTeam.city}
                    onChange={(e) => updateEditingTeam("city", e.target.value)}
                    className="bg-red-950/30 border-red-800 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="name" className="text-red-300">
                    Team Name
                  </Label>
                  <Input
                    id="name"
                    value={editingTeam.name}
                    onChange={(e) => updateEditingTeam("name", e.target.value)}
                    className="bg-red-950/30 border-red-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="conference" className="text-red-300">
                    Conference
                  </Label>
                  <Select
                    value={editingTeam.conference}
                    onValueChange={(value) => updateEditingTeam("conference", value)}
                  >
                    <SelectTrigger className="bg-red-950/30 border-red-800 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-red-800">
                      <SelectItem value="AFC" className="text-white">
                        AFC
                      </SelectItem>
                      <SelectItem value="NFC" className="text-white">
                        NFC
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="division" className="text-red-300">
                    Division
                  </Label>
                  <Select value={editingTeam.division} onValueChange={(value) => updateEditingTeam("division", value)}>
                    <SelectTrigger className="bg-red-950/30 border-red-800 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-red-800">
                      <SelectItem value="North" className="text-white">
                        North
                      </SelectItem>
                      <SelectItem value="South" className="text-white">
                        South
                      </SelectItem>
                      <SelectItem value="East" className="text-white">
                        East
                      </SelectItem>
                      <SelectItem value="West" className="text-white">
                        West
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="wins" className="text-red-300">
                    Wins
                  </Label>
                  <Input
                    id="wins"
                    type="number"
                    value={editingTeam.wins}
                    onChange={(e) => updateEditingTeam("wins", Number.parseInt(e.target.value) || 0)}
                    className="bg-red-950/30 border-red-800 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="losses" className="text-red-300">
                    Losses
                  </Label>
                  <Input
                    id="losses"
                    type="number"
                    value={editingTeam.losses}
                    onChange={(e) => updateEditingTeam("losses", Number.parseInt(e.target.value) || 0)}
                    className="bg-red-950/30 border-red-800 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-red-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={editingTeam.description}
                  onChange={(e) => updateEditingTeam("description", e.target.value)}
                  className="bg-red-950/30 border-red-800 text-white"
                  rows={3}
                />
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
            <Button onClick={handleSaveTeam} className="bg-yellow-600 text-black hover:bg-yellow-500">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
