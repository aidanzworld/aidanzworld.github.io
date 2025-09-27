"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Trophy, Users, Star, TrendingUp } from "lucide-react"

// Team data for Season 14 - Updated to 10 teams
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
    colors: { primary: "from-orange-600 to-blue-600", secondary: "bg-orange-100" },
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
    colors: { primary: "from-gray-800 to-gray-900", secondary: "bg-gray-100" },
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
    colors: { primary: "from-red-600 to-yellow-500", secondary: "bg-red-100" },
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
    colors: { primary: "from-blue-800 to-red-600", secondary: "bg-blue-100" },
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
    colors: { primary: "from-purple-800 to-black", secondary: "bg-purple-100" },
  },

  // NFC Conference
  // NFC Central
  {
    id: 6,
    name: "Cardinals",
    city: "Arizona",
    conference: "NFC",
    division: "Central",
    logo: "/images/team-logos/ARI.png",
    wins: 0,
    losses: 0,
    colors: { primary: "from-red-700 to-red-900", secondary: "bg-red-100" },
  },
  {
    id: 7,
    name: "Lions",
    city: "Detroit",
    conference: "NFC",
    division: "Central",
    logo: "/images/team-logos/DET.png",
    wins: 0,
    losses: 0,
    colors: { primary: "from-blue-600 to-gray-600", secondary: "bg-blue-100" },
  },
  // NFC North
  {
    id: 8,
    name: "Packers",
    city: "Green Bay",
    conference: "NFC",
    division: "North",
    logo: "/images/team-logos/GB.png",
    wins: 0,
    losses: 0,
    colors: { primary: "from-green-600 to-yellow-500", secondary: "bg-green-100" },
  },
  {
    id: 9,
    name: "Bears",
    city: "Chicago",
    conference: "NFC",
    division: "North",
    logo: "/images/team-logos/CHI.png",
    wins: 0,
    losses: 0,
    colors: { primary: "from-blue-800 to-orange-600", secondary: "bg-blue-100" },
  },
  // NFC East
  {
    id: 10,
    name: "Panthers",
    city: "Carolina",
    conference: "NFC",
    division: "East",
    logo: "/images/team-logos/CAR.png",
    wins: 0,
    losses: 0,
    colors: { primary: "from-cyan-500 to-black", secondary: "bg-cyan-100" },
  },
]

