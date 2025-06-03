"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Property } from "@/types"

interface FavoritesContextType {
  favorites: Property[]
  addFavorite: (property: Property) => void
  removeFavorite: (id: string) => void
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  clearFavorites: () => {},
})

export const useFavorites = () => useContext(FavoritesContext)

interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Property[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error)
        setFavorites([])
      }
    }
  }, [])

  useEffect(() => {
    // Save favorites to localStorage whenever they change
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (property: Property) => {
    setFavorites((prev) => {
      // Check if property is already in favorites
      if (prev.some((fav) => fav.id === property.id)) {
        return prev
      }
      return [...prev, property]
    })
  }

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((property) => property.id !== id))
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}
