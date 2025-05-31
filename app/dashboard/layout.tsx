import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { MobileNav } from "@/components/mobile-nav"
import Image from "next/image"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="container mx-auto max-w-7xl px-1 sm:px-2 md:px-4 pt-16">
        <div className="flex gap-1 sm:gap-2 md:gap-4 lg:gap-6 items-start min-h-[calc(100vh-64px)]">
      
          <Sidebar />
          {/* Main content */}
          <main className="flex-1 min-w-0 pb-16 md:pb-0 overflow-hidden">{children}</main>
        </div>
      </div>
      <MobileNav />
    </div>
  )
}
