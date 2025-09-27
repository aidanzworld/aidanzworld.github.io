"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { Trophy, Target, Shield, Zap, TrendingUp } from "lucide-react"

interface PlayerStat {
  rank: number
  name: string
  team: string
  teamLogo: string
  value: number
  games: number
  average: number
}

interface TeamStat {
  rank: number
  team: string
  city: string
  logo: string
  value: number
  games: number
  average: number
}

// Sample player stats data
const passingYards: PlayerStat[] = [
  {
    rank: 1,
    name: "Lamar Jackson",
    team: "Ravens",
    teamLogo: "/images/team-logos/BAL.png",
    value: 487,
    games: 2,
    average: 243.5,
  },
  {
    rank: 2,
    name: "Patrick Mahomes",
    team: "Chiefs",
    teamLogo: "/images/team-logos/KAN.png",
    value: 445,
    games: 2,
    average: 222.5,
  },
  {
    rank: 3,
    name: "Tua Tagovailoa",
    team: "Dolphins",
    teamLogo: "/images/team-logos/MIA.png",
    value: 398,
    games: 2,
    average: 199.0,
  },
  {
    rank: 4,
    name: "Brock Purdy",
    team: "49ers",
    teamLogo: "/images/team-logos/49ERS.png",
    value: 387,
    games: 2,
    average: 193.5,
  },
  {
    rank: 5,
    name: "Aaron Rodgers",
    team: "Jets",
    teamLogo: "/images/team-logos/NYJ.png",
    value: 356,
    games: 2,
    average: 178.0,
  },
]

const rushingYards: PlayerStat[] = [
  {
    rank: 1,
    name: "Derrick Henry",
    team: "Ravens",
    teamLogo: "/images/team-logos/BAL.png",
    value: 234,
    games: 2,
    average: 117.0,
  },
  {
    rank: 2,
    name: "Christian McCaffrey",
    team: "49ers",
    teamLogo: "/images/team-logos/49ERS.png",
    value: 198,
    games: 2,
    average: 99.0,
  },
  {
    rank: 3,
    name: "Isiah Pacheco",
    team: "Chiefs",
    teamLogo: "/images/team-logos/KAN.png",
    value: 167,
    games: 2,
    average: 83.5,
  },
  {
    rank: 4,
    name: "Breece Hall",
    team: "Jets",
    teamLogo: "/images/team-logos/NYJ.png",
    value: 145,
    games: 2,
    average: 72.5,
  },
  {
    rank: 5,
    name: "Raheem Mostert",
    team: "Dolphins",
    teamLogo: "/images/team-logos/MIA.png",
    value: 134,
    games: 2,
    average: 67.0,
  },
]

const receivingYards: PlayerStat[] = [
  {
    rank: 1,
    name: "Tyreek Hill",
    team: "Dolphins",
    teamLogo: "/images/team-logos/MIA.png",
    value: 267,
    games: 2,
    average: 133.5,
  },
  {
    rank: 2,
    name: "Travis Kelce",
    team: "Chiefs",
    teamLogo: "/images/team-logos/KAN.png",
    value: 234,
    games: 2,
    average: 117.0,
  },
  {
    rank: 3,
    name: "Deebo Samuel",
    team: "49ers",
    teamLogo: "/images/team-logos/49ERS.png",
    value: 198,
    games: 2,
    average: 99.0,
  },
  {
    rank: 4,
    name: "Garrett Wilson",
    team: "Jets",
    teamLogo: "/images/team-logos/NYJ.png",
    value: 187,
    games: 2,
    average: 93.5,
  },
  {
    rank: 5,
    name: "Mark Andrews",
    team: "Ravens",
    teamLogo: "/images/team-logos/BAL.png",
    value: 156,
    games: 2,
    average: 78.0,
  },
]

const touchdowns: PlayerStat[] = [
  {
    rank: 1,
    name: "Lamar Jackson",
    team: "Ravens",
    teamLogo: "/images/team-logos/BAL.png",
    value: 6,
    games: 2,
    average: 3.0,
  },
  {
    rank: 2,
    name: "Patrick Mahomes",
    team: "Chiefs",
    teamLogo: "/images/team-logos/KAN.png",
    value: 5,
    games: 2,
    average: 2.5,
  },
  {
    rank: 3,
    name: "Christian McCaffrey",
    team: "49ers",
    teamLogo: "/images/team-logos/49ERS.png",
    value: 4,
    games: 2,
    average: 2.0,
  },
  {
    rank: 4,
    name: "Travis Kelce",
    team: "Chiefs",
    teamLogo: "/images/team-logos/KAN.png",
    value: 3,
    games: 2,
    average: 1.5,
  },
  {
    rank: 5,
    name: "Tyreek Hill",
    team: "Dolphins",
    teamLogo: "/images/team-logos/MIA.png",
    value: 3,
    games: 2,
    average: 1.5,
  },
]