// Group teams by conference and division
const groupTeamsByConference = () => {
  const grouped = {
    AFC: {
      West: teams.filter((team) => team.conference === "AFC" && team.division === "West"),
      Central: teams.filter((team) => team.conference === "AFC" && team.division === "Central"),
      North: teams.filter((team) => team.conference === "AFC" && team.division === "North"),
    },
    NFC: {
      Central: teams.filter((team) => team.conference === "NFC" && team.division === "Central"),
      North: teams.filter((team) => team.conference === "NFC" && team.division === "North"),
      East: teams.filter((team) => team.conference === "NFC" && team.division === "East"),
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
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
}

// Create a TeamLogo component to handle logo display
function TeamLogo({ team }: { team: (typeof teams)[0] }) {
  return (
    <div
      className={`w-16 h-16 relative mr-4 bg-gradient-to-br ${team.colors.primary} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}
    >
      <span className="font-bold text-white text-xl">{team.name.charAt(0)}</span>
    </div>
  )
}

export default function TeamsClientPage() {
  const [activeTab, setActiveTab] = useState("AFC")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const groupedTeams = groupTeamsByConference()

  if (!isClient) {
    return null // Prevent SSR flash
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Season 14 Teams
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet the 10 elite teams competing for championship glory in Season 14
          </p>
        </motion.div>

        <Tabs defaultValue="AFC" className="w-full" onValueChange={(value) => setActiveTab(value)}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-800 border border-slate-700">
              <TabsTrigger
                value="AFC"
                className="text-lg py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:text-white"
              >
                <Trophy className="w-5 h-5 mr-2" />
                AFC Conference
              </TabsTrigger>
              <TabsTrigger
                value="NFC"
                className="text-lg py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white"
              >
                <Star className="w-5 h-5 mr-2" />
                NFC Conference
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* AFC Conference */}
            <TabsContent value="AFC" key="afc-content">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* AFC West */}
                <Card className="overflow-hidden bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <CardTitle className="flex items-center text-2xl">
                      <TrendingUp className="w-6 h-6 mr-3" />
                      AFC West Division
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                      {groupedTeams.AFC.West.map((team, index) => (
                        <motion.div key={team.id} variants={itemVariants} custom={index}>
                          <div className="flex items-center p-6 border-b border-slate-700 last:border-b-0 hover:bg-slate-700/30 transition-all duration-200 group">
                            <TeamLogo team={team} />
                            <div className="flex-1">
                              <h3 className="font-bold text-2xl text-white mb-1">
                                {team.city} {team.name}
                              </h3>
                              <div className="flex items-center space-x-4">
                                <Badge variant="outline" className="text-gray-400 border-gray-600">
                                  {team.wins}-{team.losses}
                                </Badge>
                                <span className="text-gray-400 text-sm">AFC West</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-gray-400 text-sm">Season 14</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>

                {/* AFC Central */}
                <Card className="overflow-hidden bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <CardTitle className="flex items-center text-2xl">
                      <Users className="w-6 h-6 mr-3" />
                      AFC Central Division
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                      {groupedTeams.AFC.Central.map((team, index) => (
                        <motion.div key={team.id} variants={itemVariants} custom={index}>
                          <div className="flex items-center p-6 border-b border-slate-700 last:border-b-0 hover:bg-slate-700/30 transition-all duration-200 group">
                            <TeamLogo team={team} />
                            <div className="flex-1">
                              <h3 className="font-bold text-2xl text-white mb-1">
                                {team.city} {team.name}
                              </h3>
                              <div className="flex items-center space-x-4">
                                <Badge variant="outline" className="text-gray-400 border-gray-600">
                                  {team.wins}-{team.losses}
                                </Badge>
                                <span className="text-gray-400 text-sm">AFC Central</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-gray-400 text-sm">Season 14</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>

                {/* AFC North */}
                <Card className="overflow-hidden bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <CardTitle className="flex items-center text-2xl">
                      <Trophy className="w-6 h-6 mr-3" />
                      AFC North Division
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                      {groupedTeams.AFC.North.map((team, index) => (
                        <motion.div key={team.id} variants={itemVariants} custom={index}>
                          <div className="flex items-center p-6 border-b border-slate-700 last:border-b-0 hover:bg-slate-700/30 transition-all duration-200 group">
                            <TeamLogo team={team} />
                            <div className="flex-1">
                              <h3 className="font-bold text-2xl text-white mb-1">
                                {team.city} {team.name}
                              </h3>
                              <div className="flex items-center space-x-4">
                                <Badge variant="outline" className="text-gray-400 border-gray-600">
                                  {team.wins}-{team.losses}
                                </Badge>
                                <span className="text-gray-400 text-sm">AFC North</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-gray-400 text-sm">Season 14</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* NFC Conference */}
            <TabsContent value="NFC" key="nfc-content">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* NFC Central */}
                <Card className="overflow-hidden bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <CardTitle className="flex items-center text-2xl">
                      <Star className="w-6 h-6 mr-3" />
                      NFC Central Division
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                      {groupedTeams.NFC.Central.map((team, index) => (
                        <motion.div key={team.id} variants={itemVariants} custom={index}>
                          <div className="flex items-center p-6 border-b border-slate-700 last:border-b-0 hover:bg-slate-700/30 transition-all duration-200 group">
                            <TeamLogo team={team} />
                            <div className="flex-1">
                              <h3 className="font-bold text-2xl text-white mb-1">
                                {team.city} {team.name}
                              </h3>
                              <div className="flex items-center space-x-4">
                                <Badge variant="outline" className="text-gray-400 border-gray-600">
                                  {team.wins}-{team.losses}
                                </Badge>
                                <span className="text-gray-400 text-sm">NFC Central</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-gray-400 text-sm">Season 14</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>

                {/* NFC North */}
                <Card className="overflow-hidden bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <CardTitle className="flex items-center text-2xl">
                      <TrendingUp className="w-6 h-6 mr-3" />
                      NFC North Division
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                      {groupedTeams.NFC.North.map((team, index) => (
                        <motion.div key={team.id} variants={itemVariants} custom={index}>
                          <div className="flex items-center p-6 border-b border-slate-700 last:border-b-0 hover:bg-slate-700/30 transition-all duration-200 group">
                            <TeamLogo team={team} />
                            <div className="flex-1">
                              <h3 className="font-bold text-2xl text-white mb-1">
                                {team.city} {team.name}
                              </h3>
                              <div className="flex items-center space-x-4">
                                <Badge variant="outline" className="text-gray-400 border-gray-600">
                                  {team.wins}-{team.losses}
                                </Badge>
                                <span className="text-gray-400 text-sm">NFC North</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-gray-400 text-sm">Season 14</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>

                {/* NFC East */}
                <Card className="overflow-hidden bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <CardTitle className="flex items-center text-2xl">
                      <Users className="w-6 h-6 mr-3" />
                      NFC East Division
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                      {groupedTeams.NFC.East.map((team, index) => (
                        <motion.div key={team.id} variants={itemVariants} custom={index}>
                          <div className="flex items-center p-6 border-b border-slate-700 last:border-b-0 hover:bg-slate-700/30 transition-all duration-200 group">
                            <TeamLogo team={team} />
                            <div className="flex-1">
                              <h3 className="font-bold text-2xl text-white mb-1">
                                {team.city} {team.name}
                              </h3>
                              <div className="flex items-center space-x-4">
                                <Badge variant="outline" className="text-gray-400 border-gray-600">
                                  {team.wins}-{team.losses}
                                </Badge>
                                <span className="text-gray-400 text-sm">NFC East</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-gray-400 text-sm">Season 14</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  )
}
