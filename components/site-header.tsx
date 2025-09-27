"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Search, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-stc-gold font-semibold">SEASON 14</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-300">10 Teams</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-gray-300 hover:text-stc-gold transition-colors">
              <User className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-stc-red">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/images/stc-logo.png" alt="STC Logo" width={60} height={60} className="h-auto" priority />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-black">SPORTS TALK CLUB</h1>
                <p className="text-sm text-gray-600 font-medium">Season 14</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { href: "/", label: "HOME" },
                { href: "/news", label: "NEWS" },
                { href: "/teams", label: "TEAMS" },
                { href: "/standings", label: "STANDINGS" },
                { href: "/schedule", label: "SCHEDULE" },
                { href: "/stats", label: "STATS" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-black font-bold text-sm hover:text-stc-red transition-colors duration-200 relative group"
                >
                  {item.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-stc-red group-hover:w-full transition-all duration-200"></div>
                </Link>
              ))}
            </nav>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hidden md:flex text-black hover:text-stc-red">
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-black hover:text-stc-red"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-4 overflow-hidden"
              >
                <nav className="flex flex-col space-y-2 py-4 bg-gray-50 rounded-lg">
                  {[
                    { href: "/", label: "HOME" },
                    { href: "/news", label: "NEWS" },
                    { href: "/teams", label: "TEAMS" },
                    { href: "/standings", label: "STANDINGS" },
                    { href: "/schedule", label: "SCHEDULE" },
                    { href: "/stats", label: "STATS" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-black font-bold px-4 py-3 rounded-lg hover:bg-stc-red hover:text-white transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}
