"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useViewedProperties } from "@/context/viewed-properties-context"
import { useToast } from "@/components/ui/use-toast"
import PropertyCard from "@/components/property-card"
import { formatDate } from "@/lib/utils"
import { Clock, Search, Trash2 } from "lucide-react"
import Link from "next/link"

export default function ViewHistoryPage() {
  const { viewedProperties, clearViewedProperties, removeFromViewedProperties } = useViewedProperties()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProperties = viewedProperties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire viewing history?")) {
      clearViewedProperties()
      toast({
        title: "History cleared",
        description: "Your property viewing history has been cleared.",
      })
    }
  }

  const handleRemoveProperty = (id: string) => {
    removeFromViewedProperties(id)
    toast({
      title: "Property removed",
      description: "The property has been removed from your viewing history.",
    })
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
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Viewing History</h1>
        <p className="text-muted-foreground">Track the properties you've recently viewed.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="relative w-full md:w-auto md:flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search your history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {viewedProperties.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleClearHistory} className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Clear History
          </Button>
        )}
      </div>

      {viewedProperties.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No viewing history yet</h3>
          <p className="text-muted-foreground mb-6">Start browsing properties to build your history</p>
          <Button asChild>
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </motion.div>
      ) : filteredProperties.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No matching properties</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search query</p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-8">
          <motion.div variants={container} initial="hidden" animate="show">
            {filteredProperties.map((property) => (
              <motion.div key={property.id} variants={item} className="mb-8">
                <div className="flex flex-col lg:flex-row gap-4 items-start">
                  <div className="w-full lg:w-auto text-sm text-muted-foreground mb-2 lg:mb-0 lg:pt-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Viewed {formatRelativeTime(property.viewedAt)}</span>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="overflow-hidden border-t-4 border-t-blue-500 rounded-t-md">
                      <PropertyCard property={property} />
                    </div>
                  </div>
                  <div className="w-full lg:w-auto flex lg:flex-col gap-2 lg:pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveProperty(property.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}

// Helper function to format relative time
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "just now"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  }

  return formatDate(dateString)
}
