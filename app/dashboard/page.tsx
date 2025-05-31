"use client"

import { useEffect, useState, useRef } from "react"
import { Heart, MessageSquare, Bookmark, Lock, DollarSign, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { RightSidebar } from "@/components/right-sidebar"
import { useTheme } from "@/components/theme-provider"
import { useIsMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"

// Sample story data
const stories = [
  {
    id: 2,
    userId: "2",
    username: "sophia_night",
    userAvatar: "/elegant-model-portrait.png",
    isVerified: true,
    hasUnseenStories: true,
    isSubscribed: true,
  },
  {
    id: 3,
    userId: "3",
    username: "emma_style",
    userAvatar: "/stylish-model-portrait.png",
    isVerified: true,
    hasUnseenStories: false,
    isSubscribed: true,
  },
  {
    id: 4,
    userId: "4",
    username: "ava_dreams",
    userAvatar: "/moody-model-portrait.png",
    isVerified: true,
    hasUnseenStories: true,
    isSubscribed: false,
  },
  {
    id: 5,
    userId: "5",
    username: "mia_rose",
    userAvatar: "/red-haired-model-portrait.png",
    isVerified: true,
    hasUnseenStories: true,
    isSubscribed: true,
  },
  {
    id: 6,
    userId: "6",
    username: "lily_grace",
    userAvatar: "/blonde-model-portrait.png",
    isVerified: false,
    hasUnseenStories: true,
    isSubscribed: true,
  },
  {
    id: 7,
    userId: "7",
    username: "zoe_black",
    userAvatar: "/beautiful-dark-haired-model.png",
    isVerified: true,
    hasUnseenStories: true,
    isSubscribed: true,
  },
  {
    id: 8,
    userId: "8",
    username: "anna_belle",
    userAvatar: "/red-haired-model-portrait.png",
    isVerified: true,
    hasUnseenStories: true,
    isSubscribed: true,
  },
  {
    id: 9,
    userId: "9",
    username: "kate_model",
    userAvatar: "/blonde-model-portrait.png",
    isVerified: false,
    hasUnseenStories: true,
    isSubscribed: true,
  },
]

// Sample model data for the feed
const models = [
  {
    id: "1",
    name: "Olivia",
    username: "@olivia_star",
    avatar: "/beautiful-model-portrait-blue.png",
    verified: true,
    isSubscribed: true,
    posts: [
      {
        id: 101,
        content: "Happy Monday everyone! Just finished my morning workout 💪",
        media: "/fitness-model-workout.png",
        mediaType: "image",
        timestamp: "2 hours ago",
        likes: 245,
        comments: 32,
      },
      {
        id: 102,
        content: "Beach day! Perfect weather for a swim 🌊",
        media: "/model-beach-swimming.png",
        mediaType: "image",
        timestamp: "Yesterday",
        likes: 387,
        comments: 45,
      },
    ],
  },
  {
    id: "2",
    name: "Sophia",
    username: "@sophia_night",
    avatar: "/elegant-model-portrait.png",
    verified: true,
    isSubscribed: false,
    posts: [
      {
        id: 201,
        content: "New photoshoot coming soon! Can't wait to share the results with you 📸",
        locked: true,
        price: "$5",
        timestamp: "3 hours ago",
        likes: 156,
        comments: 18,
      },
    ],
  },
  {
    id: "3",
    name: "Emma",
    username: "@emma_style",
    avatar: "/stylish-model-portrait.png",
    verified: true,
    isSubscribed: true,
    posts: [
      {
        id: 301,
        content: "Just posted an exclusive video on my page 🔥 Check it out!",
        media: "/fashion-model-pose.png",
        mediaType: "video",
        timestamp: "5 hours ago",
        likes: 423,
        comments: 56,
      },
    ],
  },
  {
    id: "4",
    name: "Natasha",
    username: "@natasha_glam",
    avatar: "/beautiful-model-portrait.png",
    verified: true,
    isSubscribed: true,
    posts: [
      {
        id: 401,
        content: "New clip is up! Let me know what you think in the comments 💋",
        media: "/model-clip-thumbnail.png",
        mediaType: "clip",
        timestamp: "1 hour ago",
        likes: 512,
        comments: 78,
        views: 2340,
      },
    ],
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [feedPosts, setFeedPosts] = useState<any[]>([])
  const { theme } = useTheme()
  const isMobile = useIsMobile()
  const storiesRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    // Flatten the posts array from all models
    const posts = models.flatMap((model) =>
      model.posts.map((post) => ({
        ...post,
        model: {
          id: model.id,
          name: model.name,
          username: model.username,
          avatar: model.avatar,
          verified: model.verified,
          isSubscribed: model.isSubscribed,
        },
      })),
    )

    setFeedPosts(posts)
  }, [])

  const handleUserClick = (userId: string) => {
    router.push(`/dashboard/chat/${userId}`)
  }

  const scrollStories = (direction: "left" | "right") => {
    if (storiesRef.current) {
      const scrollAmount = 300
      const newScrollLeft = storiesRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount)
      storiesRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" })
    }
  }

  const handleStoriesScroll = () => {
    if (storiesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = storiesRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  // Проверяем возможность прокрутки при загрузке и изменении размера
  const checkScrollability = () => {
    if (storiesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = storiesRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollWidth > clientWidth)
    }
  }

  useEffect(() => {
    const storiesContainer = storiesRef.current
    if (storiesContainer) {
      storiesContainer.addEventListener("scroll", handleStoriesScroll)

      // Проверяем сразу после монтирования
      setTimeout(checkScrollability, 100)

      // Проверяем при изменении размера окна
      const handleResize = () => {
        setTimeout(checkScrollability, 100)
      }
      window.addEventListener("resize", handleResize)

      return () => {
        storiesContainer.removeEventListener("scroll", handleStoriesScroll)
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  // Дополнительная проверка после загрузки изображений
  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollability()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex gap-2 md:gap-4 lg:gap-6 w-full max-w-none">
      {/* Main Content Area */}
      <div className="flex-1 min-w-0 max-w-full">
        {/* Stories Section */}
        <div className="mb-6 relative">
          <div className="relative">
            <div
              ref={storiesRef}
              className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide scroll-smooth px-2"
              onScroll={handleStoriesScroll}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Your Story */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-blue-400 p-[2px]">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <span className="text-xs mt-1 text-muted-foreground">Your Story</span>
              </div>

              {/* Fansbe Official Story */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-blue-400 p-[2px]">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white font-bold text-lg">F</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1">
                    <svg
                      className="h-3 w-3 text-white"
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
                  </div>
                </div>
                <span className="text-xs mt-1 text-center font-medium">Fansbe</span>
              </div>

              {/* Other Stories with gradient */}
              {stories.map((story) => (
                <div key={story.id} className="flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-blue-400 p-[2px]">
                        <div className="w-full h-full rounded-full bg-background p-[1px]">
                          <Avatar className="h-full w-full">
                            <AvatarImage src={story.userAvatar || "/placeholder.svg"} alt={story.username} />
                            <AvatarFallback>{story.username.charAt(1)}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                      {!story.isSubscribed && (
                        <div className="absolute bottom-0 right-0 bg-card rounded-full p-1 border-2 border-background">
                          <Lock className="h-3 w-3 text-foreground" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs mt-1 truncate w-16 text-center">{story.username}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows - positioned in the middle of stories */}
            {!isMobile && canScrollLeft && (
              <button
                onClick={() => scrollStories("left")}
                className="absolute left-2 top-8 -translate-y-1/2 bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-border hover:bg-background transition-colors z-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {!isMobile && canScrollRight && (
              <button
                onClick={() => scrollStories("right")}
                className="absolute right-2 top-8 -translate-y-1/2 bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-border hover:bg-background transition-colors z-10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Feed posts */}
        <div className="space-y-0">
          {feedPosts.map((post, index) => (
            <div key={post.id}>
              {/* Post Content */}
              <div className="py-4 sm:py-6">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
                    onClick={() => handleUserClick(post.model.id)}
                  >
                    <Avatar>
                      <AvatarImage src={post.model.avatar || "/placeholder.svg"} alt={post.model.name} />
                      <AvatarFallback>{post.model.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{post.model.name}</span>
                        {post.model.verified && (
                          <svg
                            className="h-4 w-4 text-primary"
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
                        <span className="text-sm text-muted-foreground">• {post.timestamp}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{post.model.username}</div>
                    </div>
                  </div>
                  <button className="text-muted-foreground">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="5" cy="12" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="19" cy="12" r="2" />
                    </svg>
                  </button>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-foreground/90">{post.content}</p>
                </div>

                {/* Post Media */}
                {post.media && post.model.isSubscribed && (
                  <div className="mb-4 relative protected-content">
                    {post.mediaType === "image" ? (
                      <img
                        src={post.media || "/placeholder.svg"}
                        alt="Post content"
                        className="w-full h-auto object-cover max-h-[500px] rounded-md"
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    ) : post.mediaType === "video" ? (
                      <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                        <img
                          src={post.media || "/placeholder.svg"}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover"
                          onContextMenu={(e) => e.preventDefault()}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-primary/80 backdrop-blur-sm rounded-full p-4 hover:bg-primary transition-colors">
                            <svg
                              className="h-10 w-10 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-[9/16] bg-muted rounded-md overflow-hidden">
                        <img
                          src={post.media || "/placeholder.svg"}
                          alt="Clip thumbnail"
                          className="w-full h-full object-cover"
                          onContextMenu={(e) => e.preventDefault()}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-primary/80 backdrop-blur-sm rounded-full p-4 hover:bg-primary transition-colors">
                            <Play className="h-10 w-10 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Locked content */}
                {post.locked && (
                  <div className="mb-4 relative">
                    <div className="bg-muted rounded-lg h-48 flex flex-col items-center justify-center p-6 text-center">
                      <Lock className="h-10 w-10 text-foreground/50 mb-2" />
                      <h3 className="text-foreground font-medium text-lg">Subscribe to view this content</h3>
                      <p className="text-muted-foreground mb-4">This content is only available for subscribers</p>
                      <Button className="bg-primary hover:bg-primary/90 rounded-full">
                        Subscribe for {post.model.isSubscribed ? post.price : "$3.15/month"}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Post Footer */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors">
                      <div className="p-2 rounded-full border border-border hover:border-primary transition-colors">
                        <Heart className="h-4 w-4" />
                      </div>
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors">
                      <div className="p-2 rounded-full border border-border hover:border-primary transition-colors">
                        <Bookmark className="h-4 w-4" />
                      </div>
                    </button>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-border hover:border-primary"
                      onClick={() => handleUserClick(post.model.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full border-border hover:border-primary">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Tip
                    </Button>
                  </div>
                </div>
              </div>

              {/* Separator line between posts */}
              {index < feedPosts.length - 1 && <div className="border-b border-border"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - адаптивная ширина */}
{!isMobile && (
  <div className="w-[20vw] min-w-[180px] max-w-[280px] flex-shrink-0 hidden md:block">
    <div className="sticky top-0">
      <RightSidebar />
    </div>
  </div>
)}
    </div>
  )
}
