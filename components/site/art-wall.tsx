"use client"

import { useCallback, useState } from "react"
import { PhotoViewer, type ViewerItem } from "@/components/site/photo-viewer"

type Artwork = {
  title: string
  description?: string
  imageUrl: string
}

const MEDIUM = "Soft oil pastel on paper"

// Gallery wall: equal frames in an aligned grid, each with a museum label.
export function ArtWall({ items }: { items: Artwork[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  // number from the title ("Untitled 6" -> No. 06), so hiding a piece doesn't renumber the rest
  const no = (i: number) => `No. ${String(items[i].title.match(/\d+/)?.[0] ?? i + 1).padStart(2, "0")}`

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
