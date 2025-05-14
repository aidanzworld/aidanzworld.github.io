"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Team data for Season 13
const teams = [
  // AFC Conference
  // AFC West
  {
    id: 1,
    name: "Broncos",
    city: "Denver",
    conference: "AFC",
    division: "West",
    logo: "/images/team-logos/DEN.png",
    wins: 0,
    losses: 0,
  },
  {
    id: 2,
    name: "Raiders",
    city: "Las Vegas",
    conference: "AFC",
    division: "West",
    logo: "/images/team-logos/LV.png",
    wins: 0,
    losses: 0,
  },
  // AFC Central
  {
    id: 3,
    name: "Chiefs",
    city: "Kansas City",
    conference: "AFC",
    division: "Central",
    logo: "/images/team-logos/KAN.png",
    wins: 0,
    losses: 0,
  },
  {
    id: 4,
    name: "Texans",
    city: "Houston",
    conference: "AFC",
    division: "Central",
    logo: "/images/team-logos/HOU.png",
    wins: 0,
    losses: 0,
  },
  // AFC North
  {
    id: 5,
    name: "Ravens",
    city: "Baltimore",
    conference: "AFC",
    division: "North",
    logo: "/images/team-logos/BAL.png",
    wins: 0,
    losses: 0,
  },
  {
    id: 6,
    name: "Browns",
    city: "Cleveland",
    conference: "AFC",
    division: "North",
    logo: "/images/team-logos/CLE.png",
    wins: 0,
    losses: 0,
  },

  // NFC Conference
  // NFC Central
  {
    id: 7,
    name: "Cardinals",
    city: "Arizona",
    conference: "NFC",
    division: "Central",
    logo: "/images/team-logos/ARI.png",
    wins: 0,
    losses: 0,
  },
  {
    id: 8,
    name: "Lions",
    city: "Detroit",
    conference: "NFC",
    division: "Central",
    logo: "/images/team-logos/DET.png",
    wins: 0,
    losses: 0,
  },
  // NFC North
  {
    id: 9,
    name: "Packers",
    city: "Green Bay",
    conference: "NFC",
    division: "North",
    logo: "/images/team-logos/GB.png",
    wins: 0,
    losses: 0,
  },
  {
    id: 10,
    name: "Bears",
    city: "Chicago",
    conference: "NFC",
    division: "North",
    logo: "/images/team-logos/CHI.png",
    wins: 0,
    losses: 0,
  },
  // NFC East
  {
    id: 11,
    name: "Panthers",
    city: "Carolina",
    conference: "NFC",
    division: "East",
    logo: "/images/team-logos/CAR.png",
    wins: 0,
    losses: 0,
  },
  {
    id: 12,
    name: "Buccaneers",
    city: "Tampa Bay",
    conference: "NFC",
    division: "East",
    logo: "/images/team-logos/TB.png",
    wins: 0,
    losses: 0,
  },
]

// Helper function to calculate win percentage
const calculateWinPercentage = (wins: number, losses: number) => {
  const total = wins + losses
  if (total === 0) return 0
  return (wins / total).toFixed(3).replace(/^0+/, "")
}

// Group teams by conference and division
const groupTeamsByConference = () => {
  const grouped = {
    AFC: {
      West: teams
        .filter((team) => team.conference === "AFC" && team.division === "West")
        .sort((a, b) => b.wins - a.wins || a.losses - b.losses),
      Central: teams
        .filter((team) => team.conference === "AFC" && team.division === "Central")
        .sort((a, b) => b.wins - a.wins || a.losses - b.losses),
      North: teams
        .filter((team) => team.conference === "AFC" && team.division === "North")
        .sort((a, b) => b.wins - a.wins || a.losses - b.losses),
    },
    NFC: {
      Central: teams
        .filter((team) => team.conference === "NFC" && team.division === "Central")
        .sort((a, b) => b.wins - a.wins || a.losses - b.losses),
      North: teams
        .filter((team) => team.conference === "NFC" && team.division === "North")
        .sort((a, b) => b.wins - a.wins || a.losses - b.losses),
      East: teams
        .filter((team) => team.conference === "NFC" && team.division === "East")
        .sort((a, b) => b.wins - a.wins || a.losses - b.losses),
    },
  }
  return grouped
}

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

