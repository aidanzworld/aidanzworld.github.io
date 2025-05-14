"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

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
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        STC Season 13 Teams
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
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#CE1126] text-white">
                  <CardTitle>AFC West Division</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {groupedTeams.AFC.West.map((team, index) => (
                      <motion.div key={team.id} variants={itemVariants} custom={index}>
                        <div className="flex items-center p-4 border-b last:border-b-0">
                          <div className="w-12 h-12 relative mr-4">
                            <Image
                              src={team.logo || "/placeholder.svg"}
                              alt={`${team.city} ${team.name} logo`}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">
                              {team.city} {team.name}
                            </h3>
                            <p className="text-gray-600">
                              {team.wins}-{team.losses}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>

              {/* AFC Central */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#CE1126] text-white">
                  <CardTitle>AFC Central Division</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {groupedTeams.AFC.Central.map((team, index) => (
                      <motion.div key={team.id} variants={itemVariants} custom={index}>
                        <div className="flex items-center p-4 border-b last:border-b-0">
                          <div className="w-12 h-12 relative mr-4">
                            <Image
                              src={team.logo || "/placeholder.svg"}
                              alt={`${team.city} ${team.name} logo`}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">
                              {team.city} {team.name}
                            </h3>
                            <p className="text-gray-600">
                              {team.wins}-{team.losses}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>

              {/* AFC North */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#CE1126] text-white">
                  <CardTitle>AFC North Division</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {groupedTeams.AFC.North.map((team, index) => (
                      <motion.div key={team.id} variants={itemVariants} custom={index}>
                        <div className="flex items-center p-4 border-b last:border-b-0">
                          <div className="w-12 h-12 relative mr-4">
                            <Image
                              src={team.logo || "/placeholder.svg"}
                              alt={`${team.city} ${team.name} logo`}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">
                              {team.city} {team.name}
                            </h3>
                            <p className="text-gray-600">
                              {team.wins}-{team.losses}
                            </p>
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
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#003B66] text-white">
                  <CardTitle>NFC Central Division</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {groupedTeams.NFC.Central.map((team, index) => (
                      <motion.div key={team.id} variants={itemVariants} custom={index}>
                        <div className="flex items-center p-4 border-b last:border-b-0">
                          <div className="w-12 h-12 relative mr-4">
                            <Image
                              src={team.logo || "/placeholder.svg"}
                              alt={`${team.city} ${team.name} logo`}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">
                              {team.city} {team.name}
                            </h3>
                            <p className="text-gray-600">
                              {team.wins}-{team.losses}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>

              {/* NFC North */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#003B66] text-white">
                  <CardTitle>NFC North Division</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {groupedTeams.NFC.North.map((team, index) => (
                      <motion.div key={team.id} variants={itemVariants} custom={index}>
                        <div className="flex items-center p-4 border-b last:border-b-0">
                          <div className="w-12 h-12 relative mr-4">
                            <Image
                              src={team.logo || "/placeholder.svg"}
                              alt={`${team.city} ${team.name} logo`}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">
                              {team.city} {team.name}
                            </h3>
                            <p className="text-gray-600">
                              {team.wins}-{team.losses}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>

              {/* NFC East */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#003B66] text-white">
                  <CardTitle>NFC East Division</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {groupedTeams.NFC.East.map((team, index) => (
                      <motion.div key={team.id} variants={itemVariants} custom={index}>
                        <div className="flex items-center p-4 border-b last:border-b-0">
                          <div className="w-12 h-12 relative mr-4">
                            <Image
                              src={team.logo || "/placeholder.svg"}
                              alt={`${team.city} ${team.name} logo`}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">
                              {team.city} {team.name}
                            </h3>
                            <p className="text-gray-600">
                              {team.wins}-{team.losses}
                            </p>
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
  )
}
