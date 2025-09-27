"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Trophy, Users, TrendingUp, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data - in real app this would come from API
const featuredNews = [
  {
    id: 1,
    title: "Season 14 Kicks Off with Exciting Matchups",
    excerpt: "The Sports Talk Club enters its 14th season with 10 competitive teams ready for action.",
    image: "/images/news/season-14-kickoff.jpg",
    date: "2024-01-15",
    category: "Season News",
  },
  {
    id: 2,
    title: "New Team Additions Shake Up League",
    excerpt: "Two new franchises join the STC, bringing fresh talent and competition to the league.",
    image: "/images/news/new-teams.jpg",
    date: "2024-01-12",
    category: "League News",
  },
]

const upcomingGames = [
  {
    id: 1,
    homeTeam: "Ravens",
    awayTeam: "Cardinals",
    homeTeamLogo: "/images/team-logos/BAL.png",
    awayTeamLogo: "/images/team-logos/ARI.png",
    date: "2024-01-20",
    time: "8:00 PM EST",
    week: "Week 1",
  },
  {
    id: 2,
    homeTeam: "Lions",
    awayTeam: "Packers",
    homeTeamLogo: "/images/team-logos/DET.png",
    awayTeamLogo: "/images/team-logos/GB.png",
    date: "2024-01-21",
    time: "3:00 PM EST",
    week: "Week 1",
  },
]

const standings = [
  { team: "Ravens", wins: 0, losses: 0, logo: "/images/team-logos/BAL.png" },
  { team: "Cardinals", wins: 0, losses: 0, logo: "/images/team-logos/ARI.png" },
  { team: "Lions", wins: 0, losses: 0, logo: "/images/team-logos/DET.png" },
  { team: "Packers", wins: 0, losses: 0, logo: "/images/team-logos/GB.png" },
  { team: "Bears", wins: 0, losses: 0, logo: "/images/team-logos/CHI.png" },
]

export default function HomePageClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-stc-red via-black to-stc-gold text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">SEASON 14</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">The Sports Talk Club Returns with 10 Elite Teams</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                <Calendar className="mr-2 h-5 w-5" />
                View Schedule
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                <Trophy className="mr-2 h-5 w-5" />
                Standings
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured News */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-black">LATEST NEWS</h2>
                <Link href="/news">
                  <Button
                    variant="outline"
                    className="border-stc-red text-stc-red hover:bg-stc-red hover:text-white bg-transparent"
                  >
                    View All News
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredNews.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="aspect-video bg-gray-200 relative">
                        <Image
                          src={article.image || "/placeholder.svg?height=200&width=400"}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-stc-red text-white">{article.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{new Date(article.date).toLocaleDateString()}</span>
                          <Link href={`/news/${article.id}`}>
                            <Button size="sm" variant="outline">
                              Read More
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Upcoming Games */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-black">UPCOMING GAMES</h2>
                <Link href="/schedule">
                  <Button
                    variant="outline"
                    className="border-stc-red text-stc-red hover:bg-stc-red hover:text-white bg-transparent"
                  >
                    Full Schedule
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline" className="text-stc-red border-stc-red">
                              {game.week}
                            </Badge>
                            <div className="flex items-center space-x-6">
                              {/* Away Team */}
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={game.awayTeamLogo || "/placeholder.svg"}
                                  alt={game.awayTeam}
                                  width={40}
                                  height={40}
                                  className="rounded"
                                />
                                <span className="font-bold">{game.awayTeam}</span>
                              </div>
                              <span className="text-gray-500 font-bold">@</span>
                              {/* Home Team */}
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={game.homeTeamLogo || "/placeholder.svg"}
                                  alt={game.homeTeam}
                                  width={40}
                                  height={40}
                                  className="rounded"
                                />
                                <span className="font-bold">{game.homeTeam}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-gray-600 mb-1">
                              <Clock className="h-4 w-4 mr-1" />
                              <span className="text-sm">{game.time}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span className="text-sm">{new Date(game.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-black">SEASON 14 STATS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-stc-red" />
                      <span className="font-medium">Teams</span>
                    </div>
                    <span className="font-bold text-2xl">10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5 text-stc-gold" />
                      <span className="font-medium">Games Played</span>
                    </div>
                    <span className="font-bold text-2xl">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-black" />
                      <span className="font-medium">Total Players</span>
                    </div>
                    <span className="font-bold text-2xl">120+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Standings Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-black">STANDINGS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {standings.slice(0, 5).map((team, index) => (
                    <div key={team.team} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-bold text-gray-500 w-4">{index + 1}</span>
                        <Image
                          src={team.logo || "/placeholder.svg"}
                          alt={team.team}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                        <span className="font-medium">{team.team}</span>
                      </div>
                      <span className="text-sm font-bold">
                        {team.wins}-{team.losses}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/standings">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View Full Standings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* League Info */}
            <Card className="bg-gradient-to-br from-stc-red to-black text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Season 14 Championship</h3>
                <p className="text-sm text-gray-200 mb-4">
                  10 teams compete for the ultimate prize in our most competitive season yet.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
