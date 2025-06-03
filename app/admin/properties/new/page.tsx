"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { addProperty } from "@/services/property-service"
import type { Property } from "@/types"
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react"

export default function NewPropertyPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [features, setFeatures] = useState<string[]>(["Air Conditioning", "Parking", "Swimming Pool"])
  const [newFeature, setNewFeature] = useState("")
  const [images, setImages] = useState<string[]>([
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ])

  const [formData, setFormData] = useState<Omit<Property, "id" | "createdAt" | "agent">>({
    title: "",
    description: "",
    price: 0,
    type: "house",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    garage: 0,
    size: 0,
    yearBuilt: 2020,
    address: "",
    location: {
      latitude: 25.7617,
      longitude: -80.1918,
    },
    features: features,
    images: images,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "bedrooms" ||
        name === "bathrooms" ||
        name === "garage" ||
        name === "size" ||
        name === "yearBuilt"
          ? Number(value)
          : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: Number(value),
      },
    }))
  }

  const addFeature = () => {
    if (newFeature.trim() !== "" && !features.includes(newFeature)) {
      const updatedFeatures = [...features, newFeature]
      setFeatures(updatedFeatures)
      setFormData((prev) => ({
        ...prev,
        features: updatedFeatures,
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index)
    setFeatures(updatedFeatures)
    setFormData((prev) => ({
      ...prev,
      features: updatedFeatures,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addProperty({
        ...formData,
        agent: {
          id: "agent1",
          name: "Sarah Johnson",
          phone: "(305) 555-1234",
          email: "sarah@miamiluxuryestates.com",
          photo: "/placeholder.svg?height=200&width=200",
        },
      })

      toast({
        title: "Property added",
        description: "The property has been successfully added.",
      })

      router.push("/admin/properties")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem adding the property.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold">Add New Property</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Property Type</Label>
                      <Select defaultValue={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        defaultValue={formData.status}
                        onValueChange={(value) => handleSelectChange("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="For Sale">For Sale</SelectItem>
                          <SelectItem value="For Rent">For Rent</SelectItem>
                          <SelectItem value="Sold">Sold</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearBuilt">Year Built</Label>
                      <Input
                        id="yearBuilt"
                        name="yearBuilt"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        value={formData.yearBuilt}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        min="0"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input
                        id="bathrooms"
                        name="bathrooms"
                        type="number"
                        min="0"
                        step="0.5"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="garage">Garage</Label>
                      <Input
                        id="garage"
                        name="garage"
                        type="number"
                        min="0"
                        value={formData.garage}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="size">Size (sq ft)</Label>
                      <Input
                        id="size"
                        name="size"
                        type="number"
                        min="0"
                        value={formData.size}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        name="latitude"
                        type="number"
                        step="0.0001"
                        value={formData.location.latitude}
                        onChange={handleLocationChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        name="longitude"
                        type="number"
                        step="0.0001"
                        value={formData.location.longitude}
                        onChange={handleLocationChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Features & Amenities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Add a feature..."
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                    />
                    <Button type="button" onClick={addFeature} size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <span>{feature}</span>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-video rounded-md overflow-hidden border">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Property ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 w-8 h-8 rounded-full"
                          onClick={() => {
                            const updatedImages = images.filter((_, i) => i !== index)
                            setImages(updatedImages)
                            setFormData((prev) => ({
                              ...prev,
                              images: updatedImages,
                            }))
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="h-32 border-dashed flex flex-col gap-2"
                      onClick={() => {
                        const newImages = [...images, "/placeholder.svg?height=600&width=800"]
                        setImages(newImages)
                        setFormData((prev) => ({
                          ...prev,
                          images: newImages,
                        }))
                      }}
                    >
                      <Upload className="w-6 h-6" />
                      <span>Add Image</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Featured Property</Label>
                    <Switch id="featured" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="published">Published</Label>
                    <Switch id="published" defaultChecked />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      "Save Property"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
