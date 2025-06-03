"use client"

import { motion } from "framer-motion"

interface PageTitleProps {
  title: string
  subtitle?: string
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="py-8 text-center">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-2">
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
