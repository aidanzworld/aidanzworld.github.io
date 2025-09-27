"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Users, Calendar, Trophy, Settings, LogOut, Activity, TrendingUp, Clock, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface DashboardStats {
  totalTeams: number
  totalGames: number
  completedGames: number
  upcomingGames: number
  totalPlayers: number
  activeUsers: number
}

interface RecentActivity {
  id: string
  type: "game" | "team" | "player"
  description: string
  timestamp: string
}

export default function AdminDashboardClient() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalTeams: 12,
    totalGames: 48,
    completedGames: 32,
    upcomingGames: 16,
    totalPlayers: 360,
    activeUsers: 1247,
  })
  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "game",
      description: "Chiefs defeated Raiders 28-17",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "team",
      description: "Updated Dolphins roster",
      timestamp: "4 hours ago",
    },
    {
      id: "3",
      type: "game",
      description: "Scheduled Week 14 games",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      type: "player",
      description: "Added new player to Colts",
      timestamp: "2 days ago",
    },
  ])

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("stc-admin")
      if (auth === "true") {
        setIsAuthenticated(true)
      } else {
        router.push("/admin")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("stc-admin")
    router.push("/admin")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stc-red via-black to-stc-gold flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stc-red via-black to-stc-gold">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/images/stc-logo.png" alt="STC Logo" width={48} height={48} className="rounded-lg" />
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-300">Sports Talk Club League Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-600 text-white">
                <Activity className="w-4 h-4 mr-1" />
                System Online
              </Badge>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Teams</CardTitle>
                <Users className="h-4 w-4 text-stc-gold" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalTeams}</div>
                <p className="text-xs text-gray-400">Active franchises</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Games</CardTitle>
                <Calendar className="h-4 w-4 text-stc-gold" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalGames}</div>
                <p className="text-xs text-gray-400">
                  {stats.completedGames} completed, {stats.upcomingGames} upcoming
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Players</CardTitle>
                <Trophy className="h-4 w-4 text-stc-gold" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalPlayers}</div>
                <p className="text-xs text-gray-400">Across all teams</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
                <TrendingUp className="h-4 w-4 text-stc-gold" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.activeUsers}</div>
                <p className="text-xs text-gray-400">Website visitors</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-gray-400">Manage your league content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/admin/teams">
                    <Button className="w-full h-20 bg-stc-red hover:bg-stc-red/80 text-white flex flex-col items-center justify-center space-y-2">
                      <Users className="w-6 h-6" />
                      <span>Manage Teams</span>
                    </Button>
                  </Link>

                  <Link href="/admin/games">
                    <Button className="w-full h-20 bg-stc-gold hover:bg-stc-gold/80 text-black flex flex-col items-center justify-center space-y-2">
                      <Calendar className="w-6 h-6" />
                      <span>Manage Games</span>
                    </Button>
                  </Link>

                  <Button className="w-full h-20 bg-gray-700 hover:bg-gray-600 text-white flex flex-col items-center justify-center space-y-2">
                    <Trophy className="w-6 h-6" />
                    <span>Manage Players</span>
                  </Button>

                  <Button className="w-full h-20 bg-gray-700 hover:bg-gray-600 text-white flex flex-col items-center justify-center space-y-2">
                    <Settings className="w-6 h-6" />
                    <span>System Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">Latest system updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {activity.type === "game" && (
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {activity.type === "team" && (
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {activity.type === "player" && (
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white">{activity.description}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="w-3 h-3 text-gray-400 mr-1" />
                          <p className="text-xs text-gray-400">{activity.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
