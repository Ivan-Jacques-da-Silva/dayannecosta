
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
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Make Your Move?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/80 max-w-3xl mx-auto"
            >
              Whether you're looking to buy your dream home or sell your current property, 
              our expert team is here to guide you through every step of the process.
            </motion.p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                onClick={() => handleOpenForm("buy")}
                className="h-16 px-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Home className="mr-3 h-6 w-6" />
                I Want to Buy
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                onClick={() => handleOpenForm("sell")}
                className="h-16 px-12 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <DollarSign className="mr-3 h-6 w-6" />
                I Want to Sell
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
