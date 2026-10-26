"use client"

import { useCallback, useState } from "react"
import { PhotoViewer, type ViewerItem } from "@/components/site/photo-viewer"

type Artwork = {
  title: string
  description?: string
  imageUrl: string
}

const MEDIUM = "Soft oil pastel on paper"

// Gallery hang: equal frames on a picture rail, each with a museum label.
export function ArtWall({ items }: { items: Artwork[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const no = (i: number) => `No. ${String(i + 1).padStart(2, "0")}`

  const viewerItems: ViewerItem[] = items.map((a, i) => ({
    src: a.imageUrl,
    title: a.title,
    label: `${no(i)} · ${MEDIUM}`,
    description: a.description || undefined,
  }))

  return (
    <div className="artwall">
      <div className="aw-grid">
        {items.map((a, i) => (
          <figure key={a.imageUrl} className="aw-piece">
            <svg className="aw-wire" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
              <polyline points="18,20 50,2 82,20" />
              <circle cx="50" cy="2" r="1.6" />
            </svg>
            <button className="aw-frame" onClick={() => setOpen(i)} aria-label={`View ${a.title}`}>
              <span className="aw-mat">
                <img src={a.imageUrl} alt={a.title} loading="lazy" decoding="async" />
              </span>
            </button>
            <figcaption className="aw-label">
              <span className="aw-no">{no(i)}</span>
              <span className="aw-title">{a.title}</span>
              <span className="aw-medium">{MEDIUM}</span>
              <span className="aw-medium">MUNGYO Gallery pastels</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {open !== null && <PhotoViewer items={viewerItems} index={open} onClose={close} onIndex={setOpen} />}
    </div>
  )
}
