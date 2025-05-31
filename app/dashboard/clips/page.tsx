"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, MessageSquare, Bookmark, DollarSign, Volume2, VolumeX } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

// Sample clips data
const clips = [
  {
    id: 1,
    userId: 1,
    username: "@olivia_star",
    userAvatar: "/beautiful-model-portrait-blue.png",
    isVerified: true,
    caption: "Beach day vibes 🌊 #summer #beach",
    videoUrl: "/generic-beach-scene.png",
    likes: 1245,
    comments: 87,
    isSubscribed: true,
  },
  {
    id: 2,
    userId: 2,
    username: "@sophia_night",
    userAvatar: "/elegant-model-portrait.png",
    isVerified: true,
    caption: "New dance routine! What do you think? 💃",
    videoUrl: "/model-dancing.png",
    likes: 2389,
    comments: 156,
    isSubscribed: true,
  },
  {
    id: 3,
    userId: 3,
    username: "@emma_style",
    userAvatar: "/stylish-model-portrait.png",
    isVerified: true,
    caption: "Morning workout routine 💪 #fitness #workout",
    videoUrl: "/model-workout.png",
    likes: 987,
    comments: 45,
    isSubscribed: false,
  },
]

export default function ClipsPage() {
  const [currentClipIndex, setCurrentClipIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const clipContainerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const currentClip = clips[currentClipIndex]

  const handleScroll = () => {
    if (!clipContainerRef.current) return

    const container = clipContainerRef.current
    const scrollPosition = container.scrollTop
    const clipHeight = container.clientHeight

    // Calculate which clip is currently in view
    const newIndex = Math.round(scrollPosition / clipHeight)
    if (newIndex !== currentClipIndex && newIndex >= 0 && newIndex < clips.length) {
      setCurrentClipIndex(newIndex)
    }
  }

  useEffect(() => {
    const container = clipContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [currentClipIndex])

  return (
    <div className={`fixed inset-0 ${theme === "light" ? "bg-gray-100" : "bg-black"}`}>
      <div ref={clipContainerRef} className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        {clips.map((clip, index) => (
          <div key={clip.id} className="h-full w-full snap-start snap-always relative flex items-center justify-center">
            {/* Video/Image placeholder (would be a video in a real app) */}
            <div className="relative w-full h-full max-w-md mx-auto">
              <img
                src={clip.videoUrl || "/placeholder.svg"}
                alt={`Clip by ${clip.username}`}
                className="w-full h-full object-cover rounded-lg"
                onContextMenu={(e) => e.preventDefault()}
              />

              {/* Play button overlay */}
              {index === currentClipIndex && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary/20 backdrop-blur-sm rounded-full p-4 opacity-0 hover:opacity-100 transition-opacity">
                    <svg
                      className="h-12 w-12 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Mute/Unmute button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-24 right-4 bg-primary/80 backdrop-blur-sm rounded-full p-2 text-white"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>

              {/* Clip info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-b-lg">
                <div className="flex items-start">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={clip.userAvatar || "/placeholder.svg"} alt={clip.username} />
                    <AvatarFallback>{clip.username.charAt(1)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium text-white">{clip.username}</span>
                      {clip.isVerified && (
                        <svg
                          className="h-4 w-4 ml-1 text-primary"
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
                    <p className="text-white/90 text-sm mt-1">{clip.caption}</p>
                  </div>
                </div>

                {/* Interaction buttons */}
                <div className="mt-4 flex justify-between">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-white/90 hover:text-white">
                      <Heart className="h-5 w-5" />
                      <span>{clip.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-white/90 hover:text-white">
                      <MessageSquare className="h-5 w-5" />
                      <span>{clip.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-white/90 hover:text-white">
                      <Bookmark className="h-5 w-5" />
                    </button>
                  </div>

                  <Button className="bg-primary hover:bg-primary/90 rounded-full px-4 py-2">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>Tip</span>
                  </Button>
                </div>
              </div>

              {/* Fansbe watermark */}
              <div className="absolute bottom-36 right-4 text-white/70 text-sm bg-primary/80 px-2 py-1 rounded-full backdrop-blur-sm">
                Fansbe.com/{clip.username}
              </div>

              {/* Locked content overlay for unsubscribed content */}
              {!clip.isSubscribed && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center rounded-lg">
                  <svg
                    className="h-12 w-12 text-white/50 mb-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <h3 className="text-white font-medium text-xl mb-2">Subscribe to view this clip</h3>
                  <p className="text-white/70 mb-6">
                    This content is only available for subscribers of {clip.username}
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 rounded-full px-6 py-2">
                    Subscribe for $3.15/month
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
