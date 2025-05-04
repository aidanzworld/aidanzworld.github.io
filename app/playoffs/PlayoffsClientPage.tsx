"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Sparkles, Trophy, Dice1Icon as Dice, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Get playoff teams based on standings
const getPlayoffTeams = () => {
  // AFC Teams (top 4)
  const afcTeams = [
    {
      id: 1,
      seed: 1,
      name: "Chiefs",
      city: "Kansas City",
      conference: "AFC",
      record: "6-4",
      logo: "/images/team-logos/KAN.png",
      eliminated: true,
    },
    {
      id: 2,
      seed: 2,
      name: "Dolphins",
      city: "Miami",
      conference: "AFC",
      record: "5-5",
      logo: "/images/team-logos/MIA.png",
      eliminated: true,
    },
    {
      id: 3,
      seed: 3,
      name: "Oilers",
      city: "Tennessee",
      conference: "AFC",
      record: "5-5",
      logo: "/images/team-logos/OILERS.png",
      eliminated: false,
    },
    {
      id: 4,
      seed: 4,
      name: "Broncos",
      city: "Denver",
      conference: "AFC",
      record: "3-7",
      logo: "/images/team-logos/DEN.png",
      eliminated: false,
    },
  ]

  // NFC Teams (top 4)
  const nfcTeams = [
    {
      id: 6,
      seed: 1,
      name: "Bears",
      city: "Chicago",
      conference: "NFC",
      record: "10-0",
      logo: "/images/team-logos/CHI.png",
      eliminated: true,
    },
    {
      id: 7,
      seed: 2,
      name: "49ers",
      city: "San Francisco",
      conference: "NFC",
      record: "7-3",
      logo: "/images/team-logos/49ERS.png",
      eliminated: false,
    },
    {
      id: 8,
      seed: 3,
      name: "Buccaneers",
      city: "Tampa Bay",
      conference: "NFC",
      record: "7-3",
      logo: "/images/team-logos/TB.png",
      eliminated: true,
    },
    {
      id: 9,
      seed: 4,
      name: "Saints",
      city: "New Orleans",
      conference: "NFC",
      record: "5-5",
      logo: "/images/team-logos/NO.png",
      eliminated: false,
    },
  ]

  return { afcTeams, nfcTeams }
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
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

// Neon text effect component
const NeonText = ({ children, color = "#ff00ff", className = "" }) => (
  <span
    className={`font-bold ${className}`}
    style={{
      color: color,
      textShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
    }}
  >
    {children}
  </span>
)

export default function PlayoffsClientPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const { afcTeams, nfcTeams } = getPlayoffTeams()

  if (!isClient) {
    return null // Prevent SSR flash
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Vegas-themed header */}
      <div className="relative overflow-hidden">
        {/* Background with Vegas-style gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-black to-black opacity-80 z-0"></div>

        {/* Decorative lights */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-10 left-[10%] w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 10px 2px #3b82f6" }}
          ></div>
          <div
            className="absolute top-20 left-[20%] w-2 h-2 bg-red-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 10px 2px #ef4444" }}
          ></div>
          <div
            className="absolute top-15 left-[30%] w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 10px 2px #eab308" }}
          ></div>
          <div
            className="absolute top-25 left-[40%] w-2 h-2 bg-green-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 10px 2px #22c55e" }}
          ></div>
          <div
            className="absolute top-10 left-[50%] w-2 h-2 bg-pink-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 10px 2px #ec4899" }}
          ></div>
          <div
            className="absolute top-20 left-[60%] w-2 h-2 bg-purple-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 10px 2px #a855f7" }}
          ></div>
          <div
            className="absolute top-15 left-[70%] w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 10px 2px #3b82f6" }}
          ></div>
          <div
            className="absolute top-25 left-[80%] w-2 h-2 bg-red-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 10px 2px #ef4444" }}
          ></div>
          <div
            className="absolute top-10 left-[90%] w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 10px 2px #eab308" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col items-center justify-center">
            {/* Playoffs Logo */}
            <div className="w-full max-w-md mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/STCP-v2UsZ3RdXpcL0mmMT7CQYAI6ZtTWJq.png"
                alt="STC Playoffs"
                width={600}
                height={150}
                className="w-full h-auto"
              />
            </div>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-4 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NeonText color="#ff2d55">ROAD TO VEGAS</NeonText>
            </motion.h1>

            <motion.div
              className="flex items-center justify-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sparkles className="h-6 w-6 text-yellow-400 mr-2" />
              <span className="text-xl text-yellow-400">STC BOWL XII • ALLEGIANT STADIUM • LAS VEGAS</span>
              <Sparkles className="h-6 w-6 text-yellow-400 ml-2" />
            </motion.div>

            {/* Vegas-themed STC Bowl Logo */}
            <motion.div
              className="w-full max-w-md mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/STCBOWL12%20LOGO-XlL8EH7DPyctQ8CxkO183JtsFRvBFK.png"
                alt="STC Bowl Las Vegas"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Conference Sections */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* AFC Playoff Picture */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#CE1126]/20 to-transparent rounded-lg -m-1"></div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              <NeonText color="#CE1126">AFC PLAYOFF PICTURE</NeonText>
            </h2>
            <Card className="overflow-hidden border-[#CE1126] bg-black/50 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#CE1126] to-[#CE1126]/70 text-white">
                <CardTitle className="text-center flex items-center justify-center">
                  <Dice className="mr-2 h-5 w-5" />
                  AFC PLAYOFF SEEDS
                  <Dice className="ml-2 h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {afcTeams.map((team, index) => (
                  <motion.div
                    key={team.id}
                    className={`flex items-center p-4 border-b border-gray-800 last:border-b-0 ${
                      team.seed === 1 ? "bg-yellow-900/20" : ""
                    } ${team.eliminated ? "opacity-60" : ""}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: team.eliminated ? 0.6 : 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-[#CE1126] text-white rounded-full mr-4">
                      {team.seed}
                    </div>
                    <div className="w-12 h-12 relative mr-4">
                      <Image
                        src={team.logo || "/placeholder.svg"}
                        alt={`${team.city} ${team.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">
                        {team.city} {team.name}
                      </h3>
                      <p className="text-gray-400">{team.record}</p>
                    </div>
                    {team.eliminated && (
                      <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">ELIMINATED</span>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* NFC Playoff Picture */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#003B66]/20 to-transparent rounded-lg -m-1"></div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              <NeonText color="#003B66">NFC PLAYOFF PICTURE</NeonText>
            </h2>
            <Card className="overflow-hidden border-[#003B66] bg-black/50 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#003B66] to-[#003B66]/70 text-white">
                <CardTitle className="text-center flex items-center justify-center">
                  <Dice className="mr-2 h-5 w-5" />
                  NFC PLAYOFF SEEDS
                  <Dice className="ml-2 h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {nfcTeams.map((team, index) => (
                  <motion.div
                    key={team.id}
                    className={`flex items-center p-4 border-b border-gray-800 last:border-b-0 ${
                      team.seed === 1 ? "bg-yellow-900/20" : ""
                    } ${team.eliminated ? "opacity-60" : ""}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: team.eliminated ? 0.6 : 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-[#003B66] text-white rounded-full mr-4">
                      {team.seed}
                    </div>
                    <div className="w-12 h-12 relative mr-4">
                      <Image
                        src={team.logo || "/placeholder.svg"}
                        alt={`${team.city} ${team.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">
                        {team.city} {team.name}
                      </h3>
                      <p className="text-gray-400">{team.record}</p>
                    </div>
                    {team.eliminated && (
                      <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">ELIMINATED</span>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Playoff Bracket - with Vegas theme */}
        <motion.h2
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <NeonText color="#eab308" className="text-3xl md:text-4xl">
            THE PLAYOFF BRACKET
          </NeonText>
        </motion.h2>

        {/* Bracket visualization with neon styling */}
        <div className="relative">
          {/* Decorative casino-themed elements */}
          <div className="absolute -top-10 -left-10 text-6xl opacity-10 text-red-500">♦</div>
          <div className="absolute -bottom-10 -right-10 text-6xl opacity-10 text-red-500">♥</div>
          <div className="absolute -top-10 -right-10 text-6xl opacity-10 text-black">♠</div>
          <div className="absolute -bottom-10 -left-10 text-6xl opacity-10 text-black">♣</div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* AFC Bracket */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#CE1126]/10 to-transparent rounded-lg -m-1"></div>
              <h3 className="text-xl font-bold mb-4 text-center">
                <NeonText color="#CE1126">AFC BRACKET</NeonText>
              </h3>
              <div className="relative">
                {/* Semi-Finals */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="col-span-1">
                    <h4 className="text-sm font-semibold mb-2 text-center text-gray-300">Semi-Finals</h4>
                    <div className="space-y-4">
                      <Card className="overflow-hidden border-[#CE1126]/50 bg-black/70">
                        <CardHeader className="bg-gradient-to-r from-[#CE1126] to-[#CE1126]/70 text-white p-2">
                          <CardTitle className="text-sm text-center">Game 1</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className="w-5 h-5 flex items-center justify-center bg-[#CE1126] text-white text-xs rounded-full mr-2">
                                1
                              </span>
                              <div className="flex items-center">
                                <div className="w-6 h-6 relative mr-1">
                                  <Image
                                    src={afcTeams[0].logo || "/placeholder.svg"}
                                    alt={`${afcTeams[0].city} logo`}
                                    fill
                                    className="object-contain opacity-60"
                                  />
                                </div>
                                <span className="text-sm text-gray-400">{afcTeams[0].city}</span>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-gray-400">45</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="w-5 h-5 flex items-center justify-center bg-[#CE1126] text-white text-xs rounded-full mr-2">
                                4
                              </span>
                              <div className="flex items-center">
                                <div className="w-6 h-6 relative mr-1">
                                  <Image
                                    src={afcTeams[3].logo || "/placeholder.svg"}
                                    alt={`${afcTeams[3].city} logo`}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                                <span className="text-sm text-white">{afcTeams[3].city}</span>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-yellow-400">55</span>
                          </div>
                          <div className="mt-2 text-xs text-center text-yellow-400">Denver advances</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <h4 className="text-sm font-semibold mb-2 text-center text-gray-300">Semi-Finals</h4>
                    <div className="space-y-4">
                      <Card className="overflow-hidden border-[#CE1126]/50 bg-black/70">
                        <CardHeader className="bg-gradient-to-r from-[#CE1126] to-[#CE1126]/70 text-white p-2">
                          <CardTitle className="text-sm text-center">Game 2</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className="w-5 h-5 flex items-center justify-center bg-[#CE1126] text-white text-xs rounded-full mr-2">
                                2
                              </span>
                              <div className="flex items-center">
                                <div className="w-6 h-6 relative mr-1">
                                  <Image
                                    src={afcTeams[1].logo || "/placeholder.svg"}
                                    alt={`${afcTeams[1].city} logo`}
                                    fill
                                    className="object-contain opacity-60"
                                  />
                                </div>
                                <span className="text-sm text-gray-400">{afcTeams[1].city}</span>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-gray-400">40</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="w-5 h-5 flex items-center justify-center bg-[#CE1126] text-white text-xs rounded-full mr-2">
                                3
                              </span>
                              <div className="flex items-center">
                                <div className="w-6 h-6 relative mr-1">
                                  <Image
                                    src={afcTeams[2].logo || "/placeholder.svg"}
                                    alt={`${afcTeams[2].city} logo`}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                                <span className="text-sm text-white">{afcTeams[2].city}</span>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-yellow-400">62</span>
                          </div>
                          <div className="mt-2 text-xs text-center text-yellow-400">Tennessee advances</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* AFC Championship */}
                <div className="max-w-md mx-auto">
                  <h4 className="text-sm font-semibold mb-2 text-center text-gray-300">AFC Championship</h4>
                  <Card className="overflow-hidden border-[#CE1126]/50 bg-black/70">
                    <CardHeader className="bg-gradient-to-r from-[#CE1126] to-[#CE1126]/70 text-white p-2">
                      <CardTitle className="text-sm text-center flex items-center justify-center">
                        <Trophy className="h-4 w-4 mr-2 text-yellow-400" />
                        AFC Championship
                        <Trophy className="h-4 w-4 ml-2 text-yellow-400" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="w-5 h-5 flex items-center justify-center bg-[#CE1126] text-white text-xs rounded-full mr-2">
                            4
                          </span>
                          <div className="flex items-center">
                            <div className="w-6 h-6 relative mr-1">
                              <Image
                                src={afcTeams[3].logo || "/placeholder.svg"}
                                alt={`${afcTeams[3].city} logo`}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="text-sm text-white">{afcTeams[3].city}</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-yellow-400">?</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="w-5 h-5 flex items-center justify-center bg-[#CE1126] text-white text-xs rounded-full mr-2">
                            3
                          </span>
                          <div className="flex items-center">
                            <div className="w-6 h-6 relative mr-1">
                              <Image
                                src={afcTeams[2].logo || "/placeholder.svg"}
                                alt={`${afcTeams[2].city} logo`}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="text-sm text-white">{afcTeams[2].city}</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-yellow-400">?</span>
                      </div>
                      <div className="mt-2 text-xs text-center text-yellow-400 animate-pulse">Coming Soon</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* NFC Bracket */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#003B66]/10 to-transparent rounded-lg -m-1"></div>
              <h3 className="text-xl font-bold mb-4 text-center">
                <NeonText color="#003B66">NFC BRACKET</NeonText>
              </h3>
              <div className="relative">
                {/* Semi-Finals */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="col-span-1">
                    <h4 className="text-sm font-semibold mb-2 text-center text-gray-300">Semi-Finals</h4>
                    <div className="space-y-4">
                      <Card className="overflow-hidden border-[#003B66]/50 bg-black/70">
                        <CardHeader className="bg-gradient-to-r from-[#003B66] to-[#003B66]/70 text-white p-2">
                          <CardTitle className="text-sm text-center">Game 1</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className="w-5 h-5 flex items-center justify-center bg-[#003B66] text-white text-xs rounded-full mr-2">
                                1
                              </span>
                              <div className="flex items-center">
                                <div className="w-6 h-6 relative mr-1">
                                  <Image
                                    src={nfcTeams[0].logo || "/placeholder.svg"}
                                    alt={`${nfcTeams[0].city} logo`}
                                    fill
                                    className="object-contain opacity-60"
                                  />
                                </div>
                                <span className="text-sm text-gray-400">{nfcTeams[0].city}</span>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-gray-400">49</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="w-5 h-5 flex items-center justify-center bg-[#003B66] text-white text-xs rounded-full mr-2">
                                4
                              </span>
                              <div className="flex items-center">
                                <div className="w-6 h-6 relative mr-1">
                                  <Image
                                    src={nfcTeams[3].logo || "/placeholder.svg"}
                                    alt={`${nfcTeams[3].city} logo`}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                                <span className="text-sm text-white">{nfcTeams[3].city}</span>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-yellow-400">55</span>
                          </div>
                          <div className="mt-2 text-xs text-center text-yellow-400">New Orleans advances</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <h4 className="text-sm font-semibold mb-2 text-center text-gray-300">Semi-Finals</h4>
                    <div className="space-y-4">
                      <Card className="overflow-hidden border-[#003B66]/50 bg-black/70">
                        <CardHeader className="bg-gradient-to-r from-[#003B66] to-[#003B66]/70 text-white p-2">
                          <CardTitle className="text-sm text-center">Game 2</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className="w-5 h-5 flex items-center justify-center bg-[#003B66] text-white text-xs rounded-full mr-2">
                                2
                              </span>
                              <div className="flex items-center">
                                <div className="w-6 h-6 relative mr-1">
                                  <Image
                                    src={nfcTeams[1].logo || "/placeholder.svg"}
                                    alt={`${nfcTeams[1].city} logo`}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                                <span className="text-sm text-white">{nfcTeams[1].city}</span>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-yellow-400">60</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="w-5 h-5 flex items-center justify-center bg-[#003B66] text-white text-xs rounded-full mr-2">
                                3
                              </span>
                              <div className="flex items-center">
                                <div className="w-6 h-6 relative mr-1">
                                  <Image
                                    src={nfcTeams[2].logo || "/placeholder.svg"}
                                    alt={`${nfcTeams[2].city} logo`}
                                    fill
                                    className="object-contain opacity-60"
                                  />
                                </div>
                                <span className="text-sm text-gray-400">{nfcTeams[2].city}</span>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-gray-400">56</span>
                          </div>
                          <div className="mt-2 text-xs text-center text-yellow-400">San Francisco advances</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* NFC Championship */}
                <div className="max-w-md mx-auto">
                  <h4 className="text-sm font-semibold mb-2 text-center text-gray-300">NFC Championship</h4>
                  <Card className="overflow-hidden border-[#003B66]/50 bg-black/70">
                    <CardHeader className="bg-gradient-to-r from-[#003B66] to-[#003B66]/70 text-white p-2">
                      <CardTitle className="text-sm text-center flex items-center justify-center">
                        <Trophy className="h-4 w-4 mr-2 text-yellow-400" />
                        NFC Championship
                        <Trophy className="h-4 w-4 ml-2 text-yellow-400" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="w-5 h-5 flex items-center justify-center bg-[#003B66] text-white text-xs rounded-full mr-2">
                            4
                          </span>
                          <div className="flex items-center">
                            <div className="w-6 h-6 relative mr-1">
                              <Image
                                src={nfcTeams[3].logo || "/placeholder.svg"}
                                alt={`${nfcTeams[3].city} logo`}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="text-sm text-white">{nfcTeams[3].city}</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-yellow-400">?</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="w-5 h-5 flex items-center justify-center bg-[#003B66] text-white text-xs rounded-full mr-2">
                            2
                          </span>
                          <div className="flex items-center">
                            <div className="w-6 h-6 relative mr-1">
                              <Image
                                src={nfcTeams[1].logo || "/placeholder.svg"}
                                alt={`${nfcTeams[1].city} logo`}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="text-sm text-white">{nfcTeams[1].city}</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-yellow-400">?</span>
                      </div>
                      <div className="mt-2 text-xs text-center text-yellow-400 animate-pulse">Coming Soon</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* STC Bowl - Vegas Style */}
        <motion.div
          className="max-w-4xl mx-auto mt-16 mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            <NeonText color="#eab308" className="text-4xl md:text-5xl">
              STC BOWL XII
            </NeonText>
          </h2>

          <Card className="overflow-hidden border-yellow-500 bg-black/70 relative">
            {/* Vegas-style decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute top-5 left-[10%] text-4xl text-red-500">♦</div>
              <div className="absolute bottom-5 right-[10%] text-4xl text-red-500">♥</div>
              <div className="absolute top-5 right-[10%] text-4xl text-white">♠</div>
              <div className="absolute bottom-5 left-[10%] text-4xl text-white">♣</div>
            </div>

            <CardHeader className="bg-gradient-to-r from-purple-900 via-black to-purple-900 text-white p-6">
              <div className="relative w-full h-48 md:h-64 mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/STCBOWL12%20LOGO-XlL8EH7DPyctQ8CxkO183JtsFRvBFK.png"
                  alt="STC Bowl Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <CardTitle className="text-center text-2xl">
                <NeonText color="#eab308">ALLEGIANT STADIUM • LAS VEGAS, NEVADA</NeonText>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#CE1126] to-[#CE1126]/70 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                      AFC
                    </div>
                    <span className="text-xl font-medium text-gray-300">AFC Champion</span>
                    <span className="text-sm text-yellow-400 mt-1">Denver or Tennessee</span>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      <NeonText color="#ff2d55">VS</NeonText>
                    </div>
                    <div className="text-sm text-gray-400">COMING SOON</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#003B66] to-[#003B66]/70 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                      NFC
                    </div>
                    <span className="text-xl font-medium text-gray-300">NFC Champion</span>
                    <span className="text-sm text-yellow-400 mt-1">New Orleans or San Francisco</span>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-300 mb-4">
                    Experience the ultimate showdown in the entertainment capital of the world!
                  </p>
                  <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Learn More About STC Bowl XII
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vegas-themed footer */}
        <div className="mt-16 text-center border-t border-gray-800 pt-8">
          <p className="text-gray-400 mb-2">STC Season 12 Playoffs</p>
          <p className="text-gray-500 text-sm">The Road to Las Vegas • STC Bowl XII</p>
        </div>
      </div>
    </div>
  )
}
