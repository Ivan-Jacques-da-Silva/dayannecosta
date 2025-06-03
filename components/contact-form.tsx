"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { sendContactMessage } from "@/services/message-service"

interface ContactFormProps {
  propertyId?: string
}

export default function ContactForm({ propertyId }: ContactFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: propertyId ? "I'm interested in this property and would like more information." : "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await sendContactMessage({
        ...formData,
        subject: propertyId ? "Property Inquiry" : "Contact Form Submission",
        propertyId,
      })

      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: propertyId ? "I'm interested in this property and would like more information." : "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Textarea
          name="message"
          placeholder="Your Message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}
