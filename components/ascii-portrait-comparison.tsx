"use client"

import { AsciiPortraitCanvas } from "./ascii-portrait-canvas"

export function AsciiPortraitComparison() {
  // Using fixed values as requested
  const contrast = 1.6
  const brightness = 0.8

  return (
    <div className="space-y-4">
      <AsciiPortraitCanvas width={100} height={300} contrast={contrast} brightness={brightness} />
      <div className="text-center text-xs text-muted-foreground mt-2">ASCII Art Portrait</div>
    </div>
  )
}

