// Este componente exibe o formulário de contato com o corretor.
// Permite que o usuário envie uma mensagem diretamente para o corretor.

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Phone, User } from "lucide-react"

interface ContactAgentFormProps {
  propertyTitle: string
  realtorName: string
  realtorEmail: string
  realtorPhone: string
}

export default function ContactAgentForm({
  propertyTitle,
  realtorName,
  realtorEmail,
  realtorPhone,
}: ContactAgentFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in ${propertyTitle}. Please contact me with more information.`,
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

    // Simulando envio de formulário
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent",
      description: `Your message has been sent to ${realtorName}. They will contact you shortly.`,
    })

    setIsSubmitting(false)
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Contact Agent</h3>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="font-medium">{realtorName}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{realtorPhone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{realtorEmail}</span>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  )
}
