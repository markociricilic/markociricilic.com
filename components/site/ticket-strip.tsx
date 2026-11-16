"use client"

import { useCallback, useState } from "react"
import { PhotoViewer, type ViewerItem } from "@/components/site/photo-viewer"

type Concert = {
  artist: string
  date: string // "2022-09", from the photo's timestamp
  imageUrl: string
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const thumb = (url: string) => url.replace("/images/interests/", "/images/interests/thumbs/")
const when = (date: string) => `${MONTHS[Number(date.slice(5, 7)) - 1]} ${date.slice(0, 4)}`
const no = (i: number) => `No. ${String(i + 1).padStart(2, "0")}`

// Concert photos as a row of torn-off ticket stubs that scrolls sideways.
export function TicketStrip({ items }: { items: Concert[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])

  const viewerItems: ViewerItem[] = items.map((c, i) => ({
    src: c.imageUrl,
    title: c.artist,
    label: `${no(i)} · ${when(c.date)}`,
  }))

  return (
    <div className="tk">
      <div className="tk-meta">
        <span className="tk-title">Live</span>
        <span>{items.length} shows</span>
        <span className="tk-hint">scroll · click to enlarge</span>
      </div>
      <div className="tk-strip" role="list">
        {items.map((c, i) => (
          <button key={c.imageUrl} role="listitem" className="tk-ticket" onClick={() => setOpen(i)} aria-label={`Open ${c.artist}, ${when(c.date)}`}>
            <span className="tk-photo">
              <img src={thumb(c.imageUrl)} alt={c.artist} loading="lazy" decoding="async" />
            </span>
            <span className="tk-stub">
              <span className="tk-row">
                <span>Admit one</span>
                <span>{no(i)}</span>
              </span>
              <span className="tk-artist">{c.artist}</span>
              <span className="tk-date">{when(c.date)}</span>
            </span>
          </button>
        ))}
      </div>
      {open !== null && <PhotoViewer items={viewerItems} index={open} onClose={close} onIndex={setOpen} />}
    </div>
  )
}
