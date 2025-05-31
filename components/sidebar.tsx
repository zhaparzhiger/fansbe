"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Bell, MessageSquare, Bookmark, Users, CreditCard, User, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTheme } from "@/components/theme-provider"
import Image from "next/image"

const navigationItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare, badge: 5 },
  { name: "Collections", href: "/dashboard/collections", icon: Bookmark },
  { name: "Subscriptions", href: "/dashboard/subscriptions", icon: Users },
  { name: "Add Card", href: "/dashboard/payment", icon: CreditCard },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { theme } = useTheme()

  // Don't render the sidebar on mobile
  if (isMobile) {
    return null
  }

  return (
    <div className={cn("flex-shrink-0 hidden md:block relative bottom-10 left-0", theme === "light" ? "bg-transparent" : "bg-transparent")}>
          <div className="">
                  <Image src="/fanlogo.svg" alt="Logo" width={200} height={200} />
                </div>
      {/* Адаптивная ширина сайдбара */}
      <div className="w-[15vw] min-w-[180px] max-w-[220px] sticky top-16">
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg transition-colors relative group",
                "px-3 py-3 lg:px-3 lg:py-3", // Одинаковые отступы
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : theme === "light"
                    ? "text-gray-700 hover:text-primary hover:bg-primary/5"
                    : "text-white/70 hover:text-primary hover:bg-primary/10",
              )}
              title={item.name} // Показываем название в тултипе на узких экранах
            >
              <item.icon
                className={cn(
                  "flex-shrink-0 h-5 w-5",
                  pathname === item.href ? "text-primary" : theme === "light" ? "text-gray-700" : "text-white/70",
                )}
              />
              <span className="ml-3 text-xs md:text-sm font-medium truncate">{item.name}</span>
              {item.badge && (
                <span className="ml-auto inline-flex items-center justify-center h-4 w-4 md:h-5 md:w-5 rounded-full bg-primary text-[10px] md:text-xs font-medium text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          <Button className="w-full bg-primary hover:bg-primary/90 rounded-full text-xs md:text-sm" asChild>
            <Link href="/dashboard/new-post">
              <Plus className="h-4 w-4 mr-1 md:mr-2" />
              <span>New Post</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
