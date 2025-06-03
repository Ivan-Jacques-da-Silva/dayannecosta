"use client"

import { motion } from "framer-motion"
import type { Property } from "@/types"
import PropertyCard from "./property-card"

interface FeaturedPropertiesProps {
  properties: Property[]
  isLoading: boolean
}

export default function FeaturedProperties({ properties, isLoading }: FeaturedPropertiesProps) {
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="rounded-lg overflow-hidden border bg-card">
            <div className="aspect-video bg-muted animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-6 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-10 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {properties.map((property) => (
        <motion.div key={property.id} variants={item}>
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </motion.div>
  )
}
