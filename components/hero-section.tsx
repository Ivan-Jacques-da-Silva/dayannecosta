"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="relative h-[600px] rounded-lg overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=1200&width=2000')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>

      <div className="relative h-full flex flex-col justify-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Find Your Dream Home in Miami</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Discover luxury properties in Miami's most desirable neighborhoods. From waterfront estates to downtown
            condos, we have the perfect home for you.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/properties">Browse Properties</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
