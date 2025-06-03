// Este componente exibe um card de imóvel na listagem.
// Inclui animações de hover e exibe informações básicas do imóvel.

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import PropertyStatusBadge from "@/components/property-status-badge"
import { Bed, Bath, SquareIcon as SquareFoot, Heart, MapPin } from "lucide-react"

interface PropertyCardProps {
  property: {
    id: string
    propertyTitle: string
    price: number
    bedrooms: number
    bathrooms: number
    sqft: number
    address: string
    images: string[]
    status: "available" | "sold" | "reserved"
  }
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/properties/${property.id}`} className="block">
        <div className="relative aspect-video">
          <Image
            src={property.images[0] || "/placeholder.svg"}
            alt={property.propertyTitle}
            fill
            className="object-cover transition-transform duration-500"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""}`}
          />

          <div className="absolute top-2 left-2 z-10">
            <PropertyStatusBadge status={property.status} />
          </div>

          <button
            className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full transition-transform duration-300 hover:scale-110"
            onClick={handleFavoriteToggle}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            <span className="sr-only">Add to favorites</span>
          </button>
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-2xl font-bold text-primary">{formatCurrency(property.price)}</p>
        </div>

        <Link href={`/properties/${property.id}`}>
          <h3 className="text-lg font-bold mb-2 line-clamp-1 hover:text-primary transition-colors">
            {property.propertyTitle}
          </h3>
        </Link>

        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 mr-1 shrink-0" />
          <p className="text-sm truncate">{property.address}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1 text-muted-foreground" />
            <span>
              {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
            </span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1 text-muted-foreground" />
            <span>
              {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
            </span>
          </div>
          <div className="flex items-center">
            <SquareFoot className="w-4 h-4 mr-1 text-muted-foreground" />
            <span>{property.sqft.toLocaleString()} Sq.Ft.</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
