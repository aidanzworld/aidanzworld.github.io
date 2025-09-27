"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { newsArticles } from "@/lib/news-data"

const categories = ["All", "Breaking", "Game Recap", "Player News", "League News", "Analysis"]

export default function NewsPageClient() {
  const [isClient, setIsClient] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    setIsClient(true)
  }, [])

  const filteredArticles =
    selectedCategory === "All" ? newsArticles : newsArticles.filter((article) => article.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Breaking":
        return "bg-red-100 text-red-800"
      case "Game Recap":
        return "bg-green-100 text-green-800"
      case "Player News":
        return "bg-blue-100 text-blue-800"
      case "League News":
        return "bg-purple-100 text-purple-800"
      case "Analysis":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!isClient) {
    return null
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
            STC League News
          </h1>
          <p className="text-lg text-gray-600 mb-6">Stay updated with the latest from Season 14</p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={
                  selectedCategory === category
                    ? "bg-stc-red text-white hover:bg-stc-red/90"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white border-gray-200 shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={filteredArticles[0].image || "/placeholder.svg"}
                      alt={filteredArticles[0].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getCategoryColor(filteredArticles[0].category)}>
                        {filteredArticles[0].category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-bold text-black mb-2">{filteredArticles[0].title}</CardTitle>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {filteredArticles[0].excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{filteredArticles[0].author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{filteredArticles[0].date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{filteredArticles[0].readTime}</span>
                      </div>
                    </div>
                    <Link href={`/news/${filteredArticles[0].slug}`}>
                      <Button className="bg-stc-red hover:bg-stc-red/90 text-white">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Articles Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredArticles.slice(1).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getCategoryColor(article.category)}>{article.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-black line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-3">{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <Link href={`/news/${article.slug}`}>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredArticles.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-500">
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p>Try selecting a different category to see more news.</p>
            </div>
          </motion.div>
        )}

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-stc-red to-stc-gold p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
            <p className="text-white/90 mb-4">Follow STC League for the latest news, scores, and updates</p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-stc-red bg-transparent"
              >
                Subscribe to Newsletter
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-stc-red bg-transparent"
              >
                Follow on Social
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
