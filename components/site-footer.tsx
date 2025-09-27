"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image src="/images/stc-logo.png" alt="STC Logo" width={50} height={50} className="h-auto" />
              <div>
                <h3 className="text-xl font-bold">SPORTS TALK CLUB</h3>
                <p className="text-stc-gold text-sm">Season 14</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              The premier football league featuring 10 competitive teams and the best players in the game. Experience
              the excitement of Season 14.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-stc-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-stc-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-stc-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-stc-gold transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-stc-gold">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/teams" className="text-gray-300 hover:text-white transition-colors">
                  Teams
                </Link>
              </li>
              <li>
                <Link href="/standings" className="text-gray-300 hover:text-white transition-colors">
                  Standings
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-gray-300 hover:text-white transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/stats" className="text-gray-300 hover:text-white transition-colors">
                  Stats
                </Link>
              </li>
            </ul>
          </div>

          {/* League Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-stc-gold">LEAGUE INFO</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Sports Talk Club. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">Season 14 • 10 Teams • Championship Excellence</p>
        </div>
      </div>
    </footer>
  )
}
