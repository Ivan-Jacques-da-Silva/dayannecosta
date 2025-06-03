"use client"

import { useState, useEffect, createContext, useContext } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building, ChevronLeft, ChevronRight, Home, MessageSquare, Settings, Users } from "lucide-react"

// Criar um contexto para o sidebar
type SidebarContextType = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(() => {
    // Em telas menores, começar colapsado
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024
    }
    return false
  })

  // Adicionar um efeito para ajustar o estado quando a tela for redimensionada
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true)
      }
    }

    // Configurar o estado inicial
    handleResize()

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", handleResize)

    // Limpar listener
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <Home className="w-5 h-5" />,
    },
    {
      title: "Properties",
      href: "/admin/properties",
      icon: <Building className="w-5 h-5" />,
    },
    {
      title: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ]

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div
        className={`transition-all duration-300 z-30 ${
          collapsed
            ? "w-16 border-r bg-card/40 h-screen sticky top-0"
            : "w-64 border-r bg-card/40 h-screen sticky top-0 md:relative md:block"
        } ${!collapsed && "fixed md:static inset-y-0 left-0"}`}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-4 border-b justify-between">
            {!collapsed && (
              <Link href="/admin" className="flex items-center gap-2 font-bold">
                <Building className="w-5 h-5" />
                <span>Admin Panel</span>
              </Link>
            )}
            {collapsed && (
              <Link href="/admin" className="mx-auto">
                <Building className="w-5 h-5" />
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className={collapsed ? "mx-auto" : ""}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>

          <ScrollArea className="flex-1 py-4">
            <nav className="grid gap-1 px-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t">
            <Link
              href="/"
              className={`flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground ${collapsed ? "justify-center" : ""}`}
            >
              <Home className="w-5 h-5" />
              {!collapsed && <span>Back to Website</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay para fechar o sidebar em dispositivos móveis */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setCollapsed(true)}
          aria-hidden="true"
        />
      )}
    </SidebarContext.Provider>
  )
}
