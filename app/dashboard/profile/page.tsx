"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Grid, List, Settings, Edit, ImageIcon, Video, Film, Lock, Users, UserPlus, UserMinus } from "lucide-react"

// Sample user data
const userData = {
  id: 1,
  name: "Olivia Star",
  username: "@olivia_star",
  avatar: "/beautiful-model-portrait-blue.png",
  coverImage: "/beach-sunset.png",
  bio: "Model | Content Creator | Fitness Enthusiast 💪\nSharing my life and exclusive content with my fans!",
  isVerified: true,
  stats: {
    posts: 346,
    followers: 12300,
    following: 105,
  },
  isModel: true,
}

// Sample posts data
const posts = [
  {
    id: 1,
    type: "image",
    thumbnail: "/fitness-model-workout.png",
    isLocked: false,
  },
  {
    id: 2,
    type: "video",
    thumbnail: "/model-beach.png",
    isLocked: true,
  },
  {
    id: 3,
    type: "image",
    thumbnail: "/fashion-model.png",
    isLocked: false,
  },
  {
    id: 4,
    type: "clip",
    thumbnail: "/model-dancing.png",
    isLocked: true,
  },
  {
    id: 5,
    type: "image",
    thumbnail: "/model-portrait.png",
    isLocked: false,
  },
  {
    id: 6,
    type: "video",
    thumbnail: "/model-workout.png",
    isLocked: true,
  },
]

// Sample subscribers data
const subscribers = [
  {
    id: 1,
    name: "John D.",
    username: "@john_d",
    avatar: "/male-avatar.png",
    subscriptionDate: "2 months ago",
  },
  {
    id: 2,
    name: "Sarah M.",
    username: "@sarah_m",
    avatar: "/diverse-female-avatar.png",
    subscriptionDate: "1 month ago",
  },
  {
    id: 3,
    name: "Mike T.",
    username: "@mike_t",
    avatar: "/male-avatar-2.png",
    subscriptionDate: "3 weeks ago",
  },
]

// Sample blocked users data
const blockedUsers = [
  {
    id: 101,
    name: "Troll User",
    username: "@troll123",
    avatar: "/anonymous-avatar.png",
    blockReason: "Harassment",
    blockDate: "2 weeks ago",
  },
]

export default function ProfilePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="w-full max-w-4xl mx-auto pt-16 pb-10">
      {/* Cover Image */}
      <div className="relative h-32 sm:h-48 md:h-64 rounded-lg overflow-hidden mb-16">
        <img
          src={userData.coverImage || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover"
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* Profile Avatar */}
        <div className="absolute -bottom-12 left-4">
          <div className="relative">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-background">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {userData.isVerified && (
              <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1">
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="absolute bottom-4 right-4">
          <Button variant="outline" size="sm" className="bg-card/80 backdrop-blur-sm border-border hover:bg-muted">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold flex items-center flex-wrap">
              {userData.name}
              {userData.isModel && (
                <Badge className="ml-2 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">Model</Badge>
              )}
            </h1>
            <p className="text-muted-foreground">{userData.username}</p>
          </div>

          <div className="flex space-x-2 sm:space-x-4 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="bg-card border-border hover:bg-muted">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Follow
            </Button>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <p className="text-foreground/80 whitespace-pre-line text-sm sm:text-base">{userData.bio}</p>
        </div>

        {/* Stats */}
        <div className="flex space-x-6 mb-8">
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold">{userData.stats.posts}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold">{userData.stats.followers.toLocaleString()}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold">{userData.stats.following}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Following</div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <TabsList className="bg-muted h-auto">
              <TabsTrigger value="posts" className="data-[state=active]:bg-card text-xs sm:text-sm">
                Posts
              </TabsTrigger>
              <TabsTrigger value="clips" className="data-[state=active]:bg-card text-xs sm:text-sm">
                Clips
              </TabsTrigger>
              <TabsTrigger value="subscribers" className="data-[state=active]:bg-card text-xs sm:text-sm">
                Subscribers
              </TabsTrigger>
              <TabsTrigger value="blocked" className="data-[state=active]:bg-card text-xs sm:text-sm">
                Blocked
              </TabsTrigger>
            </TabsList>

            <div className="flex space-x-2 self-end">
              <Button
                variant="outline"
                size="icon"
                className={`bg-card border-border hover:bg-muted ${
                  viewMode === "grid" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`bg-card border-border hover:bg-muted ${
                  viewMode === "list" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="posts">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {posts.map((post) => (
                  <div key={post.id} className="relative aspect-square rounded-md overflow-hidden group">
                    <img
                      src={post.thumbnail || "/placeholder.svg"}
                      alt={`Post ${post.id}`}
                      className="w-full h-full object-cover"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      {post.type === "image" && <ImageIcon className="h-6 w-6 text-white" />}
                      {post.type === "video" && <Video className="h-6 w-6 text-white" />}
                      {post.type === "clip" && <Film className="h-6 w-6 text-white" />}
                    </div>
                    {post.isLocked && (
                      <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
                        <Lock className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="bg-card border-border">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={post.thumbnail || "/placeholder.svg"}
                            alt={`Post ${post.id}`}
                            className="w-full h-full object-cover"
                            onContextMenu={(e) => e.preventDefault()}
                          />
                          {post.isLocked && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <Lock className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 flex-wrap">
                            <span className="font-medium">Post #{post.id}</span>
                            {post.type === "image" && (
                              <Badge variant="outline" className="bg-muted text-foreground border-border">
                                <ImageIcon className="h-3 w-3 mr-1" /> Image
                              </Badge>
                            )}
                            {post.type === "video" && (
                              <Badge variant="outline" className="bg-muted text-foreground border-border">
                                <Video className="h-3 w-3 mr-1" /> Video
                              </Badge>
                            )}
                            {post.type === "clip" && (
                              <Badge variant="outline" className="bg-muted text-foreground border-border">
                                <Film className="h-3 w-3 mr-1" /> Clip
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {post.isLocked ? "Premium content" : "Free content"}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-muted border-border hover:bg-muted/80">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="clips">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              {posts
                .filter((post) => post.type === "clip")
                .map((post) => (
                  <div key={post.id} className="relative aspect-[9/16] rounded-md overflow-hidden group">
                    <img
                      src={post.thumbnail || "/placeholder.svg"}
                      alt={`Clip ${post.id}`}
                      className="w-full h-full object-cover"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Film className="h-6 w-6 text-white" />
                    </div>
                    {post.isLocked && (
                      <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
                        <Lock className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="subscribers">
            <div className="space-y-2 sm:space-y-4">
              {subscribers.map((subscriber) => (
                <Card key={subscriber.id} className="bg-card border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage src={subscriber.avatar || "/placeholder.svg"} alt={subscriber.name} />
                          <AvatarFallback>{subscriber.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{subscriber.name}</div>
                          <div className="text-sm text-muted-foreground">{subscriber.username}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          Subscribed {subscriber.subscriptionDate}
                        </div>
                        <Button variant="outline" size="sm" className="bg-muted border-border hover:bg-muted/80">
                          <UserMinus className="h-4 w-4 mr-2" />
                          Block
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blocked">
            <div className="space-y-2 sm:space-y-4">
              {blockedUsers.map((user) => (
                <Card key={user.id} className="bg-card border-border">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.username}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-xs sm:text-sm text-muted-foreground">Blocked {user.blockDate}</div>
                        <Button variant="outline" size="sm" className="bg-muted border-border hover:bg-muted/80">
                          Unblock
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <span className="font-medium">Reason:</span> {user.blockReason}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {blockedUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>You haven't blocked any users yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
