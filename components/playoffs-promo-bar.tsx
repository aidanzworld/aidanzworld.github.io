"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function PlayoffsPromoBar() {
  return (
    <Link href="/playoffs" className="block">
      <motion.div
        className="bg-gradient-to-r from-purple-900 via-black to-purple-900 text-white py-3 relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative lights */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-2 left-[10%] w-1 h-1 bg-blue-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 5px 1px #3b82f6" }}
          ></div>
          <div
            className="absolute top-4 left-[30%] w-1 h-1 bg-red-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 5px 1px #ef4444" }}
          ></div>
          <div
            className="absolute top-2 left-[50%] w-1 h-1 bg-yellow-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 5px 1px #eab308" }}
          ></div>
          <div
            className="absolute top-4 left-[70%] w-1 h-1 bg-green-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 5px 1px #22c55e" }}
          ></div>
          <div
            className="absolute top-2 left-[90%] w-1 h-1 bg-pink-500 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 5px 1px #ec4899" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-yellow-400 mr-2 hidden sm:block" />
            <span
              className="font-bold text-sm sm:text-base"
              style={{
                color: "#eab308",
                textShadow: "0 0 5px #eab308, 0 0 10px #eab308",
              }}
            >
              SEASON 13 PLAYOFFS: COMING SOON
            </span>
            <Sparkles className="h-5 w-5 text-yellow-400 ml-2 hidden sm:block" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
