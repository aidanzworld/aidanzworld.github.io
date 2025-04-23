"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

// Team data
const teams = [
  // AFC Conference
  {
    id: 1,
    name: "Oilers",
    city: "Tennessee",
    conference: "AFC",
    division: "AFC",
    logo: "/images/team-logos/OILERS.png",
    wins: 5,
    losses: 4,
  },
  {
    id: 2,
    name: "Chiefs",
    city: "Kansas City",
    conference: "AFC",
    division: "AFC",
    logo: "/images/team-logos/KAN.png",
    wins: 5,
    losses: 4,
  },
  {
    id: 3,
    name: "Dolphins",
    city: "Miami",
    conference: "AFC",
    division: "AFC",
    logo: "/images/team-logos/MIA.png",
    wins: 4,
    losses: 5,
  },
  {
    id: 4,
    name: "Broncos",
    city: "Denver",
    conference: "AFC",
    division: "AFC",
    logo: "/images/team-logos/DEN.png",
    wins: 2,
    losses: 7,
  },
  {
    id: 5,
    name: "Colts",
    city: "Indianapolis",
    conference: "AFC",
    division: "AFC",
    logo: "/images/team-logos/IND.png",
    wins: 0,
    losses: 9,
  },

  // NFC Conference
  {
    id: 6,
    name: "Bears",
    city: "Chicago",
    conference: "NFC",
    division: "NFC",
    logo: "/images/team-logos/CHI.png",
    wins: 9,
    losses: 0,
  },
  {
    id: 7,
    name: "49ers",
    city: "San Francisco",
    conference: "NFC",
    division: "NFC",
    logo: "/images/team-logos/49ERS.png",
    wins: 7,
    losses: 2,
  },
  {
    id: 8,
    name: "Buccaneers",
    city: "Tampa Bay",
    conference: "NFC",
    division: "NFC",
    logo: "/images/team-logos/TB.png",
    wins: 6,
    losses: 3,
  },
  {
    id: 9,
    name: "Saints",
    city: "New Orleans",
    conference: "NFC",
    division: "NFC",
    logo: "/images/team-logos/NO.png",
    wins: 5,
    losses: 3,
  },
  {
    id: 10,
    name: "Falcons",
    city: "Atlanta",
    conference: "NFC",
    division: "NFC",
    logo: "/images/team-logos/ATL.png",
    wins: 2,
    losses: 6,
  },
]

// Group teams by conference
const groupTeamsByConference = () => {
  const grouped = {
    AFC: teams.filter((team) => team.conference === "AFC").sort((a, b) => b.wins - a.wins || a.losses - b.losses),
    NFC: teams.filter((team) => team.conference === "NFC").sort((a, b) => b.wins - a.wins || a.losses - b.losses),
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
        Teams
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
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#CE1126] text-white">
                  <CardTitle>American Football Conference</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {groupedTeams.AFC.map((team, index) => (
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
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#003B66] text-white">
                  <CardTitle>National Football Conference</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {groupedTeams.NFC.map((team, index) => (
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
