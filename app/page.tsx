"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"

// Sample model data for slider with different texts
const models = [
  {
    id: 1,
    name: "Olivia",
    image: "/beautiful-model-portrait-blue.png",
    username: "@olivia_star",
    title: "Step Into Your Fantasy",
    description: "Browse thousands of creators and Playmates eager to make your dreams come true.",
  },
  {
    id: 2,
    name: "Sophia",
    image: "/elegant-model-portrait.png",
    username: "@sophia_night",
    title: "Exclusive Content Awaits",
    description: "Dive into a world of premium content and intimate conversations with stunning creators.",
  },
  {
    id: 3,
    name: "Emma",
    image: "/stylish-model-portrait.png",
    username: "@emma_style",
    title: "Where Dreams Come True",
    description: "Connect with amazing creators and explore content tailored just for you.",
  },
  {
    id: 4,
    name: "Ava",
    image: "/moody-model-portrait.png",
    username: "@ava_dreams",
    title: "Unleash Your Desires",
    description: "Experience the ultimate platform for adult entertainment and personal connections.",
  },
]

export default function LoginPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  })

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  // Check if we're at the boundaries
  const isFirstSlide = currentSlide === 0
  const isLastSlide = currentSlide === models.length - 1

  // Auto rotate slider every 7 seconds (but stop at the last slide)
  useEffect(() => {
    if (isDragging || isLastSlide) return // Don't auto-rotate while dragging or at last slide

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= models.length - 1) return prev // Stop at last slide
        return prev + 1
      })
    }, 7000)

    return () => clearInterval(interval)
  }, [isDragging, isLastSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && !isFirstSlide) {
        setCurrentSlide((prev) => prev - 1)
      } else if (e.key === "ArrowRight" && !isLastSlide) {
        setCurrentSlide((prev) => prev + 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFirstSlide, isLastSlide])

  // Wheel/scroll navigation
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0 && !isLastSlide) {
          setCurrentSlide((prev) => prev + 1)
        } else if (e.deltaY < 0 && !isFirstSlide) {
          setCurrentSlide((prev) => prev - 1)
        }
      }, 50)
    }

    const leftSide = document.getElementById("slider-container")
    if (leftSide) {
      leftSide.addEventListener("wheel", handleWheel, { passive: false })
      return () => leftSide.removeEventListener("wheel", handleWheel)
    }
  }, [isFirstSlide, isLastSlide])

  // Mouse swipe navigation with real-time feedback
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      setStartX(e.clientX)
      setCurrentX(e.clientX)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      setCurrentX(e.clientX)
      const deltaX = e.clientX - startX

      // Limit drag offset at boundaries
      let limitedOffset = deltaX
      if (isFirstSlide && deltaX > 0) {
        limitedOffset = Math.min(deltaX, 50) // Limit right drag on first slide
      }
      if (isLastSlide && deltaX < 0) {
        limitedOffset = Math.max(deltaX, -50) // Limit left drag on last slide
      }

      setDragOffset(limitedOffset)
    }

    const handleMouseUp = () => {
      if (!isDragging) return

      const deltaX = currentX - startX
      const threshold = 80 // minimum distance for swipe

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && !isFirstSlide) {
          // Swipe right - go to previous slide
          setCurrentSlide((prev) => prev - 1)
        } else if (deltaX < 0 && !isLastSlide) {
          // Swipe left - go to next slide
          setCurrentSlide((prev) => prev + 1)
        }
      }

      setIsDragging(false)
      setStartX(0)
      setCurrentX(0)
      setDragOffset(0)
    }

    const sliderContainer = document.getElementById("slider-container")
    if (sliderContainer) {
      sliderContainer.addEventListener("mousedown", handleMouseDown)
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        sliderContainer.removeEventListener("mousedown", handleMouseDown)
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, startX, currentX, isFirstSlide, isLastSlide])

  // Touch swipe navigation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true)
      setStartX(e.touches[0].clientX)
      setCurrentX(e.touches[0].clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      e.preventDefault()
      setCurrentX(e.touches[0].clientX)
      const deltaX = e.touches[0].clientX - startX

      // Limit drag offset at boundaries
      let limitedOffset = deltaX
      if (isFirstSlide && deltaX > 0) {
        limitedOffset = Math.min(deltaX, 50)
      }
      if (isLastSlide && deltaX < 0) {
        limitedOffset = Math.max(deltaX, -50)
      }

      setDragOffset(limitedOffset)
    }

    const handleTouchEnd = () => {
      if (!isDragging) return

      const deltaX = currentX - startX
      const threshold = 80

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && !isFirstSlide) {
          setCurrentSlide((prev) => prev - 1)
        } else if (deltaX < 0 && !isLastSlide) {
          setCurrentSlide((prev) => prev + 1)
        }
      }

      setIsDragging(false)
      setStartX(0)
      setCurrentX(0)
      setDragOffset(0)
    }

    const sliderContainer = document.getElementById("slider-container")
    if (sliderContainer) {
      sliderContainer.addEventListener("touchstart", handleTouchStart, { passive: false })
      sliderContainer.addEventListener("touchmove", handleTouchMove, { passive: false })
      sliderContainer.addEventListener("touchend", handleTouchEnd)

      return () => {
        sliderContainer.removeEventListener("touchstart", handleTouchStart)
        sliderContainer.removeEventListener("touchmove", handleTouchMove)
        sliderContainer.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [isDragging, startX, currentX, isFirstSlide, isLastSlide])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would go the authentication logic
    console.log("Form submitted:", formData)
  }

  const nextSlide = () => {
    if (!isLastSlide) {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const prevSlide = () => {
    if (!isFirstSlide) {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  const currentModel = models[currentSlide]

  return (
    <div className="min-h-screen flex flex-col relative bg-black">
      <main className="flex-grow flex flex-col md:flex-row min-h-screen md:justify-center md:gap-4 md:items-center">
        {/* Left Side - Slider with Black Background */}
        <div
          id="slider-container"
          className="w-full md:w-[40%] md:max-w-lg h-[40vh] md:h-screen relative bg-black flex items-center justify-center select-none"
          style={{ userSelect: "none", cursor: isDragging ? "grabbing" : "grab" }}
        >
          {/* Previous Arrow - Hidden on first slide */}
          {/* <button
            onClick={prevSlide}
            disabled={isFirstSlide}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300 backdrop-blur-sm",
              isFirstSlide
                ? "bg-black/20 text-white/30 cursor-not-allowed"
                : "bg-black/50 hover:bg-black/70 text-white cursor-pointer",
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button> */}

          {/* Next Arrow - Hidden on last slide */}
          {/* <button
            onClick={nextSlide}
            disabled={isLastSlide}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300 backdrop-blur-sm",
              isLastSlide
                ? "bg-black/20 text-white/30 cursor-not-allowed"
                : "bg-black/50 hover:bg-black/70 text-white cursor-pointer",
            )}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button> */}

          <div className="flex flex-col items-center justify-center max-w-md mx-auto px-6">
            {/* Carousel Container - Contains both image and text */}
            <div className="relative overflow-hidden w-80 mb-8">
              <div
                className={cn("flex transition-transform ease-out", isDragging ? "duration-0" : "duration-500")}
                style={{
                  transform: `translateX(${-currentSlide * 320 + dragOffset}px)`,
                  width: `${models.length * 320}px`,
                }}
              >
                {models.map((model, index) => (
                  <div key={model.id} className="w-80 flex-shrink-0 flex flex-col items-center">
                    {/* Image */}
                    <div className="relative w-80 h-96 model-image-vignette-strong mb-8">
                      <img
                        src={model.image || "/placeholder.svg"}
                        alt={model.name}
                        className="w-full h-full object-cover object-center rounded-lg select-none pointer-events-none"
                        style={{
                          userSelect: "none",
                          WebkitUserSelect: "none",
                          MozUserSelect: "none",
                          msUserSelect: "none",
                        }}
                        draggable={false}
                      />
                    </div>

                    {/* Text for this slide */}
                    <div className="text-center w-full px-4">
                      <h1
                        className="text-2xl md:text-3xl font-bold text-white mb-4 select-none"
                        style={{ userSelect: "none" }}
                      >
                        {model.title}
                      </h1>
                      <p
                        className="text-white/70 text-xs leading-relaxed max-w-sm mx-auto mb-6 select-none"
                        style={{ userSelect: "none" }}
                      >
                        {model.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation dots - keep these outside the carousel */}
            <div className="flex justify-center space-x-2 mt-1">
              {models.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentSlide ? "bg-white w-6" : "bg-white/50 hover:bg-white/80",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Form (Dark Theme) */}
        <div className="w-full md:w-[40%] md:max-w-lg bg-black flex items-center justify-center relative min-h-screen">
          <div className="flex flex-col items-center justify-center max-w-lg mx-auto px-6 md:px-12">
            {/* Logo - aligned with image */}
            <div className="flex justify-center">
              <img src="/fanlogo.svg" alt="Logo" className="w-48 h-auto object-contain" />
            </div>

            {/* Form Section */}
            <div className="w-full mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <form onSubmit={handleSubmit} className="space-y-4 relative">
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium text-white/80">
                      Электронная почта
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      placeholder="wcpdfbww@demainmail.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-white/80">
                      Пароль
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-primary pr-10 text-sm"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors text-sm mt-6"
                  >
                    АВТОРИЗУЙТЕСЬ
                  </Button>

                  <div className="text-center mt-4 flex items-center justify-center space-x-2">
                    <Link href="/forgot-password" className="text-primary text-sm hover:underline">
                      Забыли пароль?
                    </Link>
                    <span className="text-white/50">•</span>
                    <Link href="/register" className="text-primary text-sm hover:underline">
                      Регистрация
                    </Link>
                  </div>

                  <div className="space-y-3 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-white border-primary text-sm flex items-center justify-center"
                    >
                      <svg className="h-4 w-4 mr-2 ml-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      ВОЙДИТЕ С ПОМОЩЬЮ X
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white border-blue-600 text-sm flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      ВОЙТИ ЧЕРЕЗ GOOGLE
                    </Button>
                  </div>

                  <div className="text-left text-xs text-white/60 leading-relaxed mt-4">
                    Входя в систему и используя OnlyFans, вы соглашаетесь с нашими{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Условиями обслуживания
                    </Link>{" "}
                    и{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Политикой конфиденциальности
                    </Link>{" "}
                    и подтверждаете, что вам не менее 18 лет.
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Footer - positioned at the same level as navigation dots */}
            <div className="flex justify-between w-full mt-[15px]">
              <Footer variant="login" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
