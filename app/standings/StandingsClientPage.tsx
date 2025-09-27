"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface TeamStanding {
  rank: number
  team: string
  city: string
  logo: string
  conference: string
  division: string
  wins: number
  losses: number
  winPercentage: number
  pointsFor: number
  pointsAgainst: number
  pointsDiff: number
  streak: string
  lastWeek?: number
}

const standings: TeamStanding[] = [
  {
    rank: 1,
    team: "Ravens",
    city: "Baltimore",
    logo: "/images/team-logos/BAL.png",
    conference: "AFC",
    division: "North",
    wins: 2,
    losses: 0,
    winPercentage: 1.0,
    pointsFor: 63,
    pointsAgainst: 38,
    pointsDiff: 25,
    streak: "W2",
    lastWeek: 3,
  },
  {
    rank: 2,
    team: "Chiefs",
    city: "Kansas City",
    logo: "/images/team-logos/KAN.png",
    conference: "AFC",
    division: "West",
    wins: 2,
    losses: 0,
    winPercentage: 1.0,
    pointsFor: 59,
    pointsAgainst: 42,
    pointsDiff: 17,
    streak: "W2",
    lastWeek: 1,
  },
  {
    rank: 3,
    team: "Jets",
    city: "New York",
    logo: "/images/team-logos/NYJ.png",
    conference: "AFC",
    division: "East",
    wins: 2,
    losses: 0,
    winPercentage: 1.0,
    pointsFor: 41,
    pointsAgainst: 30,
    pointsDiff: 11,
    streak: "W2",
    lastWeek: 5,
  },
  {
    rank: 4,
    team: "49ers",
    city: "San Francisco",
    logo: "/images/team-logos/49ERS.png",
    conference: "NFC",
    division: "West",
    wins: 1,
    losses: 1,
    winPercentage: 0.5,
    pointsFor: 55,
    pointsAgainst: 51,
    pointsDiff: 4,
    streak: "L1",
    lastWeek: 2,
  },
  {
    rank: 5,
    team: "Dolphins",
    city: "Miami",
    logo: "/images/team-logos/MIA.png",
    conference: "AFC",
    division: "East",
    wins: 1,
    losses: 1,
    winPercentage: 0.5,
    pointsFor: 44,
    pointsAgainst: 45,
    pointsDiff: -1,
    streak: "W1",
    lastWeek: 7,
  },
  {
    rank: 6,
    team: "Jaguars",
    city: "Jacksonville",
    logo: "/images/team-logos/JAX.png",
    conference: "AFC",
    division: "South",
    wins: 1,
    losses: 1,
    winPercentage: 0.5,
    pointsFor: 38,
    pointsAgainst: 38,
    pointsDiff: 0,
    streak: "W1",
    lastWeek: 8,
  },
  {
    rank: 7,
    team: "Buccaneers",
    city: "Tampa Bay",
    logo: "/images/team-logos/TB.png",
    conference: "NFC",
    division: "South",
    wins: 0,
    losses: 1,
    winPercentage: 0.0,
    pointsFor: 10,
    pointsAgainst: 35,
    pointsDiff: -25,
    streak: "L1",
    lastWeek: 4,
  },
  {
    rank: 8,
    team: "Panthers",
    city: "Carolina",
    logo: "/images/team-logos/CAR.png",
    conference: "NFC",
    division: "South",
    wins: 0,
    losses: 1,
    winPercentage: 0.0,
    pointsFor: 13,
    pointsAgainst: 20,
    pointsDiff: -7,
    streak: "L1",
    lastWeek: 6,
  },
  {
    rank: 9,
    team: "Rams",
    city: "Los Angeles",
    logo: "/images/team-logos/LAR.png",
    conference: "NFC",
    division: "West",
    wins: 0,
    losses: 2,
    winPercentage: 0.0,
    pointsFor: 41,
    pointsAgainst: 52,
    pointsDiff: -11,
    streak: "L2",
    lastWeek: 9,
  },
  {
    rank: 10,
    team: "Bears",
    city: "Chicago",
    logo: "/images/team-logos/CHI.png",
    conference: "NFC",
    division: "North",
    wins: 0,
    losses: 2,
    winPercentage: 0.0,
    pointsFor: 38,
    pointsAgainst: 59,
    pointsDiff: -21,
    streak: "L2",
    lastWeek: 10,
  },
]

