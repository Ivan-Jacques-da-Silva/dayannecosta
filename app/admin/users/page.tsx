"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { getUsers, addUser, updateUser, deleteUser } from "@/services/user-service"
import type { User } from "@/types"
import { Edit, MoreHorizontal, Search, Trash2, UserPlus } from "lucide-react"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
        setFilteredUsers(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching users:", error)
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query),
      )
      setFilteredUsers(filtered)
    }
  }, [searchQuery, users])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setIsEditing(true)
      setSelectedUser(user)
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
      })
    } else {
      setIsEditing(false)
      setSelectedUser(null)
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      })
    }
    setIsDialogOpen(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (isEditing && selectedUser) {
        await updateUser(selectedUser.id, {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          ...(formData.password ? { password: formData.password } : {}),
        })

        setUsers((prev) =>
          prev.map((user) =>
            user.id === selectedUser.id
              ? {
                  ...user,
                  name: formData.name,
                  email: formData.email,
                  role: formData.role,
                }
              : user,
          ),
        )

        toast({
          title: "User updated",
          description: "The user has been successfully updated.",
        })
      } else {
        const newUser = await addUser(formData)
        setUsers((prev) => [...prev, newUser])

        toast({
          title: "User added",
          description: "The user has been successfully added.",
        })
      }

      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: `There was a problem ${isEditing ? "updating" : "adding"} the user.`,
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id)
        setUsers((prev) => prev.filter((user) => user.id !== id))
        toast({
          title: "User deleted",
          description: "The user has been successfully deleted.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "There was a problem deleting the user.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button onClick={() => handleOpenDialog()}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Manage Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search users..." value={searchQuery} onChange={handleSearch} className="pl-10" />
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
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Joined</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
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
                          <td className="py-3 px-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleOpenDialog(user)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredUsers.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No users found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update user information and permissions." : "Fill in the information to create a new user."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{isEditing ? "Password (leave blank to keep current)" : "Password"}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select defaultValue={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="submit">{isEditing ? "Update User" : "Add User"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
