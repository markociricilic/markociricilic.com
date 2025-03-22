"use client"

import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export function MobileHint() {
  const isMobile = useMobile()
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowHint(false)
      }, 5000) // Hide after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [isMobile])

  if (!isMobile || !showHint) return null

  return (
    <div className="fixed bottom-20 left-0 right-0 mx-auto w-max bg-black/80 text-white text-xs px-3 py-2 rounded-full border border-white/30 z-50 animate-pulse">
      Tap buttons to navigate - no typing needed!
    </div>
  )
}
