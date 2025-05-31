"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Video, Heart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTheme } from "@/components/theme-provider"

export function MobileNav() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { theme } = useTheme()

  if (!isMobile) {
    return null
  }

  const navItems = [
    {
      name: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Search",
      href: "/dashboard/search",
      icon: Search,
    },
    {
      name: "Clips",
      href: "/dashboard/clips",
      icon: Video,
    },
    {
      name: "Activity",
      href: "/dashboard/notifications",
      icon: Heart,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ]

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t flex justify-around py-2",
        theme === "light" ? "bg-white border-gray-200" : "bg-zinc-900 border-zinc-800",
      )}
    >
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "flex flex-col items-center justify-center px-3 py-1 rounded-lg",
            pathname === item.href ? "text-primary" : theme === "light" ? "text-gray-600" : "text-white/70",
          )}
        >
          <item.icon className="h-6 w-6" />
          <span className="text-xs mt-1">{item.name}</span>
        </Link>
      ))}
    </div>
  )
}
