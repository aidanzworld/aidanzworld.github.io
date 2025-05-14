"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"

// Define the schedule data structure
interface GameMatchup {
  homeTeam: string
  awayTeam: string
  homeTeamLogo: string
  awayTeamLogo: string
}

interface WeekSchedule {
  week: number
  games: GameMatchup[]
}

// Season 13 schedule data
const scheduleData: WeekSchedule[] = [
  {
    week: 1,
    games: [
      {
        awayTeam: "Packers",
        homeTeam: "Bears",
        awayTeamLogo: "/images/team-logos/GB.png",
        homeTeamLogo: "/images/team-logos/CHI.png",
      },
      {
        awayTeam: "Ravens",
        homeTeam: "Browns",
        awayTeamLogo: "/images/team-logos/BAL.png",
        homeTeamLogo: "/images/team-logos/CLE.png",
      },
      {
        awayTeam: "Broncos",
        homeTeam: "Raiders",
        awayTeamLogo: "/images/team-logos/DEN.png",
        homeTeamLogo: "/images/team-logos/LV.png",
      },
      {
        awayTeam: "Texans",
        homeTeam: "Chiefs",
        awayTeamLogo: "/images/team-logos/HOU.png",
        homeTeamLogo: "/images/team-logos/KAN.png",
      },
      {
        awayTeam: "Lions",
        homeTeam: "Buccaneers",
        awayTeamLogo: "/images/team-logos/DET.png",
        homeTeamLogo: "/images/team-logos/TB.png",
      },
      {
        awayTeam: "Panthers",
        homeTeam: "Cardinals",
        awayTeamLogo: "/images/team-logos/CAR.png",
        homeTeamLogo: "/images/team-logos/ARI.png",
      },
    ],
  },
  {
    week: 2,
    games: [
      {
        awayTeam: "Ravens",
        homeTeam: "Raiders",
        awayTeamLogo: "/images/team-logos/BAL.png",
        homeTeamLogo: "/images/team-logos/LV.png",
      },
      {
        awayTeam: "Panthers",
        homeTeam: "Lions",
        awayTeamLogo: "/images/team-logos/CAR.png",
        homeTeamLogo: "/images/team-logos/DET.png",
      },
      {
        awayTeam: "Browns",
        homeTeam: "Texans",
        awayTeamLogo: "/images/team-logos/CLE.png",
        homeTeamLogo: "/images/team-logos/HOU.png",
      },
      {
        awayTeam: "Buccaneers",
        homeTeam: "Packers",
        awayTeamLogo: "/images/team-logos/TB.png",
        homeTeamLogo: "/images/team-logos/GB.png",
      },
      {
        awayTeam: "Chiefs",
        homeTeam: "Broncos",
        awayTeamLogo: "/images/team-logos/KAN.png",
        homeTeamLogo: "/images/team-logos/DEN.png",
      },
      {
        awayTeam: "Bears",
        homeTeam: "Cardinals",
        awayTeamLogo: "/images/team-logos/CHI.png",
        homeTeamLogo: "/images/team-logos/ARI.png",
      },
    ],
  },
  {
    week: 3,
    games: [
      {
        awayTeam: "Cardinals",
        homeTeam: "Broncos",
        awayTeamLogo: "/images/team-logos/ARI.png",
        homeTeamLogo: "/images/team-logos/DEN.png",
      },
      {
        awayTeam: "Ravens",
        homeTeam: "Panthers",
        awayTeamLogo: "/images/team-logos/BAL.png",
        homeTeamLogo: "/images/team-logos/CAR.png",
      },
      {
        awayTeam: "Buccaneers",
        homeTeam: "Browns",
        awayTeamLogo: "/images/team-logos/TB.png",
        homeTeamLogo: "/images/team-logos/CLE.png",
      },
      {
        awayTeam: "Packers",
        homeTeam: "Raiders",
        awayTeamLogo: "/images/team-logos/GB.png",
        homeTeamLogo: "/images/team-logos/LV.png",
      },
      {
        awayTeam: "Lions",
        homeTeam: "Chiefs",
        awayTeamLogo: "/images/team-logos/DET.png",
        homeTeamLogo: "/images/team-logos/KAN.png",
      },
      {
        awayTeam: "Texans",
        homeTeam: "Bears",
        awayTeamLogo: "/images/team-logos/HOU.png",
        homeTeamLogo: "/images/team-logos/CHI.png",
      },
    ],
  },
  {
    week: 4,
    games: [
      {
        awayTeam: "Browns",
        homeTeam: "Lions",
        awayTeamLogo: "/images/team-logos/CLE.png",
        homeTeamLogo: "/images/team-logos/DET.png",
      },
      {
        awayTeam: "Bears",
        homeTeam: "Ravens",
        awayTeamLogo: "/images/team-logos/CHI.png",
        homeTeamLogo: "/images/team-logos/BAL.png",
      },
      {
        awayTeam: "Panthers",
        homeTeam: "Texans",
        awayTeamLogo: "/images/team-logos/CAR.png",
        homeTeamLogo: "/images/team-logos/HOU.png",
      },
      {
        awayTeam: "Broncos",
        homeTeam: "Buccaneers",
        awayTeamLogo: "/images/team-logos/DEN.png",
        homeTeamLogo: "/images/team-logos/TB.png",
      },
      {
        awayTeam: "Raiders",
        homeTeam: "Cardinals",
        awayTeamLogo: "/images/team-logos/LV.png",
        homeTeamLogo: "/images/team-logos/ARI.png",
      },
      {
        awayTeam: "Chiefs",
        homeTeam: "Packers",
        awayTeamLogo: "/images/team-logos/KAN.png",
        homeTeamLogo: "/images/team-logos/GB.png",
      },
    ],
  },
  {
    week: 5,
    games: [
      {
        awayTeam: "Buccaneers",
        homeTeam: "Panthers",
        awayTeamLogo: "/images/team-logos/TB.png",
        homeTeamLogo: "/images/team-logos/CAR.png",
      },
      {
        awayTeam: "Broncos",
        homeTeam: "Bears",
        awayTeamLogo: "/images/team-logos/DEN.png",
        homeTeamLogo: "/images/team-logos/CHI.png",
      },
      {
        awayTeam: "Texans",
        homeTeam: "Lions",
        awayTeamLogo: "/images/team-logos/HOU.png",
        homeTeamLogo: "/images/team-logos/DET.png",
      },
      {
        awayTeam: "Raiders",
        homeTeam: "Browns",
        awayTeamLogo: "/images/team-logos/LV.png",
        homeTeamLogo: "/images/team-logos/CLE.png",
      },
      {
        awayTeam: "Ravens",
        homeTeam: "Chiefs",
        awayTeamLogo: "/images/team-logos/BAL.png",
        homeTeamLogo: "/images/team-logos/KAN.png",
      },
      {
        awayTeam: "Packers",
        homeTeam: "Cardinals",
        awayTeamLogo: "/images/team-logos/GB.png",
        homeTeamLogo: "/images/team-logos/ARI.png",
      },
    ],
  },
  {
    week: 6,
    games: [
      {
        awayTeam: "Raiders",
        homeTeam: "Broncos",
        awayTeamLogo: "/images/team-logos/LV.png",
        homeTeamLogo: "/images/team-logos/DEN.png",
      },
      {
        awayTeam: "Ravens",
        homeTeam: "Cardinals",
        awayTeamLogo: "/images/team-logos/BAL.png",
        homeTeamLogo: "/images/team-logos/ARI.png",
      },
      {
        awayTeam: "Chiefs",
        homeTeam: "Browns",
        awayTeamLogo: "/images/team-logos/KAN.png",
        homeTeamLogo: "/images/team-logos/CLE.png",
      },
      {
        awayTeam: "Panthers",
        homeTeam: "Bears",
        awayTeamLogo: "/images/team-logos/CAR.png",
        homeTeamLogo: "/images/team-logos/CHI.png",
      },
      {
        awayTeam: "Buccaneers",
        homeTeam: "Lions",
        awayTeamLogo: "/images/team-logos/TB.png",
        homeTeamLogo: "/images/team-logos/DET.png",
      },
      {
        awayTeam: "Packers",
        homeTeam: "Texans",
        awayTeamLogo: "/images/team-logos/GB.png",
        homeTeamLogo: "/images/team-logos/HOU.png",
      },
    ],
  },
  {
    week: 7,
    games: [
      {
        awayTeam: "Lions",
        homeTeam: "Packers",
        awayTeamLogo: "/images/team-logos/DET.png",
        homeTeamLogo: "/images/team-logos/GB.png",
      },
      {
        awayTeam: "Broncos",
        homeTeam: "Ravens",
        awayTeamLogo: "/images/team-logos/DEN.png",
        homeTeamLogo: "/images/team-logos/BAL.png",
      },
      {
        awayTeam: "Buccaneers",
        homeTeam: "Texans",
        awayTeamLogo: "/images/team-logos/TB.png",
        homeTeamLogo: "/images/team-logos/HOU.png",
      },
      {
        awayTeam: "Bears",
        homeTeam: "Chiefs",
        awayTeamLogo: "/images/team-logos/CHI.png",
        homeTeamLogo: "/images/team-logos/KAN.png",
      },
      {
        awayTeam: "Raiders",
        homeTeam: "Panthers",
        awayTeamLogo: "/images/team-logos/LV.png",
        homeTeamLogo: "/images/team-logos/CAR.png",
      },
      {
        awayTeam: "Cardinals",
        homeTeam: "Browns",
        awayTeamLogo: "/images/team-logos/ARI.png",
        homeTeamLogo: "/images/team-logos/CLE.png",
      },
    ],
  },
  {
    week: 8,
    games: [
      {
        awayTeam: "Texans",
        homeTeam: "Broncos",
        awayTeamLogo: "/images/team-logos/HOU.png",
        homeTeamLogo: "/images/team-logos/DEN.png",
      },
      {
        awayTeam: "Cardinals",
        homeTeam: "Lions",
        awayTeamLogo: "/images/team-logos/ARI.png",
        homeTeamLogo: "/images/team-logos/DET.png",
      },
      {
        awayTeam: "Chiefs",
        homeTeam: "Buccaneers",
        awayTeamLogo: "/images/team-logos/KAN.png",
        homeTeamLogo: "/images/team-logos/TB.png",
      },
      {
        awayTeam: "Browns",
        homeTeam: "Panthers",
        awayTeamLogo: "/images/team-logos/CLE.png",
        homeTeamLogo: "/images/team-logos/CAR.png",
      },
      {
        awayTeam: "Raiders",
        homeTeam: "Bears",
        awayTeamLogo: "/images/team-logos/LV.png",
        homeTeamLogo: "/images/team-logos/CHI.png",
      },
      {
        awayTeam: "Packers",
        homeTeam: "Ravens",
        awayTeamLogo: "/images/team-logos/GB.png",
        homeTeamLogo: "/images/team-logos/BAL.png",
      },
    ],
  },
  {
    week: 9,
    games: [
      {
        awayTeam: "Broncos",
        homeTeam: "Browns",
        awayTeamLogo: "/images/team-logos/DEN.png",
        homeTeamLogo: "/images/team-logos/CLE.png",
      },
      {
        awayTeam: "Panthers",
        homeTeam: "Packers",
        awayTeamLogo: "/images/team-logos/CAR.png",
        homeTeamLogo: "/images/team-logos/GB.png",
      },
      {
        awayTeam: "Bears",
        homeTeam: "Lions",
        awayTeamLogo: "/images/team-logos/CHI.png",
        homeTeamLogo: "/images/team-logos/DET.png",
      },
      {
        awayTeam: "Buccaneers",
        homeTeam: "Raiders",
        awayTeamLogo: "/images/team-logos/TB.png",
        homeTeamLogo: "/images/team-logos/LV.png",
      },
      {
        awayTeam: "Ravens",
        homeTeam: "Texans",
        awayTeamLogo: "/images/team-logos/BAL.png",
        homeTeamLogo: "/images/team-logos/HOU.png",
      },
      {
        awayTeam: "Chiefs",
        homeTeam: "Cardinals",
        awayTeamLogo: "/images/team-logos/KAN.png",
        homeTeamLogo: "/images/team-logos/ARI.png",
      },
    ],
  },
  {
    week: 10,
    games: [
      {
        awayTeam: "Buccaneers",
        homeTeam: "Panthers",
        awayTeamLogo: "/images/team-logos/TB.png",
        homeTeamLogo: "/images/team-logos/CAR.png",
      },
      {
        awayTeam: "Browns",
        homeTeam: "Ravens",
        awayTeamLogo: "/images/team-logos/CLE.png",
        homeTeamLogo: "/images/team-logos/BAL.png",
      },
      {
        awayTeam: "Texans",
        homeTeam: "Chiefs",
        awayTeamLogo: "/images/team-logos/HOU.png",
        homeTeamLogo: "/images/team-logos/KAN.png",
      },
      {
        awayTeam: "Raiders",
        homeTeam: "Broncos",
        awayTeamLogo: "/images/team-logos/LV.png",
        homeTeamLogo: "/images/team-logos/DEN.png",
      },
      {
        awayTeam: "Cardinals",
        homeTeam: "Lions",
        awayTeamLogo: "/images/team-logos/ARI.png",
        homeTeamLogo: "/images/team-logos/DET.png",
      },
      {
        awayTeam: "Bears",
        homeTeam: "Packers",
        awayTeamLogo: "/images/team-logos/CHI.png",
        homeTeamLogo: "/images/team-logos/GB.png",
      },
    ],
  },
]

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

