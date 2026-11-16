"use client"

import { useCallback, useState } from "react"
import { PhotoViewer, type ViewerItem } from "@/components/site/photo-viewer"

const INITIAL = 12

const thumb = (url: string) => url.replace("/images/interests/", "/images/interests/thumbs/")

// Instant-film prints taped to a board, slightly askew; no captions, they're all Nyx.
export function NyxPrints({ photos }: { photos: string[] }) {
  const [showAll, setShowAll] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const shown = showAll ? photos : photos.slice(0, INITIAL)

  const viewerItems: ViewerItem[] = photos.map((src, i) => ({
    src,
    title: "Nyx",
    label: `No. ${String(i + 1).padStart(2, "0")} · ${i + 1}/${photos.length}`,
  }))

  return (
    <div className="nyx">
      <div className="nyx-grid">
        {shown.map((src, i) => (
          <button key={src} className="nyx-print" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1} of Nyx`}>
            <span className="nyx-img">
              <img src={thumb(src)} alt={`Nyx, photo ${i + 1}`} loading="lazy" decoding="async" />
            </span>
          </button>
        ))}
      </div>
      {photos.length > INITIAL && (
        <button className="rs-more" onClick={() => setShowAll((v) => !v)}>
          {showAll ? "Show fewer" : `Show all ${photos.length} photos`}
        </button>
      )}
      {open !== null && <PhotoViewer items={viewerItems} index={open} onClose={close} onIndex={setOpen} />}
    </div>
  )
}
