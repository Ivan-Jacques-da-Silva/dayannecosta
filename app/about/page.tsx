"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PageTitle from "@/components/page-title"
import { Award, Clock, Users } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      photo: "/placeholder.svg?height=300&width=300",
      bio: "With over 15 years of experience in Miami real estate, Sarah has built a reputation for client satisfaction and market expertise.",
    },
    {
      name: "Michael Rodriguez",
      role: "Senior Agent",
      photo: "/placeholder.svg?height=300&width=300",
      bio: "Michael specializes in luxury waterfront properties and has closed over $100 million in sales in the past 5 years.",
    },
    {
      name: "Jennifer Lee",
      role: "Marketing Director",
      photo: "/placeholder.svg?height=300&width=300",
      bio: "Jennifer brings creative marketing strategies that help our properties stand out in Miami's competitive market.",
    },
    {
      name: "David Martinez",
      role: "Property Manager",
      photo: "/placeholder.svg?height=300&width=300",
      bio: "David ensures all our rental properties are maintained to the highest standards for both owners and tenants.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="About Us" subtitle="Miami's premier real estate agency" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="my-12 grid md:grid-cols-2 gap-8 items-center"
      >
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2005, Miami Luxury Estates has grown from a small family business to one of the most trusted real
            estate agencies in South Florida. Our mission is to help clients find their perfect home or investment
            property in Miami's vibrant neighborhoods.
          </p>
          <p className="text-muted-foreground mb-6">
            We pride ourselves on our deep knowledge of the local market, personalized service, and commitment to
            excellence. Whether you're buying, selling, or renting, our team of experienced professionals is dedicated
            to making your real estate journey smooth and successful.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Properties Sold</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground">Client Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">15+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
          </div>
          <Button asChild>
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=600"
            alt="Miami Luxury Estates Office"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="my-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expertise</h3>
              <p className="text-muted-foreground">
                Our agents have in-depth knowledge of Miami's neighborhoods, property values, and market trends.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Service</h3>
              <p className="text-muted-foreground">
                We take the time to understand your needs and preferences to find your perfect property match.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Responsive</h3>
              <p className="text-muted-foreground">
                We're available when you need us, providing timely responses and updates throughout the process.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="my-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                  <Image src={member.photo || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
