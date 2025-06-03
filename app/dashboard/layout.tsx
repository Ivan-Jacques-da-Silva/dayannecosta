"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import DashboardSidebar from "@/components/dashboard-sidebar"
import MobileSidebarToggle from "@/components/mobile-sidebar-toggle"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push("/login?redirect=/dashboard")
    }
  }, [user, router])

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen relative">
      <DashboardSidebar />
      <div className="flex-1">
        <MobileSidebarToggle onClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-4 md:p-8 pt-16 md:pt-8">{children}</div>
      </div>
    </div>
  )
}
