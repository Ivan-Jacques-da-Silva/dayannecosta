"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChevronLeft, ChevronRight, InfoIcon } from "lucide-react"

export default function LoginPage() {
  const { login, register, user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect") || "/"

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Carrossel de imagens
  const carouselImages = [
    {
      src: "/placeholder.svg?height=1000&width=800",
      alt: "Luxury Miami Waterfront",
      title: "Luxury Waterfront Living",
      description: "Discover exclusive waterfront properties in Miami's most prestigious locations",
    },
    {
      src: "/placeholder.svg?height=1000&width=800",
      alt: "Modern Miami Condo",
      title: "Modern Urban Lifestyle",
      description: "Explore contemporary condos with stunning city views and premium amenities",
    },
    {
      src: "/placeholder.svg?height=1000&width=800",
      alt: "Miami Beach Property",
      title: "Miami Beach Paradise",
      description: "Find your dream home just steps away from pristine beaches and vibrant nightlife",
    },
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Autoplay para o carrossel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, carouselImages.length])

  // Pausar autoplay quando o mouse estiver sobre o carrossel
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    }
  }, [user, router])

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await login(loginData.email, loginData.password)
      toast({
        title: "Login successful",
        description: "Welcome back to Miami Luxury Estates",
      })
      // Redirect will happen in useEffect
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Registration failed",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await register(registerData.name, registerData.email, registerData.password)
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      })
      // Reset form and switch to login tab
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      document.getElementById("login-tab")?.click()
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was a problem creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-background/80 relative px-4 py-12">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="w-full max-w-5xl z-10 flex flex-col md:flex-row gap-8">
        {/* Left side - Image Carousel Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2"
        >
          <Card
            className="overflow-hidden h-full border-none shadow-lg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full h-full min-h-[300px] md:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={carouselImages[currentImageIndex].src || "/placeholder.svg"}
                    alt={carouselImages[currentImageIndex].alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-white text-3xl font-bold mb-2"
                    >
                      {carouselImages[currentImageIndex].title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-white/80"
                    >
                      {carouselImages[currentImageIndex].description}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel Controls */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/30 hover:bg-black/50 text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/30 hover:bg-black/50 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                    }`}
                    onClick={() => goToImage(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right side - Login/Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2"
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <Alert className="mb-6 border-primary/20 bg-primary/5">
              <InfoIcon className="h-4 w-4 text-primary" />
              <AlertTitle className="text-primary font-medium">Demo Credentials</AlertTitle>
              <AlertDescription>
                <div className="mt-2 text-sm">
                  <p className="mb-1">
                    <strong className="font-semibold">Admin:</strong> admin@example.com / admin123
                  </p>
                  <p>
                    <strong className="font-semibold">User:</strong> user@example.com / user123
                  </p>
                </div>
              </AlertDescription>
            </Alert>

            <Card className="border-none shadow-lg">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" id="login-tab">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          name="email"
                          type="email"
                          placeholder="name@example.com"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password">Password</Label>
                          <Link href="#" className="text-sm text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="login-password"
                          name="password"
                          type="password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          required
                          className="h-11"
                        />
                      </div>
                      <Button type="submit" className="w-full h-11 mt-2" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Logging in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </TabsContent>

                <TabsContent value="register">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>Enter your information to create a new account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">Full Name</Label>
                        <Input
                          id="register-name"
                          name="name"
                          placeholder="John Doe"
                          value={registerData.name}
                          onChange={handleRegisterChange}
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input
                          id="register-email"
                          name="email"
                          type="email"
                          placeholder="name@example.com"
                          value={registerData.email}
                          onChange={handleRegisterChange}
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <Input
                          id="register-password"
                          name="password"
                          type="password"
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-confirm-password">Confirm Password</Label>
                        <Input
                          id="register-confirm-password"
                          name="confirmPassword"
                          type="password"
                          value={registerData.confirmPassword}
                          onChange={handleRegisterChange}
                          required
                          className="h-11"
                        />
                      </div>
                      <Button type="submit" className="w-full h-11 mt-2" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Creating account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter className="text-sm text-center text-muted-foreground pt-0">
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                  </CardFooter>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
