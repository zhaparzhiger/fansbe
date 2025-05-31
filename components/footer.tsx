"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Globe, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FooterProps {
  variant?: "default" | "login"
}

export default function Footer({ variant = "default" }: FooterProps) {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)

  const aboutMenuItems = [
    { name: "Help", href: "/help" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Branding", href: "/branding" },
    { name: "Store", href: "/store" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
    { name: "Complaints Policy", href: "/complaints" },
    { name: "Cookie Notice", href: "/cookie-notice" },
    { name: "DMCA", href: "/dmca" },
    { name: "USC 2257", href: "/usc-2257" },
    { name: "Contract between Fan and Creator", href: "/contract" },
    { name: "Fansbe Safety & Transparency Center", href: "/safety" },
    { name: "Anti-Slavery and Anti-Trafficking Statement", href: "/anti-trafficking" },
    { name: "Acceptable Use Policy", href: "/acceptable-use" },
  ]

  const languages = [
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
    { code: "ja", name: "日本語" },
  ]

  if (variant === "login") {
    return (
      <footer className="absolute bottom-4 right-4 z-10">
        <div className="flex items-center space-x-4 text-sm">
          {/* Language Selector */}
          <div className="relative">
            <button
              className="text-white/70 hover:text-white flex items-center space-x-1"
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              <Globe className="h-4 w-4" />
            </button>

            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full mb-2 right-0 bg-zinc-800 rounded-lg shadow-xl p-2 min-w-[150px] z-50 max-h-60 overflow-y-auto"
                >
                  <div className="space-y-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="block w-full text-left px-3 py-2 rounded hover:bg-zinc-700 text-white/80 hover:text-white transition-colors text-sm"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                  <div className="absolute top-full right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-zinc-800"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Icon */}
          <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
            <MessageCircle className="h-4 w-4" />
          </Link>

          {/* About Dropdown */}
          <div className="relative">
            <button
              className="text-white/70 hover:text-white flex items-center space-x-1"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <span>About</span>
              {aboutOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full mb-2 right-0 bg-zinc-800 rounded-lg shadow-xl p-4 min-w-[280px] z-50 max-h-80 overflow-y-auto"
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={() => setAboutOpen(false)}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {aboutMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded hover:bg-zinc-700 text-white/80 hover:text-white transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="absolute top-full right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-zinc-800"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-zinc-900/90 border-t border-zinc-800 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Language Selector */}
          <div className="relative">
            <button
              className="text-white/70 hover:text-white flex items-center space-x-1"
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              <Globe className="h-4 w-4" />
              <span>Language</span>
            </button>

            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full mb-2 left-0 bg-zinc-800 rounded-lg shadow-xl p-2 min-w-[150px] z-50 max-h-60 overflow-y-auto"
                >
                  <div className="space-y-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="block w-full text-left px-3 py-2 rounded hover:bg-zinc-700 text-white/80 hover:text-white transition-colors text-sm"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                  <div className="absolute top-full left-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-zinc-800"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Link */}
          <Link
            href="/contact"
            className="text-white/70 hover:text-white transition-colors flex items-center space-x-1"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Contact</span>
          </Link>

          {/* About Dropdown */}
          <div className="relative">
            <button
              className="text-white/70 hover:text-white flex items-center space-x-1"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <span>About</span>
              {aboutOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full mb-2 left-0 bg-zinc-800 rounded-lg shadow-xl p-4 min-w-[320px] z-50 max-h-80 overflow-y-auto"
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={() => setAboutOpen(false)}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {aboutMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded hover:bg-zinc-700 text-white/80 hover:text-white transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="absolute top-full left-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-zinc-800"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
            Terms
          </Link>

          <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
            Privacy
          </Link>
        </div>

        <div className="text-white/60 text-sm mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} Fansbe. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
