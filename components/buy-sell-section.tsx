"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BuySellForm } from "@/components/buy-sell-form"
import { Home, DollarSign, TrendingUp, Users } from "lucide-react"

export default function BuySellSection() {
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState<"buy" | "sell">("buy")

  const handleOpenForm = (type: "buy" | "sell") => {
    setFormType(type)
    setShowForm(true)
  }

  const stats = [
    { icon: Home, label: "Properties Sold", value: "500+" },
    { icon: DollarSign, label: "Total Sales", value: "$250M+" },
    { icon: TrendingUp, label: "Average Days", value: "15" },
    { icon: Users, label: "Happy Clients", value: "1000+" },
  ]

  return (
    <>
      {/* <section id="buy-sell" className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/placeholder.svg?height=1200&width=2000')" }}
        />
      </section> */}

      {/* Form Modal */}
      {showForm && (
        <BuySellForm
          type={formType}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  )
}