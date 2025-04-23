"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { newsItems } from "@/lib/news-data"

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

export default function NewsPageClient() {
  const [isClient, setIsClient] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredNews, setFilteredNews] = useState([])

  useEffect(() => {
    setIsClient(true)

    if (activeCategory === "all") {
      setFilteredNews(newsItems)
    } else {
      setFilteredNews(newsItems.filter((item) => item.category === activeCategory))
    }
  }, [activeCategory])

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
        STC League News
      </motion.h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Button
          variant={activeCategory === "all" ? "default" : "outline"}
          onClick={() => setActiveCategory("all")}
          className={activeCategory === "all" ? "bg-black text-white" : ""}
        >
          All News
        </Button>
        <Button
          variant={activeCategory === "breaking" ? "default" : "outline"}
          onClick={() => setActiveCategory("breaking")}
          className={activeCategory === "breaking" ? "bg-[#CE1126] text-white" : ""}
        >
          Breaking News
        </Button>
        <Button
          variant={activeCategory === "player" ? "default" : "outline"}
          onClick={() => setActiveCategory("player")}
          className={activeCategory === "player" ? "bg-yellow-400 text-black" : ""}
        >
          Player Spotlight
        </Button>
        <Button
          variant={activeCategory === "team" ? "default" : "outline"}
          onClick={() => setActiveCategory("team")}
          className={activeCategory === "team" ? "bg-[#003B66] text-white" : ""}
        >
          Team Updates
        </Button>
        <Button
          variant={activeCategory === "event" ? "default" : "outline"}
          onClick={() => setActiveCategory("event")}
          className={activeCategory === "event" ? "bg-green-500 text-white" : ""}
        >
          Events
        </Button>
      </div>

      {/* News Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredNews.map((news) => (
          <motion.div
            key={news.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-lg"
            variants={itemVariants}
          >
            <div className="h-48 bg-gray-200 relative">
              <Image
                src={news.image || "/placeholder.svg?height=400&width=600"}
                alt={news.title}
                fill
                className="object-cover"
                unoptimized
              />
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
              <Link href={`/news/${news.slug.trim().toLowerCase()}`}>
                <Button className="bg-black hover:bg-gray-800 text-white">Read More</Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
