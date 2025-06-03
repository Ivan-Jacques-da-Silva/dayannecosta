"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import AdminSidebar from "@/components/admin-sidebar"
import MobileSidebarToggle from "@/components/mobile-sidebar-toggle"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, isAdmin } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!user || !isAdmin) {
      router.push("/login?redirect=/admin")
    }
  }, [user, isAdmin, router])

  if (!user || !isAdmin) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen relative">
      <AdminSidebar />
      <div className="flex-1">
        <MobileSidebarToggle onClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-4 md:p-8 pt-16 md:pt-8">{children}</div>
      </div>
    </div>
  )
}
