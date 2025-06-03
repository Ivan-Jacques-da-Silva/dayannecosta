"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { getMessages, markMessageAsRead, deleteMessage } from "@/services/message-service"
import type { Message } from "@/types"
import { Eye, Search, Trash2 } from "lucide-react"

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages()
        setMessages(data)
        setFilteredMessages(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching messages:", error)
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMessages(messages)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = messages.filter(
        (message) =>
          message.name.toLowerCase().includes(query) ||
          message.email.toLowerCase().includes(query) ||
          message.subject.toLowerCase().includes(query) ||
          message.message.toLowerCase().includes(query),
      )
      setFilteredMessages(filtered)
    }
  }, [searchQuery, messages])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleViewMessage = async (message: Message) => {
    setSelectedMessage(message)
    setIsDialogOpen(true)

    if (!message.read) {
      try {
        await markMessageAsRead(message.id)
        setMessages((prev) => prev.map((m) => (m.id === message.id ? { ...m, read: true } : m)))
      } catch (error) {
        console.error("Error marking message as read:", error)
      }
    }
  }

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteMessage(id)
        setMessages((prev) => prev.filter((message) => message.id !== id))
        toast({
          title: "Message deleted",
          description: "The message has been successfully deleted.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "There was a problem deleting the message.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Messages</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Manage Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search messages..." value={searchQuery} onChange={handleSearch} className="pl-10" />
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
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
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMessages.map((message) => (
                        <tr key={message.id} className={`border-b ${!message.read ? "bg-primary/5" : ""}`}>
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
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleViewMessage(message)}>
                                <Eye className="w-4 h-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteMessage(message.id)}>
                                <Trash2 className="w-4 h-4 text-destructive" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredMessages.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No messages found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedMessage && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMessage.subject}</DialogTitle>
              <DialogDescription>
                From: {selectedMessage.name} ({selectedMessage.email})
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="text-sm text-muted-foreground">
                Received on {new Date(selectedMessage.createdAt).toLocaleString()}
              </div>
              <div className="p-4 border rounded-md whitespace-pre-line">{selectedMessage.message}</div>
              {selectedMessage.propertyId && (
                <div className="text-sm">
                  <span className="font-medium">Related Property: </span>
                  <a
                    href={`/properties/${selectedMessage.propertyId}`}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Property
                  </a>
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteMessage(selectedMessage.id)
                    setIsDialogOpen(false)
                  }}
                >
                  Delete
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
