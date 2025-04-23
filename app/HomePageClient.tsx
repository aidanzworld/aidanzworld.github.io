"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trophy, Users, BarChart3 } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { getLatestNews } from "@/lib/news-data"
import { PlayoffsPromoBar } from "@/components/playoffs-promo-bar"

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

export default function HomePageClient() {
  const [isClient, setIsClient] = useState(false)
  const [latestNews, setLatestNews] = useState([])

  useEffect(() => {
    setIsClient(true)
    setLatestNews(getLatestNews(2))
  }, [])

  if (!isClient) {
    return null // Prevent SSR flash
  }

  return (
    <>
      <PlayoffsPromoBar />

      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-[#CE1126] to-[#CE1126] text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            The Sports Talk Club
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Season 12 - The premier football experience on Roblox
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <Link href="/teams">View Teams</Link>
            </Button>
            <Button variant="outline" className="border-white text-black hover:bg-white hover:text-[#CE1126]">
              <Link href="/playoffs" className="text-black hover:text-[#CE1126]">
                Playoff Picture
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-10 text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Featured Content
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg" variants={itemVariants}>
              <div className="h-48 bg-[#CE1126] flex items-center justify-center">
                <Trophy className="h-20 w-20 text-yellow-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-black">Playoff Picture</h3>
                <p className="text-gray-700 mb-4">Check out the remaining teams and their path to the STC Bowl.</p>
                <Button
                  variant="outline"
                  className="w-full border-[#CE1126] text-[#CE1126] hover:bg-[#CE1126] hover:text-white"
                >
                  <Link href="/playoffs">View Playoffs</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg" variants={itemVariants}>
              <div className="h-48 bg-black flex items-center justify-center">
                <BarChart3 className="h-20 w-20 text-yellow-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-black">League Leaders</h3>
                <p className="text-gray-700 mb-4">Explore the top performers in various statistical categories.</p>
                <Button
                  variant="outline"
                  className="w-full border-[#CE1126] text-[#CE1126] hover:bg-[#CE1126] hover:text-white"
                >
                  <Link href="/stats">View Stats</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg" variants={itemVariants}>
              <div className="h-48 bg-[#CE1126] flex items-center justify-center">
                <Users className="h-20 w-20 text-yellow-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-black">Conference Battles</h3>
                <p className="text-gray-700 mb-4">See which conference is dominating this season.</p>
                <Button
                  variant="outline"
                  className="w-full border-[#CE1126] text-[#CE1126] hover:bg-[#CE1126] hover:text-white"
                >
                  <Link href="/standings">View Standings</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-10 text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Quick Links
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Link
                href="/teams"
                className="bg-[#CE1126] text-white p-6 rounded-lg text-center hover:bg-red-700 transition duration-200 block"
              >
                <Users className="h-10 w-10 mx-auto mb-2" />
                <span className="font-bold">Teams</span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="/standings"
                className="bg-black text-white p-6 rounded-lg text-center hover:bg-gray-900 transition duration-200 block"
              >
                <BarChart3 className="h-10 w-10 mx-auto mb-2" />
                <span className="font-bold">Standings</span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="/stats"
                className="bg-yellow-400 text-black p-6 rounded-lg text-center hover:bg-yellow-500 transition duration-200 block"
              >
                <BarChart3 className="h-10 w-10 mx-auto mb-2" />
                <span className="font-bold">Stats</span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="/playoffs"
                className="bg-[#CE1126] text-white p-6 rounded-lg text-center hover:bg-red-900 transition duration-200 block"
              >
                <Trophy className="h-10 w-10 mx-auto mb-2" />
                <span className="font-bold">Playoffs</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-10 text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Latest League News
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {latestNews.map((news, index) => (
              <motion.div
                key={news.id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-lg"
                variants={itemVariants}
              >
                <div className="h-48 bg-gray-200 relative">
                  <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span
                      className={`inline-block ${
                        news.category === "breaking"
                          ? "bg-[#CE1126] text-white"
                          : news.category === "player"
                            ? "bg-yellow-400 text-black"
                            : news.category === "team"
                              ? "bg-[#003B66] text-white"
                              : "bg-green-500 text-white"
                      } px-3 py-1 text-sm font-semibold rounded-full mr-2`}
                    >
                      {news.category === "breaking"
                        ? "Breaking News"
                        : news.category === "player"
                          ? "Player Spotlight"
                          : news.category === "team"
                            ? "Team Update"
                            : "Event"}
                    </span>
                    <span className="text-sm text-gray-500">{news.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-black">{news.title}</h3>
                  <p className="text-gray-700 mb-4">{news.excerpt}</p>
                  <Link href={`/news/${news.slug}`}>
                    <Button className="bg-black hover:bg-gray-800 text-white">Read More</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-8">
            <Link href="/news">
              <Button variant="outline" className="border-[#CE1126] text-[#CE1126] hover:bg-[#CE1126] hover:text-white">
                View All News
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