// Sample team stats data
const teamOffense: TeamStat[] = [
  {
    rank: 1,
    team: "Ravens",
    city: "Baltimore",
    logo: "/images/team-logos/BAL.png",
    value: 456,
    games: 2,
    average: 228.0,
  },
  {
    rank: 2,
    team: "Chiefs",
    city: "Kansas City",
    logo: "/images/team-logos/KAN.png",
    value: 423,
    games: 2,
    average: 211.5,
  },
  {
    rank: 3,
    team: "49ers",
    city: "San Francisco",
    logo: "/images/team-logos/49ERS.png",
    value: 398,
    games: 2,
    average: 199.0,
  },
  {
    rank: 4,
    team: "Dolphins",
    city: "Miami",
    logo: "/images/team-logos/MIA.png",
    value: 367,
    games: 2,
    average: 183.5,
  },
  { rank: 5, team: "Jets", city: "New York", logo: "/images/team-logos/NYJ.png", value: 334, games: 2, average: 167.0 },
]

const teamDefense: TeamStat[] = [
  {
    rank: 1,
    team: "Ravens",
    city: "Baltimore",
    logo: "/images/team-logos/BAL.png",
    value: 189,
    games: 2,
    average: 94.5,
  },
  { rank: 2, team: "Jets", city: "New York", logo: "/images/team-logos/NYJ.png", value: 234, games: 2, average: 117.0 },
  {
    rank: 3,
    team: "Chiefs",
    city: "Kansas City",
    logo: "/images/team-logos/KAN.png",
    value: 267,
    games: 2,
    average: 133.5,
  },
  {
    rank: 4,
    team: "49ers",
    city: "San Francisco",
    logo: "/images/team-logos/49ERS.png",
    value: 289,
    games: 2,
    average: 144.5,
  },
  {
    rank: 5,
    team: "Dolphins",
    city: "Miami",
    logo: "/images/team-logos/MIA.png",
    value: 312,
    games: 2,
    average: 156.0,
  },
]