export default function StandingsClientPage() {
  const [isClient, setIsClient] = useState(false)
  const [activeTab, setActiveTab] = useState("AFC")

  useEffect(() => {
    setIsClient(true)
  }, [])

  const groupedTeams = groupTeamsByConference()

  if (!isClient) {
    return null // Prevent SSR flash
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        STC SEASON 13 STANDINGS
      </motion.h1>

      <Tabs defaultValue="AFC" className="w-full" onValueChange={(value) => setActiveTab(value)}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="AFC" className="text-lg py-3">
              AFC Conference
            </TabsTrigger>
            <TabsTrigger value="NFC" className="text-lg py-3">
              NFC Conference
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="AFC">
          <div className="space-y-8">
            {/* AFC West */}
            <Card>
              <CardHeader className="bg-[#CE1126] text-white">
                <CardTitle>AFC West Division</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-red-50">
                      <TableHead>Team</TableHead>
                      <TableHead className="text-center">W</TableHead>
                      <TableHead className="text-center">L</TableHead>
                      <TableHead className="text-center">PCT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedTeams.AFC.West.map((team, index) => (
                      <motion.tr
                        key={team.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                        className="border-b"
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-8 h-8 relative mr-2">
                              <Image
                                src={team.logo || "/placeholder.svg"}
                                alt={`${team.name} logo`}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span>
                              {team.city} {team.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{team.wins}</TableCell>
                        <TableCell className="text-center">{team.losses}</TableCell>
                        <TableCell className="text-center">{calculateWinPercentage(team.wins, team.losses)}</TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* AFC Central */}
            <Card>
              <CardHeader className="bg-[#CE1126] text-white">
                <CardTitle>AFC Central Division</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-red-50">
                      <TableHead>Team</TableHead>
                      <TableHead className="text-center">W</TableHead>
                      <TableHead className="text-center">L</TableHead>
                      <TableHead className="text-center">PCT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedTeams.AFC.Central.map((team, index) => (
                      <motion.tr
                        key={team.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                        className="border-b"
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-8 h-8 relative mr-2">
                              <Image
                                src={team.logo || "/placeholder.svg"}
                                alt={`${team.name} logo`}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span>
                              {team.city} {team.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{team.wins}</TableCell>
                        <TableCell className="text-center">{team.losses}</TableCell>
                        <TableCell className="text-center">{calculateWinPercentage(team.wins, team.losses)}</TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* AFC North */}
            <Card>
              <CardHeader className="bg-[#CE1126] text-white">
                <CardTitle>AFC North Division</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-red-50">
                      <TableHead>Team</TableHead>
                      <TableHead className="text-center">W</TableHead>
                      <TableHead className="text-center">L</TableHead>
                      <TableHead className="text-center">PCT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedTeams.AFC.North.map((team, index) => (
                      <motion.tr
                        key={team.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                        className="border-b"
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-8 h-8 relative mr-2">
                              <Image
                                src={team.logo || "/placeholder.svg"}
                                alt={`${team.name} logo`}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span>
                              {team.city} {team.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{team.wins}</TableCell>
                        <TableCell className="text-center">{team.losses}</TableCell>
                        <TableCell className="text-center">{calculateWinPercentage(team.wins, team.losses)}</TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="NFC">
          <div className="space-y-8">
            {/* NFC Central */}
            <Card>
              <CardHeader className="bg-[#003B66] text-white">
                <CardTitle>NFC Central Division</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Team</TableHead>
                      <TableHead className="text-center">W</TableHead>
                      <TableHead className="text-center">L</TableHead>
                      <TableHead className="text-center">PCT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedTeams.NFC.Central.map((team, index) => (
                      <motion.tr
                        key={team.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                        className="border-b"
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-8 h-8 relative mr-2">
                              <Image
                                src={team.logo || "/placeholder.svg"}
                                alt={`${team.name} logo`}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span>
                              {team.city} {team.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{team.wins}</TableCell>
                        <TableCell className="text-center">{team.losses}</TableCell>
                        <TableCell className="text-center">{calculateWinPercentage(team.wins, team.losses)}</TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* NFC North */}
            <Card>
              <CardHeader className="bg-[#003B66] text-white">
                <CardTitle>NFC North Division</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Team</TableHead>
                      <TableHead className="text-center">W</TableHead>
                      <TableHead className="text-center">L</TableHead>
                      <TableHead className="text-center">PCT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedTeams.NFC.North.map((team, index) => (
                      <motion.tr
                        key={team.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                        className="border-b"
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-8 h-8 relative mr-2">
                              <Image
                                src={team.logo || "/placeholder.svg"}
                                alt={`${team.name} logo`}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span>
                              {team.city} {team.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{team.wins}</TableCell>
                        <TableCell className="text-center">{team.losses}</TableCell>
                        <TableCell className="text-center">{calculateWinPercentage(team.wins, team.losses)}</TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* NFC East */}
            <Card>
              <CardHeader className="bg-[#003B66] text-white">
                <CardTitle>NFC East Division</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Team</TableHead>
                      <TableHead className="text-center">W</TableHead>
                      <TableHead className="text-center">L</TableHead>
                      <TableHead className="text-center">PCT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedTeams.NFC.East.map((team, index) => (
                      <motion.tr
                        key={team.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                        className="border-b"
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-8 h-8 relative mr-2">
                              <Image
                                src={team.logo || "/placeholder.svg"}
                                alt={`${team.name} logo`}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span>
                              {team.city} {team.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{team.wins}</TableCell>
                        <TableCell className="text-center">{team.losses}</TableCell>
                        <TableCell className="text-center">{calculateWinPercentage(team.wins, team.losses)}</TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
