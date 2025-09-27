"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Trophy, Settings, Activity, LogOut } from "lucide-react"

export default function AdminDashboardClient() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("stc-admin-auth")
      if (auth === "authenticated") {
        setIsAuthenticated(true)
      } else {
        router.push("/admin")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("stc-admin-auth")
    router.push("/admin")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-yellow-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const stats = [
    { title: "Total Teams", value: "12", icon: Users },
    { title: "Games Played", value: "156", icon: Calendar },
    { title: "Active Players", value: "360", icon: Trophy },
    { title: "System Status", value: "Online", icon: Activity },
  ]

  const quickActions = [
    {
      title: "Manage Teams",
      description: "Edit team information, logos, and records",
      href: "/admin/teams",
      icon: Users,
    },
    {
      title: "Manage Games",
      description: "Update scores and game schedules",
      href: "/admin/games",
      icon: Calendar,
    },
    {
      title: "League Settings",
      description: "Configure league rules and settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  const recentActivity = [
    { action: "Updated game score", details: "Chiefs vs Raiders - 28-17", time: "2 hours ago" },
    { action: "Added new team", details: "Las Vegas Raiders", time: "1 day ago" },
    { action: "Updated standings", details: "Week 12 standings updated", time: "2 days ago" },
    { action: "Player trade", details: "QB moved to Colts", time: "3 days ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-yellow-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">Manage your STC League</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-red-600 border-red-500 text-white hover:bg-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-black/50 border-red-500/30 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-red-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="bg-black/50 border-red-500/30 backdrop-blur-sm hover:bg-black/70 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <action.icon className="h-6 w-6 text-red-400" />
                      <div>
                        <CardTitle className="text-white">{action.title}</CardTitle>
                        <CardDescription className="text-gray-400">{action.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link href={action.href}>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Open</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
            <Card className="bg-black/50 border-red-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">System Activity</CardTitle>
                <CardDescription className="text-gray-400">Latest updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-gray-400 text-sm">{activity.details}</p>
                      </div>
                      <span className="text-gray-500 text-xs">{activity.time}</span>
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
