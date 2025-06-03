import type { User } from "@/types"
import { generateId } from "@/lib/utils"

// Mock users data with demo credentials
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
    email: "user@example.com", // Demo user credentials
    password: "user123", // In a real app, this would be hashed
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

// Login user
export const loginUser = async (email: string, password: string): Promise<User> => {
  await delay(800) // Simulate network delay

  const user = mockUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    throw new Error("Invalid email or password")
  }

  // Store user in localStorage (in a real app, this would be a JWT token)
  const { password: _, ...userWithoutPassword } = user
  localStorage.setItem("user", JSON.stringify(userWithoutPassword))

  return { ...userWithoutPassword } as User
}

// Register user
export const registerUser = async (name: string, email: string, password: string): Promise<void> => {
  await delay(1000) // Simulate network delay

  // Check if email already exists
  if (mockUsers.some((u) => u.email === email)) {
    throw new Error("Email already in use")
  }

  const newUser: User = {
    id: generateId(),
    name,
    email,
    password, // In a real app, this would be hashed
    role: "user",
    createdAt: new Date().toISOString(),
  }

  mockUsers.push(newUser)
}

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  await delay(300) // Simulate network delay

  const userJson = localStorage.getItem("user")

  if (!userJson) {
    throw new Error("No user logged in")
  }

  try {
    return JSON.parse(userJson) as User
  } catch (error) {
    throw new Error("Invalid user data")
  }
}

// Logout user
export const logoutUser = async (): Promise<void> => {
  await delay(300) // Simulate network delay
  localStorage.removeItem("user")
}
