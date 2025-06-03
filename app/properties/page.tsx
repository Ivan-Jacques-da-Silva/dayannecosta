// Este componente exibe a listagem de imóveis.
// Permite filtrar e ordenar os imóveis.

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { getAllProperties } from "@/api/api"
import PropertyCard from "@/components/property-card"
import { formatCurrency } from "@/lib/utils"
import { Search, SlidersHorizontal } from "lucide-react"

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [filteredProperties, setFilteredProperties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: "all",
    bathrooms: "all",
    status: "all",
  })

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Simulando um pequeno atraso para mostrar o estado de carregamento
        await new Promise((resolve) => setTimeout(resolve, 500))

        const data = getAllProperties()
        setProperties(data)
        setFilteredProperties(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  useEffect(() => {
    // Aplicar filtros
    let result = [...properties]

    if (filters.status !== "all") {
      result = result.filter((property) => property.status === filters.status)
    }

    result = result.filter((property) => property.price >= filters.minPrice && property.price <= filters.maxPrice)

    if (filters.bedrooms !== "all") {
      result = result.filter((property) => property.bedrooms === Number(filters.bedrooms))
    }

    if (filters.bathrooms !== "all") {
      result = result.filter((property) => property.bathrooms === Number(filters.bathrooms))
    }

    setFilteredProperties(result)
  }, [filters, properties])

  const handleFilterChange = (name: string, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Properties</h1>
        <Button variant="outline" onClick={toggleFilters} className="flex items-center gap-2 md:hidden">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`mb-8 ${showFilters ? "block" : "hidden md:block"}`}
      >
        <Card className="bg-card/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Address, City, Zip..." className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select defaultValue="all" onValueChange={(value) => handleFilterChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bedrooms</label>
                <Select defaultValue="all" onValueChange={(value) => handleFilterChange("bedrooms", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bathrooms</label>
                <Select defaultValue="all" onValueChange={(value) => handleFilterChange("bathrooms", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 lg:col-span-5">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Price Range</label>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(filters.minPrice)} - {formatCurrency(filters.maxPrice)}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 5000000]}
                  min={0}
                  max={10000000}
                  step={50000}
                  onValueChange={(value) => {
                    handleFilterChange("minPrice", value[0])
                    handleFilterChange("maxPrice", value[1])
                  }}
                  className="py-4"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8"
        >
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <motion.div key={property.id} variants={item}>
                <PropertyCard property={property} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to find more properties.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
