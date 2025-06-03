"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useFavorites } from "@/context/favorites-context"
import { useViewedProperties } from "@/context/viewed-properties-context"
import { Clock, Heart, MessageSquare, User } from "lucide-react"
import Link from "next/link"

export default function UserDashboard() {
  const { user } = useAuth()
  const { favorites } = useFavorites()
  const { viewedProperties } = useViewedProperties()
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")
  }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {greeting}, {user?.name}
        </h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your account.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="overflow-hidden border-t-4 border-t-rose-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saved Properties</p>
                  <h3 className="text-3xl font-bold">{favorites.length}</h3>
                </div>
                <div className="bg-rose-500/10 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-rose-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="overflow-hidden border-t-4 border-t-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Viewed Properties</p>
                  <h3 className="text-3xl font-bold">{viewedProperties.length}</h3>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="overflow-hidden border-t-4 border-t-amber-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Messages</p>
                  <h3 className="text-3xl font-bold">3</h3>
                </div>
                <div className="bg-amber-500/10 p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="overflow-hidden border-t-4 border-t-emerald-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saved Searches</p>
                  <h3 className="text-3xl font-bold">2</h3>
                </div>
                <div className="bg-emerald-500/10 p-3 rounded-full">
                  <User className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="overflow-hidden border-t-4 border-t-violet-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent interactions with properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {viewedProperties.length > 0 ? (
                  viewedProperties.slice(0, 3).map((property) => (
                    <div key={property.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/40">
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img
                          src={property.images[0] || "/placeholder.svg"}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/properties/${property.id}`} className="font-medium hover:text-primary">
                          <p className="truncate">{property.title}</p>
                        </Link>
                        <p className="text-sm text-muted-foreground">Viewed {formatRelativeTime(property.viewedAt)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">No recent activity</p>
                  </div>
                )}

                {viewedProperties.length > 3 && (
                  <div className="text-center pt-2">
                    <Button variant="link" asChild>
                      <Link href="/dashboard/history">View all history</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="overflow-hidden border-t-4 border-t-cyan-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-md">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user?.name} />
                <AvatarFallback className="bg-cyan-500/10 text-cyan-500">{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{user?.name}</h3>
              <p className="text-muted-foreground mb-4">{user?.email}</p>
              <div className="w-full space-y-2">
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
                <Link href="/favorites" className="block w-full">
                  <Button variant="outline" className="w-full">
                    View Favorites
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

// Helper function to format relative time
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "just now"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  }

  return date.toLocaleDateString()
}