export default function StatsPageClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
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
            Season 14 Statistics
          </h1>
          <p className="text-lg text-gray-600 mb-2">Player and team performance leaders</p>
          <p className="text-sm text-gray-500">Updated through Week 2</p>
        </motion.div>

        <Tabs defaultValue="players" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <TabsList className="flex justify-center gap-2 mb-4 bg-gray-100">
              <TabsTrigger
                value="players"
                className="px-6 py-2 data-[state=active]:bg-stc-red data-[state=active]:text-white"
              >
                Player Stats
              </TabsTrigger>
              <TabsTrigger
                value="teams"
                className="px-6 py-2 data-[state=active]:bg-stc-red data-[state=active]:text-white"
              >
                Team Stats
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="players">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Passing Yards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Passing Yards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="w-12 text-center font-semibold text-gray-700">Rank</TableHead>
                          <TableHead className="font-semibold text-gray-700">Player</TableHead>
                          <TableHead className="text-center font-semibold text-gray-700">Yards</TableHead>
                          <TableHead className="text-center font-semibold text-gray-700">Avg</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {passingYards.map((player) => (
                          <TableRow key={player.rank} className="hover:bg-gray-50">
                            <TableCell className="text-center font-semibold text-black">{player.rank}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={player.teamLogo || "/placeholder.svg"}
                                  alt={`${player.team} logo`}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                                <div>
                                  <div className="font-semibold text-black">{player.name}</div>
                                  <div className="text-sm text-gray-500">{player.team}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-semibold text-black">{player.value}</TableCell>
                            <TableCell className="text-center text-gray-600">{player.average.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Rushing Yards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Rushing Yards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="w-12 text-center font-semibold text-gray-700">Rank</TableHead>
                          <TableHead className="font-semibold text-gray-700">Player</TableHead>
                          <TableHead className="text-center font-semibold text-gray-700">Yards</TableHead>
                          <TableHead className="text-center font-semibold text-gray-700">Avg</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rushingYards.map((player) => (
                          <TableRow key={player.rank} className="hover:bg-gray-50">
                            <TableCell className="text-center font-semibold text-black">{player.rank}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={player.teamLogo || "/placeholder.svg"}
                                  alt={`${player.team} logo`}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                                <div>
                                  <div className="font-semibold text-black">{player.name}</div>
                                  <div className="text-sm text-gray-500">{player.team}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-semibold text-black">{player.value}</TableCell>
                            <TableCell className="text-center text-gray-600">{player.average.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Receiving Yards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Receiving Yards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="w-12 text-center font-semibold text-gray-700">Rank</TableHead>
                          <TableHead className="font-semibold text-gray-700">Player</TableHead>
                          <TableHead className="text-center font-semibold text-gray-700">Yards</TableHead>
                          <TableHead className="text-center font-semibold text-gray-700">Avg</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {receivingYards.map((player) => (
                          <TableRow key={player.rank} className="hover:bg-gray-50">
                            <TableCell className="text-center font-semibold text-black">{player.rank}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={player.teamLogo || "/placeholder.svg"}
                                  alt={`${player.team} logo`}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                                <div>
                                  <div className="font-semibold text-black">{player.name}</div>
                                  <div className="text-sm text-gray-500">{player.team}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-semibold text-black">{player.value}</TableCell>
                            <TableCell className="text-center text-gray-600">{player.average.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Touchdowns */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-stc-red to-stc-gold text-white">
                    <CardTitle className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2" />
                      Touchdowns
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="w-12 text-center font-semibold text-gray-700">Rank</TableHead>
                          <TableHead className="font-semibold text-gray-700">Player</TableHead>
                          <TableHead className="text-center font-semibold text-gray-700">TDs</TableHead>
                          <TableHead className="text-center font-semibold text-gray-700">Avg</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {touchdowns.map((player) => (
                          <TableRow key={player.rank} className="hover:bg-gray-50">
                            <TableCell className="text-center font-semibold text-black">{player.rank}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={player.teamLogo || "/placeholder.svg"}
                                  alt={`${player.team} logo`}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                                <div>
                                  <div className="font-semibold text-black">{player.name}</div>
                                  <div className="text-sm text-gray-500">{player.team}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-semibold text-black">{player.value}</TableCell>
                            <TableCell className="text-center text-gray-600">{player.average.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="teams">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Team Offense */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Total Offense (Yards/Game)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="w-12 text-center font-semibold text-gray-700">Rank</TableHead>
                          <TableHead className="font-semibold text-gray-700">Team</TableHead>
                          <TableHead className="text-center font-semibold text-gray-700">Total</TableHead>
                          <TableHead className="text-center font-semibold text-gray-700">Avg</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamOffense.map((team) => (
                          <TableRow key={team.rank} className="hover:bg-gray-50">
                            <TableCell className="text-center font-semibold text-black">{team.rank}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={team.logo || "/placeholder.svg"}
                                  alt={`${team.team} logo`}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                                <div>
                                  <div className="font-semibold text-black">
                                    {team.city} {team.team}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-semibold text-black">{team.value}</TableCell>
                            <TableCell className="text-center text-gray-600">{team.average.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Team Defense */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Total Defense (Yards Allowed/Game)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="w-12 text-center font-semibold text-gray-700">Rank</TableHead>
                          <TableHead className="font-semibold text-gray-700">Team</TableHead>
                          <TableHead className="text-center font-semibold text-gray-700">Total</TableHead>
                          <TableHead className="text-center font-semibold text-gray-700">Avg</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamDefense.map((team) => (
                          <TableRow key={team.rank} className="hover:bg-gray-50">
                            <TableCell className="text-center font-semibold text-black">{team.rank}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={team.logo || "/placeholder.svg"}
                                  alt={`${team.team} logo`}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                                <div>
                                  <div className="font-semibold text-black">
                                    {team.city} {team.team}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-semibold text-black">{team.value}</TableCell>
                            <TableCell className="text-center text-gray-600">{team.average.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          className="mt-8 text-center text-gray-500 text-sm space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Statistics updated after each completed game</p>
          <p>Player stats include all regular season games played</p>
        </motion.div>
      </div>
    </div>
  )
}
