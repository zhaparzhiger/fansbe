"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Globe, MessageCircle, ToggleLeft } from "lucide-react"
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
      <div className="flex items-center justify-end w-full text-sm gap-4">
        <div className="flex items-center space-x-4 mr-[100px]">
          {/* Copyright */}
          <div className="flex items-center whitespace-nowrap">
          <span className="text-white/60 text-[12px] whitespace-nowrap mr-[5px]">©2025 Fansbe</span> <span className="text-white/60 text-[9px] mx-1">•</span>
          </div>
          {/* About Dropdown */}
          <div className="relative right-[10px]">
            <button
              className="text-white/70 hover:text-white flex items-center space-x-1 text-xs"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <span>About</span>
              {aboutOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>

            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full mb-2 right-[-255px] bg-zinc-800 rounded-lg shadow-xl p-3 w-[420px] z-50"
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={() => setAboutOpen(false)}
                >
                  <div className="grid grid-cols-2 gap-1 mb-3">
                    {aboutMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-2 py-1.5 rounded hover:bg-zinc-700 text-white/80 hover:text-white transition-colors text-xs"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Company Address */}
                  <div className="border-t border-zinc-700 pt-2 mt-2">
                    <p className="text-white/60 text-[10px] text-center whitespace-nowrap overflow-hidden text-ellipsis">
                      RM 511, 5/F, MING SANG IND BLDG, 19-21 HING YIP STREET, KWUN TONG HONG KONG
                    </p>
                  </div>

                  <div className="absolute top-full right-[84px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-zinc-800"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button
            className="text-white/70 hover:text-white flex items-center"
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

        {/* X (Twitter) Icon */}
        <Link href="https://twitter.com" className="text-white/70 hover:text-white transition-colors">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Link>

        {/* Instagram Icon */}
        <Link href="https://instagram.com" className="text-white/70 hover:text-white transition-colors">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </Link>

        {/* Contact Icon */}
        <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
          <MessageCircle className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <footer className="bg-zinc-900/90 border-t border-zinc-800 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Language Selector */}
          <div className="relative">
               {/* Theme Switcher Icon */}
        
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
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-800 rounded-lg shadow-xl p-3 w-[420px] z-50"
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={() => setAboutOpen(false)}
                >
                  <div className="grid grid-cols-2 gap-1 mb-3">
                    {aboutMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-2 py-1.5 rounded hover:bg-zinc-700 text-white/80 hover:text-white transition-colors text-xs"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Company Address */}
                  <div className="border-t border-zinc-700 pt-2 mt-2">
                    <p className="text-white/60 text-[10px] text-center whitespace-nowrap overflow-hidden text-ellipsis">
                      RM 511, 5/F, MING SANG IND BLDG, 19-21 HING YIP STREET, KWUN TONG HONG KONG
                    </p>
                  </div>

                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-zinc-800"></div>
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
