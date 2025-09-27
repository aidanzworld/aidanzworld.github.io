"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Trophy, Settings, LogOut, Activity, TrendingUp } from "lucide-react"

export default function AdminDashboardClient() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("stc-admin-auth") === "true"
      if (!isLoggedIn) {
        router.push("/admin")
        return
      }
      setIsAuthenticated(true)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("stc-admin-auth")
    router.push("/admin")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-yellow-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const stats = [
    { title: "Total Teams", value: "12", icon: Users, change: "+0%" },
    { title: "Games Played", value: "156", icon: Calendar, change: "+12%" },
    { title: "Active Players", value: "360", icon: Trophy, change: "+5%" },
    { title: "System Status", value: "Online", icon: Activity, change: "99.9%" },
  ]

  const quickActions = [
    { title: "Manage Teams", description: "Edit team info, logos, and records", href: "/admin/teams", icon: Users },
    { title: "Manage Games", description: "Update scores and schedules", href: "/admin/games", icon: Calendar },
    { title: "View Stats", description: "League statistics and analytics", href: "/stats", icon: TrendingUp },
    { title: "Settings", description: "System configuration", href: "#", icon: Settings },
  ]

  const recentActivity = [
    { action: "Game score updated", details: "Chiefs vs Raiders - Final: 28-17", time: "2 hours ago" },
    { action: "Team record updated", details: "Colts record changed to 8-4", time: "4 hours ago" },
    { action: "New game scheduled", details: "Week 14: Dolphins vs Saints", time: "6 hours ago" },
    { action: "Player stats updated", details: "Justin Fields passing yards", time: "1 day ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-yellow-900">
      {/* Header */}
      <div className="border-b border-red-800/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-red-300">Sports Talk Club Management</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-black/40 border-red-800/30 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-300">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-green-400">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card className="bg-black/40 border-red-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-red-300">Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-red-950/30 hover:bg-red-950/50 transition-colors cursor-pointer"
                  onClick={() => router.push(action.href)}
                >
                  <action.icon className="h-8 w-8 text-yellow-400" />
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{action.title}</h3>
                    <p className="text-sm text-red-300">{action.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-black/40 border-red-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-red-300">Latest system updates and changes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{activity.action}</p>
                    <p className="text-xs text-red-300">{activity.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="mt-8 bg-black/40 border-red-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">System Status</CardTitle>
            <CardDescription className="text-red-300">Current system health and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-green-500 text-green-400">
                  Online
                </Badge>
                <span className="text-white">Database</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-green-500 text-green-400">
                  Online
                </Badge>
                <span className="text-white">API Services</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-green-500 text-green-400">
                  Online
                </Badge>
                <span className="text-white">File Storage</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
