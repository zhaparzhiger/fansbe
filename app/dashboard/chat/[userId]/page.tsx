"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, ImageIcon, Smile, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

// Sample user data
const users = [
  {
    id: "1",
    name: "Olivia",
    username: "@olivia_star",
    avatar: "/beautiful-model-portrait-blue.png",
    isVerified: true,
    isOnline: true,
    isSubscribed: true,
  },
  {
    id: "2",
    name: "Sophia",
    username: "@sophia_night",
    avatar: "/elegant-model-portrait.png",
    isVerified: true,
    isOnline: false,
    isSubscribed: true,
  },
  {
    id: "3",
    name: "Emma",
    username: "@emma_style",
    avatar: "/stylish-model-portrait.png",
    isVerified: true,
    isOnline: true,
    isSubscribed: true,
  },
  {
    id: "4",
    name: "Natasha",
    username: "@natasha_glam",
    avatar: "/beautiful-model-portrait.png",
    isVerified: true,
    isOnline: false,
    isSubscribed: false,
  },
]

// Sample messages
const sampleMessages = [
  {
    id: 1,
    senderId: "1", // Olivia
    text: "Hey there! Thanks for subscribing to my content! 💖",
    timestamp: "2 days ago",
    isRead: true,
  },
  {
    id: 2,
    senderId: "current_user", // Current user
    text: "Happy to support your content! Your latest post was amazing!",
    timestamp: "2 days ago",
    isRead: true,
  },
  {
    id: 3,
    senderId: "1", // Olivia
    text: "Thank you so much! I really appreciate that. I'm working on some new content that I think you'll love!",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: 4,
    senderId: "current_user", // Current user
    text: "Can't wait to see it! When will you post it?",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: 5,
    senderId: "1", // Olivia
    text: "I'm planning to post it tomorrow! It's a special photoshoot I did last weekend.",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: 6,
    senderId: "1", // Olivia
    text: "Here's a sneak peek:",
    timestamp: "1 day ago",
    isRead: true,
    image: "/model-photoshoot-preview.png",
  },
  {
    id: 7,
    senderId: "current_user", // Current user
    text: "Wow, that looks amazing! 🔥",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: 8,
    senderId: "1", // Olivia
    text: "Thank you for the tip! You're so generous! 💕",
    timestamp: "5 hours ago",
    isRead: true,
    tip: "$5.00",
  },
  {
    id: 9,
    senderId: "current_user", // Current user
    text: "You deserve it! Your content is always top quality.",
    timestamp: "5 hours ago",
    isRead: true,
  },
  {
    id: 10,
    senderId: "1", // Olivia
    text: "Thank you! Let me know if there's anything specific you'd like to see in my future content!",
    timestamp: "2 min ago",
    isRead: true,
  },
]

export default function ChatPage({ params }: { params: { userId: string } }) {
  const router = useRouter()
  const { userId } = params
  const [user, setUser] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [messageText, setMessageText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    // Find the user based on userId
    const foundUser = users.find((u) => u.id === userId)
    if (foundUser) {
      setUser(foundUser)

      // Load messages for this user
      // In a real app, you would fetch messages from an API
      setMessages(sampleMessages)
    }
  }, [userId])

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    const newMessage = {
      id: messages.length + 1,
      senderId: "current_user",
      text: messageText,
      timestamp: "Just now",
      isRead: false,
    }

    setMessages([...messages, newMessage])
    setMessageText("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Chat Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex items-center p-4 border-b ${theme === "light" ? "bg-white border-gray-200" : "bg-zinc-800 border-zinc-700"}`}
      >
        <Button variant="ghost" size="icon" className="mr-2 text-primary" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <span className="font-medium">{user.name}</span>
            {user.isVerified && (
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
          <div className="text-xs text-muted-foreground flex items-center">
            {user.username}
            {user.isOnline && (
              <span className="ml-2 flex items-center text-green-500">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                Online
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 mt-16 mb-16">
        {user.isSubscribed ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex", message.senderId === "current_user" ? "justify-end" : "justify-start")}
            >
              <div className="flex items-end space-x-2">
                {message.senderId !== "current_user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl p-3",
                    message.senderId === "current_user"
                      ? "bg-primary text-white rounded-br-none"
                      : `${theme === "light" ? "bg-gray-100 text-gray-800" : "bg-zinc-700 text-white"} rounded-bl-none`,
                  )}
                >
                  {message.text && <p>{message.text}</p>}

                  {message.image && (
                    <div className="mt-2 rounded-md overflow-hidden">
                      <img
                        src={message.image || "/placeholder.svg"}
                        alt="Shared image"
                        className="max-h-60 object-cover rounded-md"
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  )}

                  {message.tip && (
                    <div className="mt-2 bg-green-500/20 text-green-400 rounded-md p-2 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>Tipped {message.tip}</span>
                    </div>
                  )}

                  <div className="mt-1 text-xs opacity-70 text-right">{message.timestamp}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div
              className={`${theme === "light" ? "bg-white border-gray-200" : "bg-zinc-800 border-zinc-700"} border rounded-xl p-6 text-center max-w-md`}
            >
              <Avatar className="h-16 w-16 mx-auto mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-medium mb-2">Subscribe to message {user.name}</h3>
              <p className="text-muted-foreground mb-4">
                You need to be a subscriber to send messages to this creator.
              </p>
              <Button className="bg-primary hover:bg-primary/90 rounded-full w-full">Subscribe for $3.15/month</Button>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      {user.isSubscribed && (
        <div
          className={`fixed bottom-0 left-0 right-0 p-4 border-t ${theme === "light" ? "bg-white border-gray-200" : "bg-zinc-800 border-zinc-700"}`}
        >
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-primary">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary">
              <Smile className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`${theme === "light" ? "bg-gray-100 border-gray-200" : "bg-zinc-700 border-zinc-600"} focus:border-primary`}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="bg-primary hover:bg-primary/90 rounded-full"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
