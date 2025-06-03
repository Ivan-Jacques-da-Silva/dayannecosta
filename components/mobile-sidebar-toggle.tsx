"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface MobileSidebarToggleProps {
  onClick: () => void
}

export default function MobileSidebarToggle({ onClick }: MobileSidebarToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden fixed top-4 left-4 z-40 bg-background/80 backdrop-blur-sm shadow-sm"
      onClick={onClick}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}
