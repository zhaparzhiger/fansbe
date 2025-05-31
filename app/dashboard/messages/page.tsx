"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Send, ImageIcon, DollarSign, Smile } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

// Sample conversations data
const conversations = [
  {
    id: 1,
    user: {
      id: "1",
      name: "Olivia",
      username: "@olivia_star",
      avatar: "/beautiful-model-portrait-blue.png",
      isVerified: true,
      isOnline: true,
    },
    lastMessage: {
      text: "Thank you for subscribing! 💖",
      timestamp: "2 min ago",
      isRead: true,
    },
    isSubscribed: true,
  },
  {
    id: 2,
    user: {
      id: "2",
      name: "Sophia",
      username: "@sophia_night",
      avatar: "/elegant-model-portrait.png",
      isVerified: true,
      isOnline: false,
    },
    lastMessage: {
      text: "Check out my new post! 🔥",
      timestamp: "1 hour ago",
      isRead: false,
    },
    isSubscribed: true,
  },
  {
    id: 3,
    user: {
      id: "3",
      name: "Emma",
      username: "@emma_style",
      avatar: "/stylish-model-portrait.png",
      isVerified: true,
      isOnline: true,
    },
    lastMessage: {
      text: "Thanks for the tip! 💕",
      timestamp: "Yesterday",
      isRead: true,
    },
    isSubscribed: true,
  },
  {
    id: 4,
    user: {
      id: "4",
      name: "Natasha",
      username: "@natasha_glam",
      avatar: "/beautiful-model-portrait.png",
      isVerified: true,
      isOnline: false,
    },
    lastMessage: {
      text: "Subscribe to see my exclusive content",
      timestamp: "2 days ago",
      isRead: true,
    },
    isSubscribed: false,
  },
]

// Sample messages for a conversation
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

export default function MessagesPage() {
  const router = useRouter()
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState(sampleMessages)
  const isMobile = useIsMobile()

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    const newMessage = {
      id: messages.length + 1,
      senderId: "current_user", // Current user
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

  const handleConversationClick = (conversation: any) => {
    if (isMobile) {
      router.push(`/dashboard/chat/${conversation.user.id}`)
    } else {
      setSelectedConversation(conversation)
    }
  }

  return (
    <div className="container mx-auto max-w-6xl pt-16 pb-10 h-[calc(100vh-64px)]">
      <div className="flex flex-col md:flex-row h-full rounded-lg overflow-hidden">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 bg-card border-r border-border">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Input placeholder="Search messages..." className="bg-input border-border pl-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100%-73px)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors",
                  selectedConversation.id === conversation.id && "bg-muted",
                )}
                onClick={() => handleConversationClick(conversation)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
                      <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.user.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium truncate">{conversation.user.name}</span>
                        {conversation.user.isVerified && (
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
                      <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage.text}</p>
                      {!conversation.lastMessage.isRead && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area - Only show on desktop */}
        {!isMobile && (
          <div className="flex-1 flex flex-col bg-background">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={selectedConversation.user.avatar || "/placeholder.svg"}
                        alt={selectedConversation.user.name}
                      />
                      <AvatarFallback>{selectedConversation.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{selectedConversation.user.name}</span>
                        {selectedConversation.user.isVerified && (
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
                      <div className="text-sm text-muted-foreground">
                        {selectedConversation.user.username} •
                        {selectedConversation.user.isOnline ? (
                          <span className="text-green-500 ml-1">Online</span>
                        ) : (
                          <span className="ml-1">Offline</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {!selectedConversation.isSubscribed ? (
                    <div className="flex items-center justify-center h-full">
                      <Card className="bg-card border-border max-w-md">
                        <CardContent className="p-6 text-center">
                          <div className="mb-4">
                            <Avatar className="h-16 w-16 mx-auto">
                              <AvatarImage
                                src={selectedConversation.user.avatar || "/placeholder.svg"}
                                alt={selectedConversation.user.name}
                              />
                              <AvatarFallback>{selectedConversation.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <h3 className="text-lg font-medium mb-2">
                            Subscribe to message {selectedConversation.user.name}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            You need to be a subscriber to send messages to this creator.
                          </p>
                          <Button className="bg-primary hover:bg-primary/90 w-full">Subscribe for $3.15/month</Button>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn("flex", message.senderId === "current_user" ? "justify-end" : "justify-start")}
                      >
                        <div className="flex items-end space-x-2">
                          {message.senderId !== "current_user" && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={selectedConversation.user.avatar || "/placeholder.svg"}
                                alt={selectedConversation.user.name}
                              />
                              <AvatarFallback>{selectedConversation.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}

                          <div
                            className={cn(
                              "max-w-md rounded-lg p-3",
                              message.senderId === "current_user"
                                ? "bg-primary text-primary-foreground rounded-br-none"
                                : "bg-muted text-foreground rounded-bl-none",
                            )}
                          >
                            {message.text && <p>{message.text}</p>}

                            {message.image && (
                              <div className="mt-2 rounded-md overflow-hidden">
                                <img
                                  src={message.image || "/placeholder.svg"}
                                  alt="Shared image"
                                  className="max-h-60 object-cover"
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
                  )}
                </div>

                {/* Message Input */}
                {selectedConversation.isSubscribed && (
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <ImageIcon className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Smile className="h-5 w-5" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-input border-border"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
