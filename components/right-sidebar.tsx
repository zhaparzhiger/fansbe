"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Users } from "lucide-react"

// Sample suggestions data
const suggestions = [
  {
    id: 1,
    name: "Natasha",
    username: "@naughty_natasha",
    avatar: "/beautiful-model-portrait.png",
    isVerified: true,
    followers: "12.5K",
    category: "Model",
  },
  {
    id: 2,
    name: "Isabella",
    username: "@bella_rose",
    avatar: "/red-haired-model-portrait.png",
    isVerified: true,
    followers: "8.2K",
    category: "Fitness",
  },
  {
    id: 3,
    name: "Victoria",
    username: "@victoria_secret",
    avatar: "/blonde-model-portrait.png",
    isVerified: false,
    followers: "5.1K",
    category: "Lifestyle",
  },
]

export function RightSidebar() {
  return (
    <div className="w-full space-y-3 md:space-y-4 lg:space-y-6 h-full">
      {/* User Profile Card */}
      <Card className="bg-card border-0">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center space-x-2 mb-3 md:mb-4">
            <Avatar className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12">
              <AvatarImage src="/diverse-avatars.png" alt="Your profile" />
              <AvatarFallback>KA</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm md:text-base">Kate</h3>
              <div className="flex space-x-2 md:space-x-4 text-[10px] md:text-xs lg:text-sm text-muted-foreground">
                <span>56 Fans</span>
                <span>105 Following</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Input placeholder="Search" className="bg-muted border-border pl-10 text-sm" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card className="bg-card border-0 flex-1">
        <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
          <CardTitle className="text-base sm:text-lg flex items-center">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4 flex-1">
          {suggestions.map((user) => (
            <div key={user.id} className="relative rounded-lg overflow-hidden">
              {/* Background image */}
              <div
                className="h-16 md:h-20 lg:h-24 bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${user.avatar})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* User info overlay */}
                <div className="absolute bottom-2 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 border-2 border-white">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <span className="text-white font-medium text-[10px] md:text-xs lg:text-sm">{user.name}</span>
                        {user.isVerified && (
                          <svg
                            className="h-3 w-3 ml-1 text-primary"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-white/80 text-xs">{user.username}</span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white rounded-md text-[10px] md:text-xs py-1 px-3 md:py-1.5 md:px-4 min-w-[60px]"
                  >
                    Follow
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-xs text-muted-foreground space-y-2 p-2 mt-auto">
        <div className="flex flex-wrap gap-2">
          <span>Privacy</span>
          <span>•</span>
          <span>Cookie Notice</span>
          <span>•</span>
          <span>Terms of Service</span>
        </div>
        <div>© {new Date().getFullYear()} Fansbe. All rights reserved.</div>
      </div>
    </div>
  )
}