export default function StandingsClientPage() {
  const [isClient, setIsClient] = useState(false)
  const [selectedView, setSelectedView] = useState<string>("overall")

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getRankChange = (currentRank: number, lastWeek?: number) => {
    if (!lastWeek) return null
    const change = lastWeek - currentRank
    if (change > 0) return { type: "up", value: change }
    if (change < 0) return { type: "down", value: Math.abs(change) }
    return { type: "same", value: 0 }
  }

  const getStreakColor = (streak: string) => {
    if (streak.startsWith("W")) return "bg-green-100 text-green-800"
    if (streak.startsWith("L")) return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  const filteredStandings =
    selectedView === "overall" ? standings : standings.filter((team) => team.conference === selectedView)

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
            Season 14 Standings
          </h1>
          <p className="text-lg text-gray-600 mb-6">Current team rankings and statistics</p>

          {/* View Filter */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              onClick={() => setSelectedView("overall")}
              variant={selectedView === "overall" ? "default" : "outline"}
              className={
                selectedView === "overall" ? "bg-stc-red text-white" : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              Overall
            </Button>
            <Button
              onClick={() => setSelectedView("AFC")}
              variant={selectedView === "AFC" ? "default" : "outline"}
              className={
                selectedView === "AFC" ? "bg-stc-red text-white" : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              AFC
            </Button>
            <Button
              onClick={() => setSelectedView("NFC")}
              variant={selectedView === "NFC" ? "default" : "outline"}
              className={
                selectedView === "NFC" ? "bg-stc-red text-white" : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              NFC
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-stc-red to-stc-gold text-white">
              <CardTitle className="text-center text-2xl flex items-center justify-center">
                <Trophy className="w-6 h-6 mr-2" />
                {selectedView === "overall" ? "League Standings" : `${selectedView} Conference`}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-12 text-center font-semibold text-gray-700">Rank</TableHead>
                      <TableHead className="font-semibold text-gray-700">Team</TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">W</TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">L</TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">PCT</TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">PF</TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">PA</TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">DIFF</TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">STRK</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStandings.map((team, index) => {
                      const rankChange = getRankChange(team.rank, team.lastWeek)
                      return (
                        <TableRow
                          key={team.team}
                          className="hover:bg-gray-50 transition-colors border-b border-gray-200"
                        >
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <span className="font-semibold text-black">{team.rank}</span>
                              {rankChange && (
                                <div className="flex items-center">
                                  {rankChange.type === "up" && <TrendingUp className="w-3 h-3 text-green-600" />}
                                  {rankChange.type === "down" && <TrendingDown className="w-3 h-3 text-red-600" />}
                                  {rankChange.type === "same" && <Minus className="w-3 h-3 text-gray-400" />}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 relative">
                                <Image
                                  src={team.logo || "/placeholder.svg"}
                                  alt={`${team.team} logo`}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <div>
                                <div className="font-semibold text-black">
                                  {team.city} {team.team}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {team.conference} {team.division}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-black">{team.wins}</TableCell>
                          <TableCell className="text-center font-semibold text-black">{team.losses}</TableCell>
                          <TableCell className="text-center font-medium text-black">
                            {team.winPercentage.toFixed(3)}
                          </TableCell>
                          <TableCell className="text-center text-black">{team.pointsFor}</TableCell>
                          <TableCell className="text-center text-black">{team.pointsAgainst}</TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`font-medium ${
                                team.pointsDiff > 0
                                  ? "text-green-600"
                                  : team.pointsDiff < 0
                                    ? "text-red-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {team.pointsDiff > 0 ? "+" : ""}
                              {team.pointsDiff}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={getStreakColor(team.streak)}>{team.streak}</Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Playoff Picture */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-800 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Playoff Picture
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-600 mb-3">Current playoff teams:</div>
                {standings.slice(0, 6).map((team, index) => (
                  <div key={team.team} className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-green-800">#{index + 1}</span>
                      <Image
                        src={team.logo || "/placeholder.svg"}
                        alt={`${team.team} logo`}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                      <span className="text-sm font-medium text-black">
                        {team.city} {team.team}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {team.wins}-{team.losses}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-red-800">Key Stats</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Highest Scoring</div>
                  <div className="flex items-center space-x-2">
                    <Image src={standings[0].logo || "/placeholder.svg"} alt="logo" width={20} height={20} />
                    <span className="font-medium text-black">
                      {standings[0].city} {standings[0].team} ({standings[0].pointsFor} pts)
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Best Defense</div>
                  <div className="flex items-center space-x-2">
                    <Image
                      src={
                        standings.find((t) => t.pointsAgainst === Math.min(...standings.map((s) => s.pointsAgainst)))
                          ?.logo || "/placeholder.svg"
                      }
                      alt="logo"
                      width={20}
                      height={20}
                    />
                    <span className="font-medium text-black">Tampa Bay Buccaneers (10 pts allowed)</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Longest Win Streak</div>
                  <div className="flex items-center space-x-2">
                    <Image src={standings[0].logo || "/placeholder.svg"} alt="logo" width={20} height={20} />
                    <span className="font-medium text-black">Multiple teams (2 games)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>Standings updated after each completed game</p>
          <p>Playoff seeding determined by record, then point differential</p>
        </motion.div>
      </div>
    </div>
  )
}
