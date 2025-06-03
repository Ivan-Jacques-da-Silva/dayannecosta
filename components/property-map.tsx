// Este componente exibe o mapa com a localização do imóvel.
// Futuramente será integrado com API de mapas real.

"use client"

import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"

interface PropertyMapProps {
  latitude: number
  longitude: number
  address: string
}

export default function PropertyMap({ latitude, longitude, address }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulação de API de mapas
    // Em uma aplicação real, seria integrado com Google Maps, Mapbox, etc.
    const initMap = () => {
      if (!mapRef.current) return

      const mapContainer = mapRef.current

      // Criando uma representação visual simples do mapa
      mapContainer.innerHTML = `
        <div class="w-full h-full flex items-center justify-center bg-muted/50 relative">
          <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div class="text-center p-4">
            <div class="mb-2 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-primary">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <p class="font-medium">${address}</p>
            <p class="text-sm text-muted-foreground mt-1">Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}</p>
            <p class="text-xs text-muted-foreground mt-4">Map display simulated for demo purposes</p>
          </div>
        </div>
      `

      // Adicionando estilo para o padrão de grade
      const style = document.createElement("style")
      style.textContent = `
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(127, 127, 127, 0.2) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(127, 127, 127, 0.2) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `
      document.head.appendChild(style)
    }

    initMap()

    return () => {
      // Limpeza se necessário
    }
  }, [latitude, longitude, address])

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[400px] rounded-lg overflow-hidden border"></div>
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="font-medium text-sm">{address}</span>
        </div>
      </div>
    </div>
  )
}
