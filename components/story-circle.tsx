"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, DollarSign, X, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface StoryCircleProps {
  userId: string
  username: string
  avatar: string
  isVerified: boolean
  hasUnseenStories: boolean
  isSubscribed: boolean
}

export function StoryCircle({
  userId,
  username,
  avatar,
  isVerified,
  hasUnseenStories,
  isSubscribed,
}: StoryCircleProps) {
  const [isStoryOpen, setIsStoryOpen] = useState(false)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const isMobile = useIsMobile()

  // Mock stories data - in a real app, this would come from an API
  const stories = [
    {
      id: 1,
      type: "image",
      url: "/model-story-portrait.png",
      timestamp: "2h",
    },
    {
      id: 2,
      type: "video",
      url: "/model-story-beach.png",
      timestamp: "5h",
    },
  ]

  const openStory = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering parent click handlers
    if (!isSubscribed) return
    setIsStoryOpen(true)
    setCurrentStoryIndex(0)
  }

  const closeStory = () => {
    setIsStoryOpen(false)
  }

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1)
      setProgress(0)
    } else {
      closeStory()
    }
  }

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1)
      setProgress(0)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <button
          onClick={openStory}
          className={cn(
            "relative rounded-full p-[2px]",
            hasUnseenStories
              ? isSubscribed
                ? "bg-gradient-to-tr from-primary to-purple-500"
                : "bg-gradient-to-tr from-gray-500 to-gray-400"
              : "bg-muted",
          )}
        >
          <div className="bg-background rounded-full p-[1px]">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={username} />
              <AvatarFallback>{username.charAt(1)}</AvatarFallback>
            </Avatar>
          </div>
          {!isSubscribed && (
            <div className="absolute bottom-0 right-0 bg-card rounded-full p-1 border-2 border-background">
              <Lock className="h-3 w-3 text-foreground" />
            </div>
          )}
        </button>
        <span className="text-xs mt-1 truncate w-16 text-center">{username}</span>
      </div>

      {/* Story viewer dialog */}
      <Dialog open={isStoryOpen} onOpenChange={setIsStoryOpen}>
        <DialogContent className="max-w-md p-0 h-[80vh] max-h-[600px] border-none bg-transparent shadow-none">
          <div className="relative h-full rounded-lg overflow-hidden bg-card">
            {/* Progress bars */}
            <div className="absolute top-0 left-0 right-0 z-10 px-2 pt-2 flex space-x-1">
              {stories.map((_, index) => (
                <div key={index} className="h-1 bg-foreground/30 rounded-full flex-1">
                  {index === currentStoryIndex && (
                    <div
                      className="h-full bg-foreground rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                  {index < currentStoryIndex && <div className="h-full bg-foreground rounded-full w-full" />}
                </div>
              ))}
            </div>

            {/* Story header */}
            <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatar || "/placeholder.svg"} alt={username} />
                  <AvatarFallback>{username.charAt(1)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-foreground">{username}</span>
                    {isVerified && (
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
                  <div className="text-xs text-muted-foreground">{stories[currentStoryIndex].timestamp}</div>
                </div>
              </div>

              <button onClick={closeStory} className="text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Story content */}
            <div className="h-full w-full">
              {stories[currentStoryIndex].type === "image" ? (
                <img
                  src={stories[currentStoryIndex].url || "/placeholder.svg"}
                  alt="Story content"
                  className="h-full w-full object-cover"
                  onContextMenu={(e) => e.preventDefault()}
                />
              ) : (
                <div className="relative h-full w-full">
                  <img
                    src={stories[currentStoryIndex].url || "/placeholder.svg"}
                    alt="Video thumbnail"
                    className="h-full w-full object-cover"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-foreground/10 backdrop-blur-sm rounded-full p-3">
                      <svg
                        className="h-8 w-8 text-foreground"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation overlay */}
            <div className="absolute inset-0 flex">
              <div className="flex-1" onClick={prevStory} />
              <div className="flex-1" onClick={nextStory} />
            </div>

            {/* Story footer */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 flex items-center justify-between">
              <div className="flex space-x-4">
                <button className="bg-foreground/10 backdrop-blur-sm rounded-full p-2 text-foreground">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="bg-foreground/10 backdrop-blur-sm rounded-full p-2 text-foreground">
                  <MessageSquare className="h-5 w-5" />
                </button>
              </div>

              <Button className="bg-primary hover:bg-primary/90 rounded-full px-4 py-2">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>Send Tip</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
