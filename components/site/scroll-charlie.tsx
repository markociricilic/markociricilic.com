"use client"

import { useEffect, useRef, useState } from "react"
import { CharlieWalker } from "@/components/charlie-walker"

// Charlie walks down the hibiscus field as the page scrolls (desktop only).
export function ScrollCharlie() {
  const [charY, setCharY] = useState(27)
  const [charX, setCharX] = useState(75)
  const [charScale, setCharScale] = useState(0.15)
  const [isWalking, setIsWalking] = useState(false)
  const [facingRight, setFacingRight] = useState(true)
  const walkTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsWalking(true)
      if (walkTimer.current) clearTimeout(walkTimer.current)
      walkTimer.current = setTimeout(() => setIsWalking(false), 600)

      const progress = window.scrollY /
        Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      setCharY(27 + progress * 44)
      setCharScale(0.15 + progress * 1.2)
      setCharX(75 + Math.sin(progress * Math.PI * 8) * 13)
      setFacingRight(Math.cos(progress * Math.PI * 8) > 0)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (walkTimer.current) clearTimeout(walkTimer.current)
    }
  }, [])

  return (
    <div
      className="hidden lg:block"
      style={{
        position: "fixed",
        left: `${charX}%`,
        top: `${charY}vh`,
        transform: `translateX(-50%) translateY(-50%) scale(${charScale})`,
        transition: "top 0.18s ease-out, left 0.18s ease-out",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <CharlieWalker isWalking={isWalking} facingRight={facingRight} />
    </div>
  )
}
