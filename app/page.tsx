"use client"

import { useEffect, useState } from "react"
import Terminal from "@/components/terminal"
import BootSequence from "@/components/boot-sequence"
import { CRTToggle } from "@/components/crt-toggle"
import { CookingGallery } from "@/components/cooking-gallery"

export default function Home() {
  const [booting, setBooting] = useState(true)
  const [showTerminal, setShowTerminal] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url("/background.jpg")',
          backgroundPosition: "center center",
          filter: "brightness(0.8) contrast(1.1)",
        }}
        aria-hidden="true"
      >
        {/* Overlay for better text readability - removed blur effect */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute top-4 right-4 z-50">
        <CRTToggle />
      </div>

      <div className="container mx-auto px-4 py-8 h-screen flex flex-col relative z-10">
        {booting ? (
          <BootSequence />
        ) : showTerminal ? (
          <Terminal onQuit={() => setShowTerminal(false)} />
        ) : (
          <CookingGallery onReturn={() => setShowTerminal(true)} />
        )}
      </div>
    </main>
  )
}

