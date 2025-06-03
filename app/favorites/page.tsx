"use client"

import { motion } from "framer-motion"
import { useFavorites } from "@/context/favorites-context"
import PropertyCard from "@/components/property-card"
import PageTitle from "@/components/page-title"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push("/login?redirect=/favorites")
    }
  }, [user, router])

  if (!user) {
    return null // Will redirect in useEffect
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Favorites" subtitle="Your saved properties" />

      <div className="flex justify-between items-center my-8">
        <p className="text-muted-foreground">
          {favorites.length} {favorites.length === 1 ? "property" : "properties"} saved
        </p>
        {favorites.length > 0 && (
          <Button variant="outline" onClick={clearFavorites}>
            Clear All
          </Button>
        )}
      </div>

      {favorites.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
          <p className="text-muted-foreground mb-6">Start browsing and save properties you like</p>
          <Button asChild>
            <a href="/properties">Browse Properties</a>
          </Button>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {favorites.map((property) => (
            <motion.div key={property.id} variants={item}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
