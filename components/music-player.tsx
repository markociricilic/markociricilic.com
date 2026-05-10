"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

interface MusicItem {
  title: string
  artist: string
  album: string
  spotifyTrackId: string
}

interface MusicPlayerProps {
  items: MusicItem[]
  isDarkMode: boolean
}

export function MusicPlayer({ items, isDarkMode }: MusicPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const swipeStart = useRef<{ x: number; y: number; pointerId: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsLengthRef = useRef(items.length)
  const lastWheelTime = useRef(0)
  itemsLengthRef.current = items.length
  const SWIPE_THRESHOLD = 40

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastWheelTime.current < 400) return
      lastWheelTime.current = now
      if (e.deltaY > 0) setCurrentIndex((prev) => (prev + 1) % itemsLengthRef.current)
      else setCurrentIndex((prev) => (prev - 1 + itemsLengthRef.current) % itemsLengthRef.current)
    }
    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [])

  const getVisibleItems = () => {
    const result = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + items.length) % items.length
      result.push({ ...items[index], _index: index, position: i })
    }
    return result
  }

  const goToPrevious = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % items.length)

  const visibleItems = getVisibleItems()

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="flex flex-col items-center gap-1.5 py-4"
        onPointerDown={(e) => {
          if (e.pointerType === "touch") {
            swipeStart.current = { x: e.clientX, y: e.clientY, pointerId: e.pointerId }
          }
        }}
        onPointerUp={(e) => {
          if (swipeStart.current && e.pointerId === swipeStart.current.pointerId) {
            const deltaY = e.clientY - swipeStart.current.y
            const deltaX = e.clientX - swipeStart.current.x
            swipeStart.current = null
            if (Math.abs(deltaY) > SWIPE_THRESHOLD && Math.abs(deltaY) > Math.abs(deltaX)) {
              if (deltaY > 0) goToPrevious()
              else goToNext()
            }
          }
        }}
        onPointerCancel={() => { swipeStart.current = null }}
      >
        {visibleItems.map((item) => {
          const isCenter = item.position === 0
          const isAdjacent = Math.abs(item.position) === 1
          const isEdge = Math.abs(item.position) === 2

          return (
            <div
              key={`${item._index}-${item.position}`}
              onClick={() => {
                if (!isCenter) setCurrentIndex(item._index)
              }}
              className={`w-full rounded-xl overflow-hidden border transition-all duration-500 ${
                isDarkMode ? "border-white/10" : "border-black/10"
              } ${!isCenter ? "cursor-pointer" : ""}`}
              style={{
                opacity: isCenter ? 1 : isAdjacent ? 0.55 : 0.25,
                transform: `scale(${isCenter ? 1 : isAdjacent ? 0.94 : 0.88})`,
                transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease-out",
              }}
            >
              {isCenter ? (
                <>
                  <iframe
                    key={item.spotifyTrackId}
                    src={`https://open.spotify.com/embed/track/${item.spotifyTrackId}?utm_source=generator${isDarkMode ? "&theme=0" : ""}`}
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="border-0 block"
                  />
                  <div className={`px-4 py-3 ${isDarkMode ? "bg-zinc-900" : "bg-zinc-50"}`}>
                    <p className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-black"}`}>{item.title}</p>
                    <p className={`text-xs mt-0.5 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>{item.artist} · {item.album}</p>
                  </div>
                </>
              ) : (
                <div className={`px-4 py-3 flex items-center gap-3 ${isDarkMode ? "bg-zinc-900" : "bg-zinc-50"}`}>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm truncate ${isDarkMode ? "text-white" : "text-black"}`}>{item.title}</p>
                    <p className={`text-xs truncate mt-0.5 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>{item.artist} · {item.album}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className={`flex items-center justify-center gap-3 mt-1 ${isDarkMode ? "text-white" : "text-black"}`}>
        <button
          onClick={goToPrevious}
          className={`p-1 rounded transition-colors ${
            isDarkMode
              ? "hover:bg-white/10 text-white/70 hover:text-white"
              : "hover:bg-black/10 text-black/70 hover:text-black"
          }`}
          aria-label="Previous song"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <span className={`text-xs font-mono ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
          {currentIndex + 1} / {items.length}
        </span>
        <button
          onClick={goToNext}
          className={`p-1 rounded transition-colors ${
            isDarkMode
              ? "hover:bg-white/10 text-white/70 hover:text-white"
              : "hover:bg-black/10 text-black/70 hover:text-black"
          }`}
          aria-label="Next song"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
