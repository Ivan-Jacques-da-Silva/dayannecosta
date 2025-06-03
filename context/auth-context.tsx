"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types"
import { loginUser, registerUser, getCurrentUser, logoutUser } from "@/services/auth-service"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if user is already logged in
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        // No user logged in
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const loggedInUser = await loginUser(email, password)
    setUser(loggedInUser)

    // Redirect based on user role
    if (loggedInUser.role === "admin") {
      router.push("/admin")
    } else {
      router.push("/dashboard")
    }
  }

  const register = async (name: string, email: string, password: string) => {
    await registerUser(name, email, password)
    // Don't automatically log in after registration
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
    router.push("/")
  }

  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, register, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}
