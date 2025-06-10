
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, ArrowRight, Check, Home, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

interface FormData {
  type: "buy" | "sell" | ""
  propertyType: string
  priceRange: string
  bedrooms: string
  bathrooms: string
  timeline: string
  email: string
  name: string
  phone: string
  comments: string
}

export default function BuySellPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    type: "",
    propertyType: "",
    priceRange: "",
    bedrooms: "",
    bathrooms: "",
    timeline: "",
    email: "",
    name: "",
    phone: "+55 ",
    comments: "",
  })

  const totalSteps = 7

  const propertyTypeOptions = [
    { value: "condo", label: "CONDO" },
    { value: "single-family", label: "SINGLE FAMILY HOME" },
    { value: "townhouse", label: "TOWNHOUSE" },
  ]

  const getPriceRangeOptions = () => [
    { value: "below-1m", label: "BELOW $1M" },
    { value: "1m-3m", label: "$1M TO $3M" },
    { value: "3m-5m", label: "$3M TO $5M" },
    { value: "5m-plus", label: "$5M+" },
  ]

  const bedroomOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4+", label: "4+" },
  ]

  const bathroomOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4+", label: "4+" },
  ]

  const getTimelineOptions = () => [
    { value: "now", label: "NOW" },
    { value: "soon", label: "SOON" },
    { value: "later", label: "LATER" },
  ]

  const handleOptionSelect = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.email || !formData.name || !formData.phone || formData.phone === "+55 ") {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Simulate form submission
    toast({
      title: "Success!",
      description: `Your ${formData.type === "buy" ? "buying" : "selling"} form has been submitted successfully. We'll contact you soon.`,
    })

    // Redirect to home page
    router.push("/")
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return formData.type !== ""
      case 1: return formData.propertyType !== ""
      case 2: return formData.priceRange !== ""
      case 3: return formData.bedrooms !== ""
      case 4: return formData.bathrooms !== ""
      case 5: return formData.timeline !== ""
      case 6: return formData.email !== "" && formData.name !== "" && formData.phone !== "+55 "
      default: return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-white">
              What Are You Looking To Do?
            </h2>
            <div className="grid gap-6">
              <Button
                variant={formData.type === "buy" ? "default" : "outline"}
                className={`h-20 text-xl font-semibold transition-all duration-300 ${
                  formData.type === "buy"
                    ? "bg-primary text-primary-foreground scale-105"
                    : "bg-background/10 border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                }`}
                onClick={() => handleOptionSelect("type", "buy")}
              >
                <Home className="mr-3 h-6 w-6" />
                BUY A PROPERTY
              </Button>
              <Button
                variant={formData.type === "sell" ? "default" : "outline"}
                className={`h-20 text-xl font-semibold transition-all duration-300 ${
                  formData.type === "sell"
                    ? "bg-primary text-primary-foreground scale-105"
                    : "bg-background/10 border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                }`}
                onClick={() => handleOptionSelect("type", "sell")}
              >
                <DollarSign className="mr-3 h-6 w-6" />
                SELL A PROPERTY
              </Button>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-white">
              {formData.type === "buy" ? "What Are You Looking To Buy?" : "What Are You Looking To Sell?"}
            </h2>
            <div className="grid gap-4">
              {propertyTypeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={formData.propertyType === option.value ? "default" : "outline"}
                  className={`h-16 text-lg font-semibold transition-all duration-300 ${
                    formData.propertyType === option.value
                      ? "bg-primary text-primary-foreground scale-105"
                      : "bg-background/10 border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                  }`}
                  onClick={() => handleOptionSelect("propertyType", option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-white">
              {formData.type === "buy" ? "What's Your Price Range?" : "Expected Selling Price?"}
            </h2>
            <div className="grid gap-4">
              {getPriceRangeOptions().map((option) => (
                <Button
                  key={option.value}
                  variant={formData.priceRange === option.value ? "default" : "outline"}
                  className={`h-16 text-lg font-semibold transition-all duration-300 ${
                    formData.priceRange === option.value
                      ? "bg-primary text-primary-foreground scale-105"
                      : "bg-background/10 border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                  }`}
                  onClick={() => handleOptionSelect("priceRange", option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-white">How Many Bedrooms?</h2>
            <div className="grid grid-cols-2 gap-4">
              {bedroomOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={formData.bedrooms === option.value ? "default" : "outline"}
                  className={`h-20 text-2xl font-bold transition-all duration-300 ${
                    formData.bedrooms === option.value
                      ? "bg-primary text-primary-foreground scale-105"
                      : "bg-background/10 border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                  }`}
                  onClick={() => handleOptionSelect("bedrooms", option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-white">How Many Bathrooms?</h2>
            <div className="grid grid-cols-2 gap-4">
              {bathroomOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={formData.bathrooms === option.value ? "default" : "outline"}
                  className={`h-20 text-2xl font-bold transition-all duration-300 ${
                    formData.bathrooms === option.value
                      ? "bg-primary text-primary-foreground scale-105"
                      : "bg-background/10 border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                  }`}
                  onClick={() => handleOptionSelect("bathrooms", option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-white">
              {formData.type === "buy" ? "Timeline To Purchase" : "Timeline To Sell"}
            </h2>
            <div className="grid gap-4">
              {getTimelineOptions().map((option) => (
                <Button
                  key={option.value}
                  variant={formData.timeline === option.value ? "default" : "outline"}
                  className={`h-16 text-lg font-semibold transition-all duration-300 ${
                    formData.timeline === option.value
                      ? "bg-primary text-primary-foreground scale-105"
                      : "bg-background/10 border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                  }`}
                  onClick={() => handleOptionSelect("timeline", option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-white">
              {formData.type === "buy" ? "Contact Information" : "Contact Info to Get a Free Evaluation"}
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-semibold">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-12 bg-background/10 border-white/20 text-white placeholder:text-white/60"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-semibold">
                  Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-12 bg-background/10 border-white/20 text-white placeholder:text-white/60"
                  placeholder="Your Full Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white font-semibold">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="h-12 bg-background/10 border-white/20 text-white placeholder:text-white/60"
                  placeholder="+55 (11) 99999-9999"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments" className="text-white font-semibold">
                  Comments
                </Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => handleInputChange("comments", e.target.value)}
                  className="min-h-24 bg-background/10 border-white/20 text-white placeholder:text-white/60"
                  placeholder="Additional comments or requirements..."
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/placeholder.svg?height=1200&width=2000')" }}
      />
      
      <div className="relative container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-2xl bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border-slate-700 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white/60">
                  Step {currentStep + 1} of {totalSteps}
                </span>
                <button
                  onClick={() => router.push("/")}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="bg-background/10 border-white/20 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK
              </Button>

              {currentStep === totalSteps - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="mr-2 h-4 w-4" />
                  SUBMIT
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === 0 ? "CONTINUE" : "NEXT"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
