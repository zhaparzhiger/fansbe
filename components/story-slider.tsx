"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Heart, MessageSquare, DollarSign, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Story {
  id: number
  modelId: number
  mediaUrl: string
  mediaType: "image" | "video"
  timestamp: string
  expires: boolean
  expiresAt?: string
}

interface Model {
  id: number
  name: string
  username: string
  avatar: string
  verified: boolean
  isSubscribed: boolean
  stories: Story[]
}

interface StorySliderProps {
  models: Model[]
}

export function StorySlider({ models }: StorySliderProps) {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  // Clear interval when component unmounts
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [])

  const openStory = (model: Model) => {
    setSelectedModel(model)
    setCurrentStoryIndex(0)
    setProgress(0)

    // Start progress timer
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next story
          const nextIndex = currentStoryIndex + 1
          if (nextIndex < model.stories.length) {
            setCurrentStoryIndex(nextIndex)
            return 0
          } else {
            // Close story if it's the last one
            clearInterval(progressInterval.current as NodeJS.Timeout)
            setSelectedModel(null)
            return 0
          }
        }
        return prev + 1
      })
    }, 50) // Complete in 5 seconds (100 * 50ms)
  }

  const closeStory = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }
    setSelectedModel(null)
  }

  const nextStory = () => {
    if (!selectedModel) return

    if (currentStoryIndex < selectedModel.stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1)
      setProgress(0)
    } else {
      closeStory()
    }
  }

  const prevStory = () => {
    if (!selectedModel) return

    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1)
      setProgress(0)
    }
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Stories</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {models.map((model) => (
            <div key={model.id} className="flex flex-col items-center">
              <button
                onClick={() => openStory(model)}
                className={cn(
                  "relative rounded-full p-0.5",
                  model.stories.length > 0 && "bg-gradient-to-tr from-primary to-purple-500",
                )}
              >
                <div className="bg-zinc-900 rounded-full p-0.5">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={model.avatar || "/placeholder.svg"} alt={model.name} />
                    <AvatarFallback>{model.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                {!model.isSubscribed && (
                  <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                )}
              </button>
              <span className="text-sm mt-1 truncate max-w-[76px]">{model.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Story dialog */}
      <Dialog open={!!selectedModel} onOpenChange={() => closeStory()}>
        <DialogContent className="max-w-md p-0 h-[80vh] sm:h-[600px] border-none bg-transparent shadow-none">
          {selectedModel && selectedModel.stories.length > 0 && (
            <div className="relative h-full rounded-lg overflow-hidden bg-zinc-900">
              {/* Progress bars */}
              <div className="absolute top-0 left-0 right-0 z-10 px-2 pt-2 flex space-x-1">
                {selectedModel.stories.map((_, index) => (
                  <div key={index} className="h-1 bg-white/30 rounded-full flex-1">
                    {index === currentStoryIndex && (
                      <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
                    )}
                    {index < currentStoryIndex && <div className="h-full bg-white rounded-full w-full" />}
                  </div>
                ))}
              </div>

              {/* Story header */}
              <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-6 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedModel.avatar || "/placeholder.svg"} alt={selectedModel.name} />
                    <AvatarFallback>{selectedModel.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-white">{selectedModel.name}</span>
                      {selectedModel.verified && (
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
                    <div className="text-xs text-white/60">{selectedModel.stories[currentStoryIndex].timestamp}</div>
                  </div>
                </div>

                <button onClick={closeStory} className="text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Story content */}
              <div className="h-full w-full">
                {selectedModel.stories[currentStoryIndex].mediaType === "image" ? (
                  <img
                    src={selectedModel.stories[currentStoryIndex].mediaUrl || "/placeholder.svg"}
                    alt="Story content"
                    className="h-full w-full object-cover"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                ) : (
                  <div className="relative h-full w-full">
                    <img
                      src={selectedModel.stories[currentStoryIndex].mediaUrl || "/placeholder.svg"}
                      alt="Video thumbnail"
                      className="h-full w-full object-cover"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
                        <svg
                          className="h-8 w-8 text-white"
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
                  <button className="bg-white/10 backdrop-blur-sm rounded-full p-2 text-white">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="bg-white/10 backdrop-blur-sm rounded-full p-2 text-white">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>

                <button className="bg-primary/90 backdrop-blur-sm rounded-full px-4 py-2 text-white flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>Send Tip</span>
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  )
}
