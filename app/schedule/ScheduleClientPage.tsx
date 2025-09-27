"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Tv } from "lucide-react"

// Define the schedule data structure
interface GameMatchup {
  id: string
  homeTeam: string
  awayTeam: string
  homeTeamLogo: string
  awayTeamLogo: string
  date: string
  time: string
  day: string
  network?: string
  homeScore?: number
  awayScore?: number
  status: "scheduled" | "in-progress" | "final"
}

interface WeekSchedule {
  week: number
  dateRange: string
  games: GameMatchup[]
}

// Team logo mapping
const teamLogos: { [key: string]: string } = {
  Ravens: "/images/team-logos/BAL.png",
  Chiefs: "/images/team-logos/KAN.png",
  Jets: "/images/team-logos/NYJ.png",
  Dolphins: "/images/team-logos/MIA.png",
  Jaguars: "/images/team-logos/JAX.png",
  "49ers": "/images/team-logos/49ERS.png",
  Rams: "/images/team-logos/LAR.png",
  Bears: "/images/team-logos/CHI.png",
  Buccaneers: "/images/team-logos/TB.png",
  Panthers: "/images/team-logos/CAR.png",
}

// S14 STC Regular Season Schedule with scores
const initialScheduleData: WeekSchedule[] = [
  {
    week: 1,
    dateRange: "September 18–20",
    games: [
      {
        id: "w1-g1",
        awayTeam: "Bears",
        homeTeam: "Chiefs",
        awayTeamLogo: teamLogos["Bears"],
        homeTeamLogo: teamLogos["Chiefs"],
        date: "Thu, Sep 18",
        time: "8:20 PM ET",
        day: "Thursday",
        status: "final",
        awayScore: 14,
        homeScore: 28,
      },
      {
        id: "w1-g2",
        awayTeam: "Jaguars",
        homeTeam: "Dolphins",
        awayTeamLogo: teamLogos["Jaguars"],
        homeTeamLogo: teamLogos["Dolphins"],
        date: "Fri, Sep 19",
        time: "9:00 PM ET",
        day: "Friday",
        status: "final",
        awayScore: 21,
        homeScore: 17,
      },
      {
        id: "w1-g3",
        awayTeam: "Rams",
        homeTeam: "49ers",
        awayTeamLogo: teamLogos["Rams"],
        homeTeamLogo: teamLogos["49ers"],
        date: "Fri, Sep 19",
        time: "10:30 PM ET",
        day: "Friday",
        status: "final",
        awayScore: 24,
        homeScore: 31,
      },
      {
        id: "w1-g4",
        awayTeam: "Jets",
        homeTeam: "Panthers",
        awayTeamLogo: teamLogos["Jets"],
        homeTeamLogo: teamLogos["Panthers"],
        date: "Sat, Sep 20",
        time: "1:00 PM ET",
        day: "Saturday",
        status: "final",
        awayScore: 20,
        homeScore: 13,
      },
      {
        id: "w1-g5",
        awayTeam: "Ravens",
        homeTeam: "Buccaneers",
        awayTeamLogo: teamLogos["Ravens"],
        homeTeamLogo: teamLogos["Buccaneers"],
        date: "Sat, Sep 20",
        time: "9:45 PM ET",
        day: "Saturday",
        status: "final",
        awayScore: 35,
        homeScore: 10,
      },
    ],
  },
  {
    week: 2,
    dateRange: "September 21–29",
    games: [
      {
        id: "w2-g1",
        awayTeam: "Dolphins",
        homeTeam: "49ers",
        awayTeamLogo: teamLogos["Dolphins"],
        homeTeamLogo: teamLogos["49ers"],
        date: "Sun, Sep 21",
        time: "7:30 PM ET",
        day: "Sunday",
        status: "final",
        awayScore: 27,
        homeScore: 24,
      },
      {
        id: "w2-g2",
        awayTeam: "Rams",
        homeTeam: "Jets",
        awayTeamLogo: teamLogos["Rams"],
        homeTeamLogo: teamLogos["Jets"],
        date: "Tue, Sep 23",
        time: "9:45 PM ET",
        day: "Tuesday",
        status: "final",
        awayScore: 17,
        homeScore: 21,
      },
      {
        id: "w2-g3",
        awayTeam: "Chiefs",
        homeTeam: "Ravens",
        awayTeamLogo: teamLogos["Chiefs"],
        homeTeamLogo: teamLogos["Ravens"],
        date: "Wed, Sep 24",
        time: "8:15 PM ET",
        day: "Wednesday",
        status: "final",
        awayScore: 31,
        homeScore: 28,
      },
      {
        id: "w2-g4",
        awayTeam: "Jaguars",
        homeTeam: "Bears",
        awayTeamLogo: teamLogos["Jaguars"],
        homeTeamLogo: teamLogos["Bears"],
        date: "Fri, Sep 26",
        time: "8:15 PM ET",
        day: "Friday",
        status: "scheduled",
      },
      {
        id: "w2-g5",
        awayTeam: "Panthers",
        homeTeam: "Buccaneers",
        awayTeamLogo: teamLogos["Panthers"],
        homeTeamLogo: teamLogos["Buccaneers"],
        date: "Mon, Sep 29",
        time: "8:30 PM ET",
        day: "Monday",
        status: "scheduled",
      },
    ],
  },
  {
    week: 3,
    dateRange: "October 1–6",
    games: [
      {
        id: "w3-g1",
        awayTeam: "Bears",
        homeTeam: "Dolphins",
        awayTeamLogo: teamLogos["Bears"],
        homeTeamLogo: teamLogos["Dolphins"],
        date: "Wed, Oct 1",
        time: "8:15 PM ET",
        day: "Wednesday",
        status: "scheduled",
      },
      {
        id: "w3-g2",
        awayTeam: "Rams",
        homeTeam: "Jaguars",
        awayTeamLogo: teamLogos["Rams"],
        homeTeamLogo: teamLogos["Jaguars"],
        date: "Thu, Oct 2",
        time: "8:15 PM ET",
        day: "Thursday",
        status: "scheduled",
      },
      {
        id: "w3-g3",
        awayTeam: "49ers",
        homeTeam: "Panthers",
        awayTeamLogo: teamLogos["49ers"],
        homeTeamLogo: teamLogos["Panthers"],
        date: "Sat, Oct 4",
        time: "1:00 PM ET",
        day: "Saturday",
        status: "scheduled",
      },
      {
        id: "w3-g4",
        awayTeam: "Ravens",
        homeTeam: "Jets",
        awayTeamLogo: teamLogos["Ravens"],
        homeTeamLogo: teamLogos["Jets"],
        date: "Sun, Oct 5",
        time: "8:20 PM ET",
        day: "Sunday",
        status: "scheduled",
      },
      {
        id: "w3-g5",
        awayTeam: "Buccaneers",
        homeTeam: "Chiefs",
        awayTeamLogo: teamLogos["Buccaneers"],
        homeTeamLogo: teamLogos["Chiefs"],
        date: "Mon, Oct 6",
        time: "8:15 PM ET",
        day: "Monday",
        status: "scheduled",
      },
    ],
  },
  {
    week: 4,
    dateRange: "October 8–13",
    games: [
      {
        id: "w4-g1",
        awayTeam: "Dolphins",
        homeTeam: "Rams",
        awayTeamLogo: teamLogos["Dolphins"],
        homeTeamLogo: teamLogos["Rams"],
        date: "Wed, Oct 8",
        time: "8:15 PM ET",
        day: "Wednesday",
        status: "scheduled",
      },
      {
        id: "w4-g2",
        awayTeam: "Jaguars",
        homeTeam: "Ravens",
        awayTeamLogo: teamLogos["Jaguars"],
        homeTeamLogo: teamLogos["Ravens"],
        date: "Thu, Oct 9",
        time: "8:30 PM ET",
        day: "Thursday",
        status: "scheduled",
      },
      {
        id: "w4-g3",
        awayTeam: "Jets",
        homeTeam: "Chiefs",
        awayTeamLogo: teamLogos["Jets"],
        homeTeamLogo: teamLogos["Chiefs"],
        date: "Sat, Oct 11",
        time: "1:00 PM ET",
        day: "Saturday",
        status: "scheduled",
      },
      {
        id: "w4-g4",
        awayTeam: "Buccaneers",
        homeTeam: "49ers",
        awayTeamLogo: teamLogos["Buccaneers"],
        homeTeamLogo: teamLogos["49ers"],
        date: "Sun, Oct 12",
        time: "8:20 PM ET",
        day: "Sunday",
        status: "scheduled",
      },
      {
        id: "w4-g5",
        awayTeam: "Panthers",
        homeTeam: "Bears",
        awayTeamLogo: teamLogos["Panthers"],
        homeTeamLogo: teamLogos["Bears"],
        date: "Mon, Oct 13",
        time: "7:15 PM ET",
        day: "Monday",
        status: "scheduled",
      },
    ],
  },
  {
    week: 5,
    dateRange: "October 15–20",
    games: [
      {
        id: "w5-g1",
        awayTeam: "Rams",
        homeTeam: "Panthers",
        awayTeamLogo: teamLogos["Rams"],
        homeTeamLogo: teamLogos["Panthers"],
        date: "Wed, Oct 15",
        time: "8:15 PM ET",
        day: "Wednesday",
        status: "scheduled",
      },
      {
        id: "w5-g2",
        awayTeam: "Ravens",
        homeTeam: "Dolphins",
        awayTeamLogo: teamLogos["Ravens"],
        homeTeamLogo: teamLogos["Dolphins"],
        date: "Thu, Oct 16",
        time: "8:30 PM ET",
        day: "Thursday",
        status: "scheduled",
      },
      {
        id: "w5-g3",
        awayTeam: "Bears",
        homeTeam: "Buccaneers",
        awayTeamLogo: teamLogos["Bears"],
        homeTeamLogo: teamLogos["Buccaneers"],
        date: "Sat, Oct 18",
        time: "1:00 PM ET",
        day: "Saturday",
        status: "scheduled",
      },
      {
        id: "w5-g4",
        awayTeam: "49ers",
        homeTeam: "Chiefs",
        awayTeamLogo: teamLogos["49ers"],
        homeTeamLogo: teamLogos["Chiefs"],
        date: "Sun, Oct 19",
        time: "8:20 PM ET",
        day: "Sunday",
        status: "scheduled",
      },
      {
        id: "w5-g5",
        awayTeam: "Jets",
        homeTeam: "Jaguars",
        awayTeamLogo: teamLogos["Jets"],
        homeTeamLogo: teamLogos["Jaguars"],
        date: "Mon, Oct 20",
        time: "8:15 PM ET",
        day: "Monday",
        status: "scheduled",
      },
    ],
  },
  {
    week: 6,
    dateRange: "October 22–27",
    games: [
      {
        id: "w6-g1",
        awayTeam: "Dolphins",
        homeTeam: "Jets",
        awayTeamLogo: teamLogos["Dolphins"],
        homeTeamLogo: teamLogos["Jets"],
        date: "Wed, Oct 22",
        time: "8:30 PM ET",
        day: "Wednesday",
        network: "STCN",
        status: "scheduled",
      },
      {
        id: "w6-g2",
        awayTeam: "49ers",
        homeTeam: "Bears",
        awayTeamLogo: teamLogos["49ers"],
        homeTeamLogo: teamLogos["Bears"],
        date: "Thu, Oct 23",
        time: "8:15 PM ET",
        day: "Thursday",
        status: "scheduled",
      },
      {
        id: "w6-g3",
        awayTeam: "Panthers",
        homeTeam: "Ravens",
        awayTeamLogo: teamLogos["Panthers"],
        homeTeamLogo: teamLogos["Ravens"],
        date: "Sat, Oct 25",
        time: "1:00 PM ET",
        day: "Saturday",
        status: "scheduled",
      },
      {
        id: "w6-g4",
        awayTeam: "Buccaneers",
        homeTeam: "Rams",
        awayTeamLogo: teamLogos["Buccaneers"],
        homeTeamLogo: teamLogos["Rams"],
        date: "Sun, Oct 26",
        time: "8:20 PM ET",
        day: "Sunday",
        status: "scheduled",
      },
      {
        id: "w6-g5",
        awayTeam: "Chiefs",
        homeTeam: "Jaguars",
        awayTeamLogo: teamLogos["Chiefs"],
        homeTeamLogo: teamLogos["Jaguars"],
        date: "Mon, Oct 27",
        time: "8:15 PM ET",
        day: "Monday",
        status: "scheduled",
      },
    ],
  },
  {
    week: 7,
    dateRange: "October 29 – November 3",
    games: [
      {
        id: "w7-g1",
        awayTeam: "Jets",
        homeTeam: "Bears",
        awayTeamLogo: teamLogos["Jets"],
        homeTeamLogo: teamLogos["Bears"],
        date: "Wed, Oct 29",
        time: "8:15 PM ET",
        day: "Wednesday",
        status: "scheduled",
      },
      {
        id: "w7-g2",
        awayTeam: "Rams",
        homeTeam: "Ravens",
        awayTeamLogo: teamLogos["Rams"],
        homeTeamLogo: teamLogos["Ravens"],
        date: "Thu, Oct 30",
        time: "8:15 PM ET",
        day: "Thursday",
        status: "scheduled",
      },
      {
        id: "w7-g3",
        awayTeam: "Jaguars",
        homeTeam: "49ers",
        awayTeamLogo: teamLogos["Jaguars"],
        homeTeamLogo: teamLogos["49ers"],
        date: "Sat, Nov 1",
        time: "1:00 PM ET",
        day: "Saturday",
        status: "scheduled",
      },
      {
        id: "w7-g4",
        awayTeam: "Chiefs",
        homeTeam: "Panthers",
        awayTeamLogo: teamLogos["Chiefs"],
        homeTeamLogo: teamLogos["Panthers"],
        date: "Sun, Nov 2",
        time: "8:20 PM ET",
        day: "Sunday",
        status: "scheduled",
      },
      {
        id: "w7-g5",
        awayTeam: "Dolphins",
        homeTeam: "Buccaneers",
        awayTeamLogo: teamLogos["Dolphins"],
        homeTeamLogo: teamLogos["Buccaneers"],
        date: "Mon, Nov 3",
        time: "8:30 PM ET",
        day: "Monday",
        status: "scheduled",
      },
    ],
  },
  {
    week: 8,
    dateRange: "November 5–10",
    games: [
      {
        id: "w8-g1",
        awayTeam: "Buccaneers",
        homeTeam: "Jets",
        awayTeamLogo: teamLogos["Buccaneers"],
        homeTeamLogo: teamLogos["Jets"],
        date: "Wed, Nov 5",
        time: "8:15 PM ET",
        day: "Wednesday",
        status: "scheduled",
      },
      {
        id: "w8-g2",
        awayTeam: "Ravens",
        homeTeam: "49ers",
        awayTeamLogo: teamLogos["Ravens"],
        homeTeamLogo: teamLogos["49ers"],
        date: "Thu, Nov 6",
        time: "8:15 PM ET",
        day: "Thursday",
        status: "scheduled",
      },
      {
        id: "w8-g3",
        awayTeam: "Bears",
        homeTeam: "Rams",
        awayTeamLogo: teamLogos["Bears"],
        homeTeamLogo: teamLogos["Rams"],
        date: "Sat, Nov 8",
        time: "1:00 PM ET",
        day: "Saturday",
        status: "scheduled",
      },
      {
        id: "w8-g4",
        awayTeam: "Panthers",
        homeTeam: "Jaguars",
        awayTeamLogo: teamLogos["Panthers"],
        homeTeamLogo: teamLogos["Jaguars"],
        date: "Sun, Nov 9",
        time: "8:30 PM ET",
        day: "Sunday",
        status: "scheduled",
      },
      {
        id: "w8-g5",
        awayTeam: "Chiefs",
        homeTeam: "Dolphins",
        awayTeamLogo: teamLogos["Chiefs"],
        homeTeamLogo: teamLogos["Dolphins"],
        date: "Mon, Nov 10",
        time: "8:15 PM ET",
        day: "Monday",
        status: "scheduled",
      },
    ],
  },
  {
    week: 9,
    dateRange: "November 12–17",
    games: [
      {
        id: "w9-g1",
        awayTeam: "Jets",
        homeTeam: "49ers",
        awayTeamLogo: teamLogos["Jets"],
        homeTeamLogo: teamLogos["49ers"],
        date: "Wed, Nov 12",
        time: "8:15 PM ET",
        day: "Wednesday",
        status: "scheduled",
      },
      {
        id: "w9-g2",
        awayTeam: "Panthers",
        homeTeam: "Dolphins",
        awayTeamLogo: teamLogos["Panthers"],
        homeTeamLogo: teamLogos["Dolphins"],
        date: "Thu, Nov 13",
        time: "8:30 PM ET",
        day: "Thursday",
        status: "scheduled",
      },
      {
        id: "w9-g3",
        awayTeam: "Chiefs",
        homeTeam: "Rams",
        awayTeamLogo: teamLogos["Chiefs"],
        homeTeamLogo: teamLogos["Rams"],
        date: "Sat, Nov 15",
        time: "1:00 PM ET",
        day: "Saturday",
        status: "scheduled",
      },
      {
        id: "w9-g4",
        awayTeam: "Jaguars",
        homeTeam: "Buccaneers",
        awayTeamLogo: teamLogos["Jaguars"],
        homeTeamLogo: teamLogos["Buccaneers"],
        date: "Sun, Nov 16",
        time: "8:20 PM ET",
        day: "Sunday",
        status: "scheduled",
      },
      {
        id: "w9-g5",
        awayTeam: "Ravens",
        homeTeam: "Bears",
        awayTeamLogo: teamLogos["Ravens"],
        homeTeamLogo: teamLogos["Bears"],
        date: "Mon, Nov 17",
        time: "8:15 PM ET",
        day: "Monday",
        status: "scheduled",
      },
    ],
  },
  {
    week: 10,
    dateRange: "November 19–24",
    games: [
      {
        id: "w10-g1",
        awayTeam: "Dolphins",
        homeTeam: "Buccaneers",
        awayTeamLogo: teamLogos["Dolphins"],
        homeTeamLogo: teamLogos["Buccaneers"],
        date: "Wed, Nov 19",
        time: "8:15 PM ET",
        day: "Wednesday",
        status: "scheduled",
      },
      {
        id: "w10-g2",
        awayTeam: "Bears",
        homeTeam: "Jets",
        awayTeamLogo: teamLogos["Bears"],
        homeTeamLogo: teamLogos["Jets"],
        date: "Thu, Nov 20",
        time: "8:15 PM ET",
        day: "Thursday",
        status: "scheduled",
      },
      {
        id: "w10-g3",
        awayTeam: "Panthers",
        homeTeam: "Chiefs",
        awayTeamLogo: teamLogos["Panthers"],
        homeTeamLogo: teamLogos["Chiefs"],
        date: "Sat, Nov 22",
        time: "3:30 PM ET",
        day: "Saturday",
        status: "scheduled",
      },
      {
        id: "w10-g4",
        awayTeam: "Rams",
        homeTeam: "Ravens",
        awayTeamLogo: teamLogos["Rams"],
        homeTeamLogo: teamLogos["Ravens"],
        date: "Sun, Nov 23",
        time: "8:20 PM ET",
        day: "Sunday",
        status: "scheduled",
      },
      {
        id: "w10-g5",
        awayTeam: "49ers",
        homeTeam: "Jaguars",
        awayTeamLogo: teamLogos["49ers"],
        homeTeamLogo: teamLogos["Jaguars"],
        date: "Mon, Nov 24",
        time: "8:15 PM ET",
        day: "Monday",
        status: "scheduled",
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
  const [scheduleData, setScheduleData] = useState<WeekSchedule[]>(initialScheduleData)

  useEffect(() => {
    setIsClient(true)
    // Load updated scores from localStorage (simulating admin updates)
    const savedScores = localStorage.getItem("stc-game-scores")
    if (savedScores) {
      try {
        const scores = JSON.parse(savedScores)
        setScheduleData((prevData) =>
          prevData.map((week) => ({
            ...week,
            games: week.games.map((game) => {
              const savedGame = scores.find((s: any) => s.id === game.id)
              return savedGame ? { ...game, ...savedGame } : game
            }),
          })),
        )
      } catch (error) {
        console.error("Error loading saved scores:", error)
      }
    }
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "final":
        return <Badge className="bg-green-600 text-white">Final</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-600 text-black">Live</Badge>
      case "scheduled":
        return (
          <Badge variant="outline" className="border-gray-400 text-gray-600">
            Scheduled
          </Badge>
        )
      default:
        return null
    }
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
            STC Season 14 Schedule
          </h1>
          <p className="text-lg text-gray-600 mb-2">Regular Season • Weeks 1–10</p>
          <p className="text-sm text-gray-500">All times Eastern Time</p>
        </motion.div>

        {/* Schedule Release Graphic */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full max-w-[600px] h-[200px]">
            <Image
              src="/images/schedule-release.png"
              alt="Season 14 Schedule Release"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        <Tabs defaultValue="1" className="w-full" onValueChange={(value) => setActiveWeek(value)}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <TabsList className="flex flex-wrap justify-center gap-2 mb-4 bg-gray-100">
              {scheduleData.map((week) => (
                <TabsTrigger
                  key={week.week}
                  value={week.week.toString()}
                  className="px-4 py-2 data-[state=active]:bg-stc-red data-[state=active]:text-white"
                >
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
                <Card className="border-gray-200 shadow-lg bg-white">
                  <CardHeader className="bg-gradient-to-r from-stc-red to-stc-gold text-white">
                    <CardTitle className="text-center text-2xl">
                      Week {week.week} • {week.dateRange}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                      {week.games.map((game, index) => (
                        <motion.div key={index} variants={itemVariants} custom={index}>
                          <div className="flex items-center justify-between p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                            {/* Away Team */}
                            <div className="flex items-center flex-1 justify-end pr-6">
                              <Link
                                href={`/teams/${game.awayTeam.toLowerCase()}`}
                                className="flex items-center hover:underline group"
                              >
                                <div className="text-right mr-4">
                                  <span className="font-semibold group-hover:text-stc-red transition-colors text-black block">
                                    {game.awayTeam}
                                  </span>
                                  {game.status === "final" && (
                                    <span
                                      className={`text-2xl font-bold ${
                                        (game.awayScore ?? 0) > (game.homeScore ?? 0)
                                          ? "text-green-600"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {game.awayScore}
                                    </span>
                                  )}
                                </div>
                                <div className="w-12 h-12 relative">
                                  <Image
                                    src={game.awayTeamLogo || "/placeholder.svg"}
                                    alt={`${game.awayTeam} logo`}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              </Link>
                            </div>

                            {/* Game Info */}
                            <div className="flex flex-col items-center px-6 min-w-[200px]">
                              <div className="flex items-center space-x-2 mb-2">
                                <Calendar className="w-4 h-4 text-stc-gold" />
                                <span className="font-medium text-gray-700">{game.date}</span>
                              </div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Clock className="w-4 h-4 text-stc-gold" />
                                <span className="font-medium text-gray-700">{game.time}</span>
                              </div>
                              {game.network && (
                                <div className="flex items-center space-x-2 mb-2">
                                  <Tv className="w-4 h-4 text-stc-gold" />
                                  <Badge variant="outline" className="border-stc-gold text-stc-gold">
                                    {game.network}
                                  </Badge>
                                </div>
                              )}
                              <div className="flex items-center space-x-2 mb-2">{getStatusBadge(game.status)}</div>
                              <span className="text-2xl font-bold text-stc-red">@</span>
                            </div>

                            {/* Home Team */}
                            <div className="flex items-center flex-1 pl-6">
                              <Link
                                href={`/teams/${game.homeTeam.toLowerCase()}`}
                                className="flex items-center hover:underline group"
                              >
                                <div className="w-12 h-12 relative">
                                  <Image
                                    src={game.homeTeamLogo || "/placeholder.svg"}
                                    alt={`${game.homeTeam} logo`}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                                <div className="text-left ml-4">
                                  <span className="font-semibold group-hover:text-stc-red transition-colors text-black block">
                                    {game.homeTeam}
                                  </span>
                                  {game.status === "final" && (
                                    <span
                                      className={`text-2xl font-bold ${
                                        (game.homeScore ?? 0) > (game.awayScore ?? 0)
                                          ? "text-green-600"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {game.homeScore}
                                    </span>
                                  )}
                                </div>
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

        <motion.div
          className="mt-8 text-center text-gray-500 text-sm space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>All games broadcast live on the STC Network</p>
          <p>Playoff schedule to be announced following regular season completion</p>
        </motion.div>
      </div>
    </div>
  )
}
