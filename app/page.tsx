// Este componente exibe a página inicial do site.
// Mostra imóveis em destaque e outras seções relevantes.

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getHighlightedProperties } from "@/api/api"
import PropertyCard from "@/components/property-card"
import { ArrowRight, Building, Home, MapPin } from "lucide-react"

export default function HomePage() {
  const [properties, setProperties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Simulando um pequeno atraso para mostrar o estado de carregamento
        await new Promise((resolve) => setTimeout(resolve, 500))

        const data = getHighlightedProperties()
        setProperties(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <div>
      {/* Hero Section with Search */}
      <div className="relative h-[80vh] min-h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=1200&width=2000')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Find Your Dream Home in Miami</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Discover luxury properties in Miami's most desirable neighborhoods
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 bg-background/80 backdrop-blur-md p-6 rounded-lg max-w-4xl"
          >
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="rent">Rent</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>
              <TabsContent value="buy" className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input placeholder="Enter an address, neighborhood, city, or ZIP code" className="flex-1" />
                  <Button>Search Properties</Button>
                </div>
              </TabsContent>
              <TabsContent value="rent" className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input placeholder="Enter an address, neighborhood, city, or ZIP code" className="flex-1" />
                  <Button>Find Rentals</Button>
                </div>
              </TabsContent>
              <TabsContent value="sell" className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input placeholder="Enter your property address" className="flex-1" />
                  <Button>Get Estimate</Button>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      {/* Featured Listings */}
      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Properties</h2>
              <p className="text-muted-foreground mt-2">Explore our handpicked selection of premium properties</p>
            </div>
            <Link href="/properties">
              <Button variant="outline" className="hidden md:flex items-center gap-2">
                View All Properties
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/properties">
              <Button variant="outline" className="flex items-center gap-2 mx-auto">
                View All Properties
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Featured Neighborhoods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="my-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Popular Neighborhoods</h2>
              <p className="text-muted-foreground mt-2">Explore Miami's most sought-after areas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-card/60 backdrop-blur-sm overflow-hidden group">
              <div className="aspect-square relative">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Brickell"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex items-center gap-2 text-white mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Downtown</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Brickell</h3>
                </div>
              </div>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm overflow-hidden group">
              <div className="aspect-square relative">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Miami Beach"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex items-center gap-2 text-white mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Beachfront</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Miami Beach</h3>
                </div>
              </div>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm overflow-hidden group">
              <div className="aspect-square relative">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Coconut Grove"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex items-center gap-2 text-white mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Waterfront</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Coconut Grove</h3>
                </div>
              </div>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm overflow-hidden group">
              <div className="aspect-square relative">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Coral Gables"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex items-center gap-2 text-white mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Historic</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Coral Gables</h3>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="my-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing exceptional service and finding the perfect property for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <Building className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Extensive Portfolio</h3>
                <p className="text-muted-foreground">
                  Access to Miami's most exclusive properties, from waterfront estates to luxury condos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Local Expertise</h3>
                <p className="text-muted-foreground">
                  Deep knowledge of Miami's neighborhoods, property values, and market trends
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Personalized Service</h3>
                <p className="text-muted-foreground">
                  Tailored approach to match your specific needs and preferences for your ideal property
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="my-16"
        >
          <div className="relative rounded-lg overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
            </div>

            <div className="relative py-16 px-8 md:px-16 flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Dream Home?</h2>
              <p className="text-white/90 mb-8 max-w-2xl">
                Let us help you navigate Miami's competitive real estate market and find the perfect property
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Browse Properties
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
