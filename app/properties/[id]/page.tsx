// Este componente exibe os detalhes do imóvel.
// Ele consome os dados do arquivo centralizado api.js

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { getPropertyById } from "@/api/api"
import { formatCurrency } from "@/lib/utils"
import PropertyGallery from "@/components/property-gallery"
import PropertyMap from "@/components/property-map"
import PropertyFeatures from "@/components/property-features"
import ContactAgentForm from "@/components/contact-agent-form"
import PropertyStatusBadge from "@/components/property-status-badge"
import { ArrowLeft, Bed, Bath, SquareIcon as SquareFoot, Share2, Heart, Calendar, DollarSign, Home } from "lucide-react"

export default function PropertyDetailPage() {
  const params = useParams()
  const { id } = params
  const [property, setProperty] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // Simulando um pequeno atraso para mostrar o estado de carregamento
        await new Promise((resolve) => setTimeout(resolve, 500))

        const data = getPropertyById(id as string)
        setProperty(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching property:", error)
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProperty()
    }
  }, [id])

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The property you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <a href="/properties">Back to Properties</a>
        </Button>
      </div>
    )
  }

  const features = [
    "Floor-to-ceiling windows",
    "Stainless steel appliances",
    "Quartz countertops",
    "Hardwood floors",
    "Walk-in closets",
    "Balcony with bay views",
    "Central air conditioning",
    "In-unit washer/dryer",
    "24-hour security",
    "Fitness center access",
    "Swimming pool access",
    "Concierge service",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Button variant="outline" size="sm" asChild className="mb-6">
          <a href="/properties">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </a>
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <PropertyStatusBadge status={property.status} />
              <span className="text-sm text-muted-foreground">ID: {property.id}</span>
            </div>
            <h1 className="text-3xl font-bold">{property.propertyTitle}</h1>
            <p className="text-xl text-muted-foreground">{property.address}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-3xl font-bold text-primary">{formatCurrency(property.price)}</span>
            <div className="flex gap-2 mt-2">
              <Button
                variant={isFavorite ? "default" : "outline"}
                size="sm"
                onClick={handleFavoriteToggle}
                className="flex items-center gap-2"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                {isFavorite ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-1 bg-muted/30 px-3 py-1.5 rounded-md">
            <Bed className="w-4 h-4 text-primary" />
            <span className="font-medium">{property.bedrooms}</span>
            <span className="text-muted-foreground text-sm">Beds</span>
          </div>

          <div className="flex items-center gap-1 bg-muted/30 px-3 py-1.5 rounded-md">
            <Bath className="w-4 h-4 text-primary" />
            <span className="font-medium">{property.bathrooms}</span>
            <span className="text-muted-foreground text-sm">Baths</span>
          </div>

          <div className="flex items-center gap-1 bg-muted/30 px-3 py-1.5 rounded-md">
            <SquareFoot className="w-4 h-4 text-primary" />
            <span className="font-medium">{property.sqft.toLocaleString()}</span>
            <span className="text-muted-foreground text-sm">Sq.Ft.</span>
          </div>

          <div className="flex items-center gap-1 bg-muted/30 px-3 py-1.5 rounded-md">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-medium">{property.yearBuilt}</span>
            <span className="text-muted-foreground text-sm">Built</span>
          </div>

          <div className="flex items-center gap-1 bg-muted/30 px-3 py-1.5 rounded-md">
            <Home className="w-4 h-4 text-primary" />
            <span className="font-medium">{property.garage}</span>
            <span className="text-muted-foreground text-sm">Garage</span>
          </div>

          <div className="flex items-center gap-1 bg-muted/30 px-3 py-1.5 rounded-md">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="font-medium">${property.hoa}/mo</span>
            <span className="text-muted-foreground text-sm">HOA</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <PropertyGallery images={property.images} videoUrl={property.videoUrl} />

          <div className="mt-8">
            <Tabs defaultValue="details">
              <TabsList className="mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{property.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="features">
                <PropertyFeatures
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  sqft={property.sqft}
                  yearBuilt={property.yearBuilt}
                  garage={property.garage}
                  hoa={property.hoa}
                  taxes={property.taxes}
                  features={features}
                />
              </TabsContent>

              <TabsContent value="location">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Location</h3>
                  <p className="text-muted-foreground mb-6">{property.address}</p>
                  <PropertyMap
                    latitude={property.map.latitude}
                    longitude={property.map.longitude}
                    address={property.address}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="sticky top-24">
            <ContactAgentForm
              propertyTitle={property.propertyTitle}
              realtorName={property.realtorName}
              realtorEmail={property.realtorEmail}
              realtorPhone={property.realtorPhone}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
