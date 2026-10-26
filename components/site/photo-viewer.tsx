"use client"

import { useEffect } from "react"

export type ViewerItem = {
  src: string
  title: string
  label: string // small line above the title, e.g. "▶ IT-11 · 11/73"
  description?: string
}

// Full-size photo overlay with prev/next, arrow keys and Esc.
export function PhotoViewer({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: ViewerItem[]
  index: number
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const step = (dir: 1 | -1) => onIndex((index + dir + items.length) % items.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length)
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [index, items.length, onClose, onIndex])

  const item = items[index]
  if (!item) return null

  return (
    <div className="cs-viewer" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.title} />
        <figcaption>
          <span className="cs-vcode">{item.label}</span>
          <strong>{item.title}</strong>
          {item.description && <span className="cs-vdesc">{item.description}</span>}
        </figcaption>
      </figure>
      {items.length > 1 && (
        <>
          <button className="cs-nav prev" onClick={(e) => (e.stopPropagation(), step(-1))} aria-label="Previous photo">
            ←
          </button>
          <button className="cs-nav next" onClick={(e) => (e.stopPropagation(), step(1))} aria-label="Next photo">
            →
          </button>
        </>
      )}
      <button className="cs-close" onClick={onClose} aria-label="Close">
        Close ✕
      </button>
    </div>
  )
}
