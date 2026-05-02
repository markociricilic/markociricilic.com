"use client"

import { type PointerEvent, useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CardItem {
  id: string
  title: string
  description?: string
  imageUrl: string
  category: "cooking" | "photography" | "art"
}

interface ImageCarouselProps {
  items: CardItem[]
  isDarkMode: boolean
  countries?: string[] // Optional list of countries for navigation (photography)
}

export function ImageCarousel({ items, isDarkMode, countries }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCenterHovered, setIsCenterHovered] = useState(false)
  const hoverNavigationLocked = useRef(false)
  const holdDelay = useRef<number | null>(null)
  const holdInterval = useRef<number | null>(null)
  const pointerPosition = useRef<{ x: number; y: number } | null>(null)
  const centerCardWidth = 280
  const expandedCenterScale = 1.45

  const clearHoldNavigation = useCallback(() => {
    if (holdDelay.current !== null) {
      window.clearTimeout(holdDelay.current)
      holdDelay.current = null
    }

    if (holdInterval.current !== null) {
      window.clearInterval(holdInterval.current)
      holdInterval.current = null
    }
  }, [])

  useEffect(() => {
    return () => clearHoldNavigation()
  }, [clearHoldNavigation])

  const updatePointerPosition = (event: PointerEvent) => {
    pointerPosition.current = { x: event.clientX, y: event.clientY }
  }

  const isPointerOverDirection = (direction: -1 | 1) => {
    if (!pointerPosition.current) return false

    const hoveredElement = document.elementFromPoint(pointerPosition.current.x, pointerPosition.current.y)
    const cardElement = hoveredElement?.closest("[data-carousel-position]")
    if (!cardElement) return false

    const position = Number(cardElement.getAttribute("data-carousel-position"))
    return position !== 0 && Math.sign(position) === direction
  }

  // Find the first image index for a given country
  const goToCountry = (country: string) => {
    const index = items.findIndex((item) => 
      item.title.toLowerCase().startsWith(country.toLowerCase())
    )
    if (index !== -1) {
      setIsCenterHovered(false)
      hoverNavigationLocked.current = false
      setCurrentIndex(index)
    }
  }

  // Get current country from title (e.g., "Spain 2025:" -> "Spain")
  const getCurrentCountry = () => {
    const title = items[currentIndex]?.title || ""
    const match = title.match(/^([A-Za-z]+)/)
    return match ? match[1] : null
  }

  const activeCountry = getCurrentCountry()

  // Get items in the correct order for display (2 before, current, 2 after)
  const getVisibleItems = () => {
    const result = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + items.length) % items.length
      result.push({ ...items[index], position: i })
    }
    return result
  }

  const goToPrevious = () => {
    setIsCenterHovered(false)
    hoverNavigationLocked.current = false
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setIsCenterHovered(false)
    hoverNavigationLocked.current = false
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const goToIndex = (index: number) => {
    setIsCenterHovered(false)
    hoverNavigationLocked.current = false
    setCurrentIndex(index)
  }

  const goToPosition = (position: number) => {
    setIsCenterHovered(false)
    setCurrentIndex((prev) => (prev + position + items.length) % items.length)
  }

  const continueHoldNavigation = (direction: -1 | 1) => {
    if (!isPointerOverDirection(direction)) {
      clearHoldNavigation()
      hoverNavigationLocked.current = false
      return false
    }

    goToPosition(direction)
    return true
  }

  const startHoldNavigation = (direction: -1 | 1, moveImmediately: boolean) => {
    clearHoldNavigation()

    if (moveImmediately) {
      if (!continueHoldNavigation(direction)) return
    }

    holdDelay.current = window.setTimeout(() => {
      if (!continueHoldNavigation(direction)) return
      holdInterval.current = window.setInterval(() => {
        continueHoldNavigation(direction)
      }, 650)
    }, 1000)
  }

  const handleCardPointerEnter = (position: number, pointerType: string) => {
    if (pointerType !== "mouse") return

    if (position === 0) {
      hoverNavigationLocked.current = false
      setIsCenterHovered(true)
      clearHoldNavigation()
      return
    }

    const direction = position < 0 ? -1 : 1

    if (hoverNavigationLocked.current) return
    hoverNavigationLocked.current = true
    goToPosition(position)
    startHoldNavigation(direction, false)
  }

  const handleCardPointerDown = (position: number) => {
    if (position === 0) return
    startHoldNavigation(position < 0 ? -1 : 1, false)
  }

  const handleCardPointerLeave = (position: number, pointerType: string) => {
    if (pointerType !== "mouse") return

    clearHoldNavigation()

    if (position === 0) {
      setIsCenterHovered(false)
    } else {
      hoverNavigationLocked.current = false
    }
  }

  const handleCarouselMouseLeave = () => {
    hoverNavigationLocked.current = false
    setIsCenterHovered(false)
    clearHoldNavigation()
  }

  const visibleItems = getVisibleItems()
  const currentItem = items[currentIndex]

  return (
    <div className="w-full">
      {/* Country Navigation - Only shown if countries prop is provided */}
      {countries && countries.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-nowrap justify-center gap-1">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => goToCountry(country)}
                className={`px-2 py-1 text-[10px] font-mono rounded transition-all whitespace-nowrap ${
                  activeCountry?.toLowerCase() === country.toLowerCase()
                    ? isDarkMode 
                      ? "bg-white text-black" 
                      : "bg-black text-white"
                    : isDarkMode 
                      ? "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white" 
                      : "bg-black/10 text-black/70 hover:bg-black/20 hover:text-black"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Carousel Container */}
      <div
        className="relative"
        onMouseLeave={handleCarouselMouseLeave}
        onPointerMove={updatePointerPosition}
        onPointerUp={clearHoldNavigation}
        onPointerCancel={clearHoldNavigation}
      >
        {/* Cards Container */}
        <div 
          className="flex items-center justify-center gap-4 overflow-visible py-4"
          style={{
            minHeight: `${centerCardWidth * (4 / 3) * expandedCenterScale + 32}px`,
          }}
        >
          {visibleItems.map((card) => {
            const isCenter = card.position === 0
            const isAdjacent = Math.abs(card.position) === 1
            const isEdge = Math.abs(card.position) === 2

            return (
              <div
                key={`${card.id}-${card.position}`}
                data-carousel-position={card.position}
                onPointerEnter={(event) => {
                  updatePointerPosition(event)
                  handleCardPointerEnter(card.position, event.pointerType)
                }}
                onPointerDown={(event) => {
                  event.preventDefault()
                  updatePointerPosition(event)
                  handleCardPointerDown(card.position)
                }}
                onPointerLeave={(event) => handleCardPointerLeave(card.position, event.pointerType)}
                onContextMenu={(event) => event.preventDefault()}
                className={`flex-shrink-0 rounded-lg overflow-hidden ${
                  isDarkMode ? "border border-white/10" : "border border-black/10"
                } ${isCenter ? "z-20 opacity-100" : ""} ${
                  isAdjacent ? "z-10 opacity-70" : ""
                } ${isEdge ? "z-0 opacity-40" : ""}`}
                style={{
                  width: isCenter ? `${centerCardWidth}px` : isAdjacent ? "180px" : "140px",
                  transform: `scale(${isCenter ? (isCenterHovered ? expandedCenterScale : 1) : isAdjacent ? 0.9 : 0.8})`,
                  transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease-out",
                  transformOrigin: "center",
                }}
              >
                {/* Image */}
                <div className="w-full aspect-[3/4] overflow-hidden bg-zinc-800">
                  {card.imageUrl ? (
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${
                      isDarkMode ? "bg-zinc-800 text-zinc-600" : "bg-zinc-200 text-zinc-400"
                    }`}>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Scrollbar / Navigation */}
      <div className={`flex items-center gap-2 mt-4 px-2 ${
        isDarkMode ? "text-white" : "text-black"
      }`}>
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className={`p-1 rounded transition-colors ${
            isDarkMode 
              ? "hover:bg-white/10 text-white/70 hover:text-white" 
              : "hover:bg-black/10 text-black/70 hover:text-black"
          }`}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <div className={`flex-1 h-1 rounded-full overflow-hidden ${
          isDarkMode ? "bg-white/20" : "bg-black/20"
        }`}>
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isDarkMode ? "bg-white/60" : "bg-black/60"
            }`}
            style={{
              width: `${((currentIndex + 1) / items.length) * 100}%`,
            }}
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className={`p-1 rounded transition-colors ${
            isDarkMode 
              ? "hover:bg-white/10 text-white/70 hover:text-white" 
              : "hover:bg-black/10 text-black/70 hover:text-black"
          }`}
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? isDarkMode ? "bg-white" : "bg-black"
                : isDarkMode ? "bg-white/30 hover:bg-white/50" : "bg-black/30 hover:bg-black/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Title and Description */}
      <div className="text-center mt-4 mb-2 px-4">
        <span className={`text-xs uppercase tracking-wider ${
          isDarkMode ? "text-rose-400" : "text-rose-600"
        }`}>
          {currentItem.category}
        </span>
        <h3 className={`font-semibold mt-1 text-base ${
          isDarkMode ? "text-white" : "text-black"
        }`}>
          {currentItem.title}
        </h3>
        {currentItem.description && (
          <p className={`text-sm mt-1 ${
            isDarkMode ? "text-zinc-400" : "text-zinc-600"
          }`}>
            {currentItem.description}
          </p>
        )}
      </div>
    </div>
  )
}
