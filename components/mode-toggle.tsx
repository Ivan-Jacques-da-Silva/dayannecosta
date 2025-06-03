"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)

    // Listen for theme changes from other components/tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme") {
        // Force a re-render when theme changes in another tab/component
        setMounted(false)
        setTimeout(() => setMounted(true), 0)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const toggleTheme = () => {
    // Using resolvedTheme instead of theme ensures we get the actual applied theme
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    // Render a placeholder to avoid layout shift
    return (
      <Button variant="ghost" size="icon" className="opacity-0">
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">{resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}</span>
    </Button>
  )
}
