"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProperties } from "@/services/property-service"
import { getUsers } from "@/services/user-service"
import { getMessages } from "@/services/message-service"
import type { Property, User, Message } from "@/types"
import { BarChart, Building, MessageSquare, Users } from "lucide-react"

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertiesData, usersData, messagesData] = await Promise.all([
          getProperties(),
          getUsers(),
          getMessages(),
        ])

        setProperties(propertiesData)
        setUsers(usersData)
        setMessages(messagesData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Properties</p>
                <h3 className="text-3xl font-bold">{properties.length}</h3>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Building className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <h3 className="text-3xl font-bold">{users.length}</h3>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Messages</p>
                <h3 className="text-3xl font-bold">{messages.filter((m) => !m.read).length}</h3>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <h3 className="text-3xl font-bold">
                  {properties.filter((p) => p.status === "For Sale" || p.status === "For Rent").length}
                </h3>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <BarChart className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-8">
        <Tabs defaultValue="recent">
          <TabsList className="mb-6">
            <TabsTrigger value="recent">Recent Properties</TabsTrigger>
            <TabsTrigger value="messages">Recent Messages</TabsTrigger>
            <TabsTrigger value="users">Recent Users</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recently Added Properties</CardTitle>
                <CardDescription>The latest properties added to the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 px-4">
                  <div className="min-w-[800px]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">ID</th>
                          <th className="text-left py-3 px-4">Title</th>
                          <th className="text-left py-3 px-4">Type</th>
                          <th className="text-left py-3 px-4">Price</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Date Added</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.slice(0, 5).map((property) => (
                          <tr key={property.id} className="border-b">
                            <td className="py-3 px-4">{property.id.substring(0, 8)}</td>
                            <td className="py-3 px-4">{property.title}</td>
                            <td className="py-3 px-4">{property.type}</td>
                            <td className="py-3 px-4">${property.price.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  property.status === "For Sale"
                                    ? "bg-green-500/20 text-green-500"
                                    : "bg-blue-500/20 text-blue-500"
                                }`}
                              >
                                {property.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">{new Date(property.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>The latest messages from users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 px-4">
                  <div className="min-w-[800px]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">ID</th>
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Subject</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.slice(0, 5).map((message) => (
                          <tr key={message.id} className="border-b">
                            <td className="py-3 px-4">{message.id.substring(0, 8)}</td>
                            <td className="py-3 px-4">{message.name}</td>
                            <td className="py-3 px-4">{message.email}</td>
                            <td className="py-3 px-4">{message.subject}</td>
                            <td className="py-3 px-4">{new Date(message.createdAt).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  message.read ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                                }`}
                              >
                                {message.read ? "Read" : "Unread"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>The latest users registered in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 px-4">
                  <div className="min-w-[800px]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">ID</th>
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Role</th>
                          <th className="text-left py-3 px-4">Joined</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.slice(0, 5).map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="py-3 px-4">{user.id.substring(0, 8)}</td>
                            <td className="py-3 px-4">{user.name}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  user.role === "admin"
                                    ? "bg-purple-500/20 text-purple-500"
                                    : "bg-blue-500/20 text-blue-500"
                                }`}
                              >
                                {user.role}
                              </span>
                            </td>
                            <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
