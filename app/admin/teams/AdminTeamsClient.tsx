"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { ArrowLeft, Edit, Save, Users, Upload } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getTeams, updateTeam } from "@/lib/team-data"

export default function AdminTeamsClient() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [teams, setTeams] = useState<any[]>([])
  const [editingTeam, setEditingTeam] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>("")

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("stc-admin")
      if (auth === "true") {
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
    const teamsData = getTeams()
    setTeams(teamsData)
  }

  const handleEditTeam = (team: any) => {
    setEditingTeam({ ...team })
    setLogoPreview(team.logo)
    setLogoFile(null)
    setIsDialogOpen(true)
  }

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveTeam = () => {
    if (editingTeam) {
      // In a real app, you would upload the logo file to a server
      // For demo purposes, we'll use the preview URL
      if (logoFile && logoPreview) {
        editingTeam.logo = logoPreview
      }

      // Update team in global storage
      updateTeam(editingTeam)

      // Update local state
      setTeams(teams.map((team) => (team.id === editingTeam.id ? editingTeam : team)))

      // Trigger a storage event to update other components
      window.dispatchEvent(new Event("stc-teams-updated"))

      setIsDialogOpen(false)
      setEditingTeam(null)
      setLogoFile(null)
      setLogoPreview("")
    }
  }

  const updateEditingTeam = (field: string, value: any) => {
    if (editingTeam) {
      setEditingTeam({ ...editingTeam, [field]: value })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stc-red via-black to-stc-gold flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Loading teams...</p>
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
                <h1 className="text-2xl font-bold text-white">Team Management</h1>
                <p className="text-gray-300">Manage team information, records, and logos</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-stc-gold" />
              <span className="text-white font-medium">{teams.length} Teams</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm hover:bg-black/50 transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 relative">
                        <Image
                          src={team.logo || "/placeholder.svg"}
                          alt={`${team.city} ${team.name} logo`}
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-white">
                          {team.city} {team.name}
                        </CardTitle>
                        <CardDescription className="text-gray-400">{team.conference}</CardDescription>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleEditTeam(team)}
                      size="sm"
                      variant="outline"
                      className="border-stc-gold/30 text-stc-gold hover:bg-stc-gold hover:text-black"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Record */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Record:</span>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-600 text-white">{team.wins}W</Badge>
                        <Badge className="bg-red-600 text-white">{team.losses}L</Badge>
                      </div>
                    </div>

                    {/* Win Percentage */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Win %:</span>
                      <span className="text-white font-medium">
                        {team.wins + team.losses > 0
                          ? ((team.wins / (team.wins + team.losses)) * 100).toFixed(1)
                          : "0.0"}
                        %
                      </span>
                    </div>

                    {/* Description */}
                    <div>
                      <p className="text-gray-400 text-sm line-clamp-2">{team.description}</p>
                    </div>

                    {/* Conference Badge */}
                    <div className="flex justify-center">
                      <Badge
                        variant="outline"
                        className={`${team.conference === "AFC" ? "border-blue-500 text-blue-400" : "border-red-500 text-red-400"}`}
                      >
                        {team.conference}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Edit Team Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-black border-white/20 text-white max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Team</DialogTitle>
              <DialogDescription className="text-gray-400">
                Update team information, records, and logo
              </DialogDescription>
            </DialogHeader>
            {editingTeam && (
              <div className="space-y-4">
                {/* Logo Upload Section */}
                <div className="space-y-3">
                  <Label className="text-gray-300">Team Logo</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 relative bg-gray-800 rounded-lg overflow-hidden">
                      <Image
                        src={logoPreview || editingTeam.logo || "/placeholder.svg"}
                        alt="Team logo preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="logo-upload" className="cursor-pointer">
                        <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors">
                          <Upload className="w-4 h-4" />
                          <span className="text-sm">Upload New Logo</span>
                        </div>
                      </Label>
                      <Input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-300">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={editingTeam.city}
                      onChange={(e) => updateEditingTeam("city", e.target.value)}
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
                      onChange={(e) => updateEditingTeam("name", e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="conference" className="text-gray-300">
                    Conference
                  </Label>
                  <Select
                    value={editingTeam.conference}
                    onValueChange={(value) => updateEditingTeam("conference", value)}
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wins" className="text-gray-300">
                      Wins
                    </Label>
                    <Input
                      id="wins"
                      type="number"
                      value={editingTeam.wins}
                      onChange={(e) => updateEditingTeam("wins", Number.parseInt(e.target.value) || 0)}
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
                      onChange={(e) => updateEditingTeam("losses", Number.parseInt(e.target.value) || 0)}
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
                    onChange={(e) => updateEditingTeam("description", e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    variant="outline"
                    className="border-gray-600 text-gray-400 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveTeam} className="bg-stc-gold text-black hover:bg-stc-gold/80">
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
