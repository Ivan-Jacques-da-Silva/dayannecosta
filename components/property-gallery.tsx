// Este componente exibe a galeria de imagens do imóvel.
// Permite navegação entre imagens e visualização em tela cheia.

"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Expand, Play } from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
  videoUrl?: string
}

export default function PropertyGallery({ images, videoUrl }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fullscreenIndex, setFullscreenIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const nextFullscreenImage = () => {
    setFullscreenIndex((prev) => (prev + 1) % images.length)
  }

  const prevFullscreenImage = () => {
    setFullscreenIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index)
  }

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-[16/9] rounded-lg overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Property image ${currentIndex + 1}`}
              fill
              className="object-cover transition-transform duration-500"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
          </motion.div>
        </AnimatePresence>

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""}`}
        />

        <Button
          variant="ghost"
          size="icon"
          className={`absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          onClick={prevImage}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="sr-only">Previous image</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          onClick={nextImage}
        >
          <ChevronRight className="w-5 h-5" />
          <span className="sr-only">Next image</span>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`absolute right-2 top-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
              onClick={() => openFullscreen(currentIndex)}
            >
              <Expand className="w-5 h-5" />
              <span className="sr-only">View fullscreen</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl p-0 bg-transparent border-none">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={images[fullscreenIndex] || "/placeholder.svg"}
                alt={`Property image ${fullscreenIndex + 1}`}
                fill
                className="object-contain"
              />

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full"
                onClick={prevFullscreenImage}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="sr-only">Previous image</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full"
                onClick={nextFullscreenImage}
              >
                <ChevronRight className="w-5 h-5" />
                <span className="sr-only">Next image</span>
              </Button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-sm">
                  {fullscreenIndex + 1} / {images.length}
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <div className="bg-primary/90 rounded-full p-4 shadow-lg hover:bg-primary transition-colors">
              <Play className="w-8 h-8 text-white" fill="white" />
            </div>
          </a>
        )}

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-video rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
              index === currentIndex ? "border-primary" : "border-transparent"
            } hover:opacity-90`}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Property thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
