"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

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
    losses: 4,
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

// Helper function to calculate win percentage
const calculateWinPercentage = (wins: number, losses: number) => {
  const total = wins + losses
  if (total === 0) return 0
  return (wins / total).toFixed(3).replace(/^0+/, "")
}

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

  useEffect(() => {
    setIsClient(true)
  }, [])

  const groupedTeams = groupTeamsByConference()
  const afcStandings = groupedTeams.AFC
  const nfcStandings = groupedTeams.NFC

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
        STC SEASON 12 STANDINGS
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AFC Conference */}
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.h2 className="text-2xl font-bold mb-4 text-[#CE1126]" variants={itemVariants}>
            AMERICAN FOOTBALL CONFERENCE
          </motion.h2>
          <motion.div variants={itemVariants}>
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
                {afcStandings.map((team, index) => (
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
          </motion.div>
        </motion.div>

        {/* NFC Conference */}
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.h2 className="text-2xl font-bold mb-4 text-[#003B66]" variants={itemVariants}>
            NATIONAL FOOTBALL CONFERENCE
          </motion.h2>
          <motion.div variants={itemVariants}>
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
                {nfcStandings.map((team, index) => (
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
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