export default function ScheduleClientPage() {
  const [isClient, setIsClient] = useState(false)
  const [activeWeek, setActiveWeek] = useState("1")

  useEffect(() => {
    setIsClient(true)
  }, [])

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
        STC Season 13 Schedule
      </motion.h1>

      {/* Schedule Release Graphic */}
      <motion.div
        className="flex justify-center mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/images/schedule-release.png"
          alt="Season 13 Schedule Release"
          width={600}
          height={300}
          className="max-w-full h-auto"
          priority
        />
      </motion.div>

      {/* Schedule Introduction */}
      <motion.div
        className="mb-10 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p className="text-lg mb-4">
          The Sports Talk Club is proud to present the official Season 13 schedule. This season features 10
          action-packed weeks of football with exciting matchups across the league.
        </p>
        <p className="text-md text-gray-600">
          All game times and broadcast information will be announced at a later date. Stay tuned for updates!
        </p>
      </motion.div>

      <Tabs defaultValue="1" className="w-full" onValueChange={(value) => setActiveWeek(value)}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <TabsList className="flex flex-wrap justify-center gap-2 mb-4">
            {scheduleData.map((week) => (
              <TabsTrigger key={week.week} value={week.week.toString()} className="px-4 py-2">
                Week {week.week}
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>

        {scheduleData.map((week) => (
          <TabsContent key={week.week} value={week.week.toString()}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="bg-[#CE1126] text-white">
                  <CardTitle className="text-center">Week {week.week} Matchups</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {week.games.map((game, index) => (
                      <motion.div key={index} variants={itemVariants} custom={index}>
                        <div className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50">
                          <div className="flex items-center flex-1 justify-end pr-4">
                            <Link
                              href={`/teams/${game.awayTeam.toLowerCase()}`}
                              className="flex items-center hover:underline"
                            >
                              <span className="font-medium mr-3 text-right">{game.awayTeam}</span>
                              <div className="w-10 h-10 relative">
                                <Image
                                  src={game.awayTeamLogo || "/placeholder.svg"}
                                  alt={`${game.awayTeam} logo`}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </Link>
                          </div>

                          <div className="flex flex-col items-center px-4">
                            <span className="font-bold text-lg">@</span>
                          </div>

                          <div className="flex items-center flex-1 pl-4">
                            <Link
                              href={`/teams/${game.homeTeam.toLowerCase()}`}
                              className="flex items-center hover:underline"
                            >
                              <div className="w-10 h-10 relative">
                                <Image
                                  src={game.homeTeamLogo || "/placeholder.svg"}
                                  alt={`${game.homeTeam} logo`}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span className="font-medium ml-3">{game.homeTeam}</span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Game times and broadcast information will be announced at a later date.</p>
      </div>
    </div>
  )
}
