"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ImageSliderProps {
  images: {
    id: number
    src: string
    alt: string
    name: string
    username: string
  }[]
  autoRotateInterval?: number
}

export function ImageSlider({ images, autoRotateInterval = 5000 }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto rotate slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [images.length, autoRotateInterval])

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full h-full overflow-hidden protected-content">
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={image.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0",
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundSize: "cover",
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* Model info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold">{image.name}</h3>
            <p className="text-white/80">{image.username}</p>
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/80",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
