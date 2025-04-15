"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CookingGalleryProps {
  onReturn: () => void
}

// Sample cooking images - replace these with your actual images
const cookingImages = [
  {
    id: 1,
    src: "/cooking/dish1.jpg",
  },
  {
    id: 5,
    src: "/cooking/dish5.jpg",
  },
  {
    id: 7,
    src: "/cooking/dish7.jpg",
  },
  {
    id: 6,
    src: "/cooking/dish6.jpg",
  },
  {
    id: 3,
    src: "/cooking/dish3.jpg",
  },
  {
    id: 9,
    src: "/cooking/dish9.jpg",
  },
  {
    id: 4,
    src: "/cooking/dish4.jpg",
  },
  {
    id: 2,
    src: "/cooking/dish2.jpg",
  },
  {
    id: 10,
    src: "/cooking/dish10.jpg",
  },
  {
    id: 8,
    src: "/cooking/dish8.jpg",
  },
  {
    id: 11,
    src: "/cooking/dish11.jpg",
  },
]

export function CookingGallery({ onReturn }: CookingGalleryProps) {
    const [enlargedImage, setEnlargedImage] = useState<number | null>(null)
    const [windowSize, setWindowSize] = useState({
      width: typeof window !== "undefined" ? window.innerWidth : 0,
      height: typeof window !== "undefined" ? window.innerHeight : 0,
    })
    const galleryRef = useRef<HTMLDivElement>(null)
  
    // Update window size on resize
    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
  
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, [])
  
    // Handle escape key to close enlarged image
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && enlargedImage !== null) {
          setEnlargedImage(null)
        }
      }
  
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [enlargedImage])
  
    // Find the selected image
    const selectedImage = enlargedImage !== null ? cookingImages.find((img) => img.id === enlargedImage) : null
  
    return (
      <div className="h-full flex flex-col">
        <div className="bg-black/70 p-4 rounded-t-md border border-white/30 flex items-center">
          <Button variant="ghost" size="sm" onClick={onReturn} className="text-white hover:bg-white/10 mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Terminal
          </Button>
          <h1 className="text-xl font-mono text-white">Marko's Cooking</h1>
        </div>
  
        <div ref={galleryRef} className="flex-1 bg-black/50 border-x border-white/30 p-6 overflow-y-auto relative">
          {/* Grid of images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cookingImages.map((image) => (
              <div
                key={image.id}
                className={`relative cursor-pointer transition-all duration-300 ${
                  enlargedImage !== null && enlargedImage !== image.id ? "opacity-50" : ""
                }`}
                onClick={() => setEnlargedImage(image.id)}
              >
                <div className="aspect-square overflow-hidden rounded-md border border-white/20 bg-black/30">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-110"
                    style={{
                      backgroundImage: `url(${image.src})`,
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md">
                  <p className="text-white text-sm font-medium">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
  
          {/* Enlarged image overlay */}
          {enlargedImage !== null && selectedImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              style={{ top: 0, left: 0, width: "100vw", height: "100vh" }}
              onClick={() => setEnlargedImage(null)}
            >
              <div
                className="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-lg border-2 border-white/30 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-2 right-2 z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-black/50 text-white hover:bg-black/70 rounded-full h-8 w-8 p-0"
                    onClick={() => setEnlargedImage(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
  
                <div
                  className="bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${selectedImage.src})`,
                    width: "90vw",
                    height: "80vh",
                    maxWidth: "1200px",
                    maxHeight: "800px",
                  }}
                />
  
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                  <p className="text-white text-lg font-medium">{selectedImage.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
  
        <div className="bg-black/70 p-4 rounded-b-md border border-white/30">
          <p className="text-white/70 text-sm text-center">
            Click on an image to enlarge. Click anywhere outside the image or press ESC to close.
          </p>
        </div>
      </div>
    )
  }
  