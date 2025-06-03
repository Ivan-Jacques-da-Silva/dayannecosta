// Este componente exibe o status do imóvel (disponível, vendido, reservado).
// Utiliza cores diferentes para cada status.

import { Badge } from "@/components/ui/badge"
import { cva } from "class-variance-authority"

type PropertyStatus = "available" | "sold" | "reserved"

interface PropertyStatusBadgeProps {
  status: PropertyStatus
  className?: string
}

const statusVariants = cva("", {
  variants: {
    status: {
      available: "bg-green-500/20 text-green-600 hover:bg-green-500/30",
      sold: "bg-red-500/20 text-red-600 hover:bg-red-500/30",
      reserved: "bg-amber-500/20 text-amber-600 hover:bg-amber-500/30",
    },
  },
  defaultVariants: {
    status: "available",
  },
})

const statusLabels: Record<PropertyStatus, string> = {
  available: "Available",
  sold: "Sold",
  reserved: "Reserved",
}

export default function PropertyStatusBadge({ status, className }: PropertyStatusBadgeProps) {
  return <Badge className={statusVariants({ status, className })}>{statusLabels[status]}</Badge>
}
