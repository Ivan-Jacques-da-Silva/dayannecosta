"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Property } from "@/types"
import { useAuth } from "./auth-context"

interface ViewedProperty extends Property {
  viewedAt: string
}

interface ViewedPropertiesContextType {
  viewedProperties: ViewedProperty[]
  addToViewedProperties: (property: Property) => void
  clearViewedProperties: () => void
  removeFromViewedProperties: (id: string) => void
}

const ViewedPropertiesContext = createContext<ViewedPropertiesContextType>({
  viewedProperties: [],
  addToViewedProperties: () => {},
  clearViewedProperties: () => {},
  removeFromViewedProperties: () => {},
})

export const useViewedProperties = () => useContext(ViewedPropertiesContext)

interface ViewedPropertiesProviderProps {
  children: ReactNode
}

export function ViewedPropertiesProvider({ children }: ViewedPropertiesProviderProps) {
  const [viewedProperties, setViewedProperties] = useState<ViewedProperty[]>([])
  const { user } = useAuth()

  // Load viewed properties from localStorage when component mounts or user changes
  useEffect(() => {
    if (user) {
      const storageKey = `viewed-properties-${user.id}`
      const storedProperties = localStorage.getItem(storageKey)

      if (storedProperties) {
        try {
          setViewedProperties(JSON.parse(storedProperties))
        } catch (error) {
          console.error("Error parsing viewed properties from localStorage:", error)
          setViewedProperties([])
        }
      }
    } else {
      // Clear viewed properties when user logs out
      setViewedProperties([])
    }
  }, [user])

  // Save viewed properties to localStorage whenever they change
  useEffect(() => {
    if (user && viewedProperties.length > 0) {
      const storageKey = `viewed-properties-${user.id}`
      localStorage.setItem(storageKey, JSON.stringify(viewedProperties))
    }
  }, [viewedProperties, user])

  const addToViewedProperties = (property: Property) => {
    if (!user) return

    setViewedProperties((prev) => {
      // Remove the property if it already exists in the history
      const filtered = prev.filter((p) => p.id !== property.id)

      // Add the property to the beginning of the array with current timestamp
      const viewedProperty: ViewedProperty = {
        ...property,
        viewedAt: new Date().toISOString(),
      }

      // Limit to 20 most recent properties
      return [viewedProperty, ...filtered].slice(0, 20)
    })
  }

  const removeFromViewedProperties = (id: string) => {
    setViewedProperties((prev) => prev.filter((property) => property.id !== id))
  }

  const clearViewedProperties = () => {
    setViewedProperties([])
    if (user) {
      const storageKey = `viewed-properties-${user.id}`
      localStorage.removeItem(storageKey)
    }
  }

  return (
    <ViewedPropertiesContext.Provider
      value={{
        viewedProperties,
        addToViewedProperties,
        clearViewedProperties,
        removeFromViewedProperties,
      }}
    >
      {children}
    </ViewedPropertiesContext.Provider>
  )
}
