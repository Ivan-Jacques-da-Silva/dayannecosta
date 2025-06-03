"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { getProperties, deleteProperty } from "@/services/property-service"
import type { Property } from "@/types"
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties()
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
    if (searchQuery.trim() === "") {
      setFilteredProperties(properties)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = properties.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.address.toLowerCase().includes(query) ||
          property.type.toLowerCase().includes(query) ||
          property.status.toLowerCase().includes(query),
      )
      setFilteredProperties(filtered)
    }
  }, [searchQuery, properties])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(id)
        setProperties((prev) => prev.filter((property) => property.id !== id))
        toast({
          title: "Property deleted",
          description: "The property has been successfully deleted.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "There was a problem deleting the property.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Properties</h1>
        <Button asChild>
          <Link href="/admin/properties/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Manage Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="min-w-[800px]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">ID</th>
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Price</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Date Added</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProperties.map((property) => (
                        <tr key={property.id} className="border-b">
                          <td className="py-3 px-4">{property.id.substring(0, 8)}</td>
                          <td className="py-3 px-4">{property.title}</td>
                          <td className="py-3 px-4">{property.type}</td>
                          <td className="py-3 px-4">${property.price.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                property.status === "For Sale"
                                  ? "bg-green-500/20 text-green-500"
                                  : property.status === "For Rent"
                                    ? "bg-blue-500/20 text-blue-500"
                                    : "bg-yellow-500/20 text-yellow-500"
                              }`}
                            >
                              {property.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{new Date(property.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 px-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/properties/edit/${property.id}`}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(property.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredProperties.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No properties found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
