"use client"

import { useState, useEffect, useRef } from "react"

const FRAME_COUNT = 16
const FRAME_DELAY_MS = 90

interface CharlieWalkerProps {
  isWalking: boolean
  facingRight: boolean
}

export function CharlieWalker({ isWalking, facingRight }: CharlieWalkerProps) {
  const [frameIndex, setFrameIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (isWalking) {
      intervalRef.current = setInterval(() => {
        setFrameIndex(prev => (prev + 1) % FRAME_COUNT)
      }, FRAME_DELAY_MS)
    } else {
      setFrameIndex(0)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isWalking])

  const padded = String(frameIndex).padStart(2, "0")
  const src = `/images/charlie/frame_${padded}_delay-0.09s.gif`

  return (
    <img
      src={src}
      alt=""
      width={220}
      style={{
        display: "block",
        transform: facingRight ? "scaleX(-1)" : undefined,
      }}
    />
  )
}
