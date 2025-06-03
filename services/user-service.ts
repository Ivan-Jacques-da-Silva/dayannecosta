import type { User } from "@/types"
import { generateId } from "@/lib/utils"

// Mock users data (shared with auth-service.ts)
const mockUsers: User[] = [
  {
    id: "user1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be hashed
    role: "admin",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "user2",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "user",
    createdAt: "2023-01-15T00:00:00Z",
  },
  {
    id: "user3",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "user",
    createdAt: "2023-02-01T00:00:00Z",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get all users
export const getUsers = async (): Promise<User[]> => {
  await delay(800) // Simulate network delay

  // Return users without passwords
  return mockUsers.map((user) => {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword as User
  })
}

// Get user by ID
export const getUserById = async (id: string): Promise<User> => {
  await delay(500) // Simulate network delay

  const user = mockUsers.find((u) => u.id === id)

  if (!user) {
    throw new Error(`User with ID ${id} not found`)
  }

  // Return user without password
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword as User
}

// Add a new user
export const addUser = async (userData: {
  name: string
  email: string
  password: string
  role: string
}): Promise<User> => {
  await delay(1000) // Simulate network delay

  // Check if email already exists
  if (mockUsers.some((u) => u.email === userData.email)) {
    throw new Error("Email already in use")
  }

  const newUser: User = {
    id: generateId(),
    name: userData.name,
    email: userData.email,
    password: userData.password, // In a real app, this would be hashed
    role: userData.role,
    createdAt: new Date().toISOString(),
  }

  mockUsers.push(newUser)

  // Return user without password
  const { password, ...userWithoutPassword } = newUser
  return userWithoutPassword as User
}

// Update a user
export const updateUser = async (id: string, updates: Partial<User>): Promise<User> => {
  await delay(1000) // Simulate network delay

  const index = mockUsers.findIndex((u) => u.id === id)

  if (index === -1) {
    throw new Error(`User with ID ${id} not found`)
  }

  // If updating email, check if it's already in use by another user
  if (updates.email && updates.email !== mockUsers[index].email) {
    if (mockUsers.some((u) => u.email === updates.email && u.id !== id)) {
      throw new Error("Email already in use")
    }
  }

  const updatedUser = {
    ...mockUsers[index],
    ...updates,
  }

  mockUsers[index] = updatedUser

  // Return user without password
  const { password, ...userWithoutPassword } = updatedUser
  return userWithoutPassword as User
}

// Delete a user
export const deleteUser = async (id: string): Promise<void> => {
  await delay(800) // Simulate network delay

  const index = mockUsers.findIndex((u) => u.id === id)

  if (index === -1) {
    throw new Error(`User with ID ${id} not found`)
  }

  mockUsers.splice(index, 1)
}
