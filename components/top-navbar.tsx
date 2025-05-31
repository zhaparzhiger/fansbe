"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function TopNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme } = useTheme()

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-sm border-b ${theme === "light" ? "bg-white/90 border-gray-200" : "bg-zinc-900/90 border-zinc-800"}`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-primary">Fans</span>be
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-primary"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden border-b animate-slideIn ${theme === "light" ? "bg-white border-gray-200" : "bg-zinc-900 border-zinc-800"}`}
        >
          <div className="px-4 py-3">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search creators and content..."
                className={`${theme === "light" ? "bg-gray-100 border-gray-200" : "bg-zinc-800 border-zinc-700"} focus:border-primary pl-10`}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <nav className="px-4 py-2 space-y-1">
            {/* Mobile navigation links */}
            <Link
              href="/dashboard"
              className={`block px-3 py-2 rounded-md font-medium hover:bg-primary/10 hover:text-primary ${theme === "light" ? "text-gray-800" : "text-white"}`}
            >
              Home
            </Link>
            <Link
              href="/dashboard/notifications"
              className={`block px-3 py-2 rounded-md font-medium hover:bg-primary/10 hover:text-primary ${theme === "light" ? "text-gray-800" : "text-white"}`}
            >
              Notifications
            </Link>
            <Link
              href="/dashboard/messages"
              className={`block px-3 py-2 rounded-md font-medium hover:bg-primary/10 hover:text-primary ${theme === "light" ? "text-gray-800" : "text-white"}`}
            >
              Messages
            </Link>
            <Link
              href="/dashboard/profile"
              className={`block px-3 py-2 rounded-md font-medium hover:bg-primary/10 hover:text-primary ${theme === "light" ? "text-gray-800" : "text-white"}`}
            >
              Profile
            </Link>
            <Link
              href="/dashboard/settings"
              className={`block px-3 py-2 rounded-md font-medium hover:bg-primary/10 hover:text-primary ${theme === "light" ? "text-gray-800" : "text-white"}`}
            >
              Settings
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
