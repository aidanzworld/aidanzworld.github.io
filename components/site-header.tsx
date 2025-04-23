"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="bg-black text-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/stc-logo.png" alt="STC Logo" width={50} height={50} className="h-auto" />
            <span className="text-lg md:text-xl font-bold">SPORTS TALK CLUB SEASON 12</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-yellow-400 font-medium">
              Home
            </Link>
            <Link href="/news" className="text-white hover:text-yellow-400 font-medium">
              News
            </Link>
            <Link href="/teams" className="text-white hover:text-yellow-400 font-medium">
              Teams
            </Link>
            <Link href="/standings" className="text-white hover:text-yellow-400 font-medium">
              Standings
            </Link>
            <Link href="/stats" className="text-white hover:text-yellow-400 font-medium">
              Stats
            </Link>
            <Link href="/playoffs" className="text-white hover:text-yellow-400 font-medium">
              Playoffs
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden bg-transparent border-white text-white hover:bg-red-600 hover:text-white"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <nav className="flex flex-col space-y-4 py-4">
                <Link
                  href="/"
                  className="text-white hover:text-yellow-400 font-medium px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/news"
                  className="text-white hover:text-yellow-400 font-medium px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  News
                </Link>
                <Link
                  href="/teams"
                  className="text-white hover:text-yellow-400 font-medium px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Teams
                </Link>
                <Link
                  href="/standings"
                  className="text-white hover:text-yellow-400 font-medium px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Standings
                </Link>
                <Link
                  href="/stats"
                  className="text-white hover:text-yellow-400 font-medium px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Stats
                </Link>
                <Link
                  href="/playoffs"
                  className="text-white hover:text-yellow-400 font-medium px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Playoffs
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
