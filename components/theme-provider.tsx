"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeProviderState {
  theme: Theme
  primaryColor: string
  setTheme: (theme: Theme) => void
  setPrimaryColor: (color: string) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  primaryColor: "#0088CC",
  setTheme: () => null,
  setPrimaryColor: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultTheme = "dark", storageKey = "theme", ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [primaryColor, setPrimaryColor] = useState("#0088CC")

  // Initialize theme from localStorage only on client-side
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [storageKey])

  useEffect(() => {
    const root = window.document.documentElement

    // Remove both classes first
    root.classList.remove("light-theme", "dark-theme")

    // Add the appropriate class based on theme
    root.classList.add(`${theme}-theme`)

    // Store the theme preference
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  // Apply primary color to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primaryColor)

    // Generate lighter and darker variants
    const lighterColor = adjustColor(primaryColor, 20)
    const darkerColor = adjustColor(primaryColor, -20)

    document.documentElement.style.setProperty("--primary-light", lighterColor)
    document.documentElement.style.setProperty("--primary-dark", darkerColor)
  }, [primaryColor])

  const value = {
    theme,
    primaryColor,
    setTheme: (theme: Theme) => {
      setTheme(theme)
    },
    setPrimaryColor,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  // Remove # if present
  color = color.replace(/^#/, "")

  // Parse the color
  let r = Number.parseInt(color.substring(0, 2), 16)
  let g = Number.parseInt(color.substring(2, 4), 16)
  let b = Number.parseInt(color.substring(4, 6), 16)

  // Adjust each channel
  r = Math.max(0, Math.min(255, r + amount))
  g = Math.max(0, Math.min(255, g + amount))
  b = Math.max(0, Math.min(255, b + amount))

  // Convert back to hex
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
