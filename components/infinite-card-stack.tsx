"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"

interface CardItem {
  id: string
  title: string
  description?: string
  imageUrl: string
  category: "cooking" | "photography" | "art"
}

interface InfiniteCardStackProps {
  items: CardItem[]
  isDarkMode: boolean
}

export function InfiniteCardStack({ items, isDarkMode }: InfiniteCardStackProps) {
  const [cards, setCards] = useState(items)
  const [exitX, setExitX] = useState(0)
  const constraintsRef = useRef(null)

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x > 0 ? 300 : -300)
      // Move the top card to the bottom
      setTimeout(() => {
        setCards((prev) => {
          const newCards = [...prev]
          const [first] = newCards.splice(0, 1)
          newCards.push(first)
          return newCards
        })
        setExitX(0)
      }, 200)
    }
  }

  return (
    <div 
      ref={constraintsRef}
      className="relative w-full h-[520px] flex items-start justify-start"
    >
      <AnimatePresence mode="popLayout">
        {cards.slice(0, 3).map((card, index) => {
          const isTop = index === 0
          return (
            <motion.div
              key={card.id}
                className={`absolute w-72 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing shadow-xl ${
                isDarkMode ? "bg-zinc-900 border border-white/10" : "bg-white border border-black/10"
              }`}
              style={{
                zIndex: cards.length - index,
              }}
              initial={{
                scale: 1 - index * 0.05,
                y: index * -10,
                opacity: 1 - index * 0.1,
              }}
              animate={{
                scale: 1 - index * 0.05,
                y: index * -10,
                opacity: 1 - index * 0.1,
                x: isTop ? 0 : 0,
              }}
              exit={{
                x: exitX,
                opacity: 0,
                transition: { duration: 0.2 },
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              drag={isTop ? "x" : false}
              dragConstraints={constraintsRef}
              dragElastic={0.7}
              onDragEnd={isTop ? handleDragEnd : undefined}
              whileDrag={{ scale: 1.02, rotate: isTop ? 2 : 0 }}
            >
              {/* Image */}
              <div className="w-full aspect-[3/4] overflow-hidden bg-zinc-800">
                {card.imageUrl ? (
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode ? "bg-zinc-800 text-zinc-600" : "bg-zinc-200 text-zinc-400"
                  }`}>
                    <span className="text-4xl">
                      {card.category === "cooking" && "🍳"}
                      {card.category === "photography" && "📷"}
                      {card.category === "art" && "🎨"}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <span className={`text-xs uppercase tracking-wider ${
                  isDarkMode ? "text-rose-400" : "text-rose-600"
                }`}>
                  {card.category}
                </span>
                <h3 className={`font-semibold mt-1 text-sm ${
                  isDarkMode ? "text-white" : "text-black"
                }`}>
                  {card.title}
                </h3>
                {card.description && (
                  <p className={`text-xs mt-2 line-clamp-3 ${
                    isDarkMode ? "text-zinc-400" : "text-zinc-600"
                  }`}>
                    {card.description}
                  </p>
                )}
              </div>

              {/* Swipe hint for top card */}
              {isTop && (
                <div className={`absolute bottom-3 left-0 right-0 text-center text-xs ${
                  isDarkMode ? "text-zinc-500" : "text-zinc-400"
                }`}>
                  Swipe to see more
                </div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
