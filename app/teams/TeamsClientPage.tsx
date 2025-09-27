"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Trophy, Users, MapPin, Calendar } from "lucide-react"
import { getTeams, type Team } from "@/lib/team-data"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function TeamsClientPage() {
  const [isClient, setIsClient] = useState(false)
  const [selectedConference, setSelectedConference] = useState<string>("all")
  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    setIsClient(true)
    loadTeams()

    // Listen for team updates
    const handleTeamUpdate = () => {
      loadTeams()
    }

    window.addEventListener("stc-teams-updated", handleTeamUpdate)

    return () => {
      window.removeEventListener("stc-teams-updated", handleTeamUpdate)
    }
  }, [])

  const loadTeams = () => {
    const teamData = getTeams()
    setTeams(teamData)
  }

  const filteredTeams =
    selectedConference === "all" ? teams : teams.filter((team) => team.conference === selectedConference)

  const getRecordColor = (wins: number, losses: number) => {
    const winPercentage = wins / (wins + losses)
    if (winPercentage >= 0.7) return "text-green-600"
    if (winPercentage >= 0.5) return "text-yellow-600"
    return "text-red-600"
  }

  if (!isClient) {
    return null // Prevent SSR flash
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-stc-red to-stc-gold bg-clip-text text-transparent">
            STC Teams
          </h1>
          <p className="text-lg text-gray-600 mb-6">Meet the teams competing in Season 14</p>

          {/* Conference Filter */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              onClick={() => setSelectedConference("all")}
              variant={selectedConference === "all" ? "default" : "outline"}
              className={
                selectedConference === "all"
                  ? "bg-stc-red text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              All Teams
            </Button>
            <Button
              onClick={() => setSelectedConference("AFC")}
              variant={selectedConference === "AFC" ? "default" : "outline"}
              className={
                selectedConference === "AFC"
                  ? "bg-stc-red text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              AFC
            </Button>
            <Button
              onClick={() => setSelectedConference("NFC")}
              variant={selectedConference === "NFC" ? "default" : "outline"}
              className={
                selectedConference === "NFC"
                  ? "bg-stc-red text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              NFC
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {filteredTeams.map((team, index) => (
            <motion.div key={team.id} variants={itemVariants} custom={index}>
              <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 relative">
                      <Image
                        src={team.logo || "/placeholder.svg"}
                        alt={`${team.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-black">
                    {team.city} {team.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {team.conference} {team.division}
                  </CardDescription>
                  <div className="flex justify-center space-x-2 mt-2">
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      {team.conference}
                    </Badge>
                    <Badge className={`${getRecordColor(team.record.wins, team.record.losses)} bg-transparent border`}>
                      {team.record.wins}-{team.record.losses}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 text-sm leading-relaxed">{team.description}</p>

                  {/* Team Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-stc-gold" />
                      <span className="text-gray-600">Founded {team.founded}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-stc-gold" />
                      <span className="text-gray-600">{team.stadium}</span>
                    </div>
                  </div>

                  {/* Recent Game */}
                  {team.lastGame && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Game:</span>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={
                              team.lastGame.result === "W" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }
                          >
                            {team.lastGame.result}
                          </Badge>
                          <span className="text-sm font-medium text-black">
                            {team.lastGame.score} vs {team.lastGame.opponent}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Next Game */}
                  {team.nextGame && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Next Game:</span>
                        <div className="text-sm font-medium text-black">
                          {team.nextGame.opponent} • {team.nextGame.date}
                        </div>
                      </div>
                    </div>
                  )}

                  <Link href={`/teams/${team.id}`}>
                    <Button className="w-full bg-stc-red hover:bg-stc-red/90 text-white">
                      <Users className="w-4 h-4 mr-2" />
                      View Team Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-stc-red to-stc-gold p-6 rounded-lg text-white">
            <Trophy className="w-8 h-8 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Season 14 Championship</h3>
            <p className="text-white/90">Ten teams competing for the ultimate prize in STC League history</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
