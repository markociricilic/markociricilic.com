"use client"

import { useCallback, useMemo, useState } from "react"
import { Flag, FlagShape } from "@/components/site/flags"
import { PhotoViewer, type ViewerItem } from "@/components/site/photo-viewer"

type Photo = {
  title: string
  description?: string
  imageUrl: string
}

// Two-letter frame codes printed on the film edge, per country.
const CODES: Record<string, string> = {
  Tunisia: "TN",
  "Costa Rica": "CR",
  Chile: "CL",
  Peru: "PE",
  Ecuador: "EC",
  Portugal: "PT",
  Spain: "ES",
  France: "FR",
  Monaco: "MC",
  Italy: "IT",
  "Vatican City": "VA",
  Germany: "DE",
  Scotland: "SC",
  Serbia: "RS",
}

// Photos that also appear in the homepage collage get a "grease pencil" box.
const CIRCLED = new Set([19, 21, 56, 78, 104, 147, 183, 186, 197, 243, 244])

const thumb = (url: string) => url.replace("/images/interests/", "/images/interests/thumbs/")
const photoNumber = (url: string) => Number(url.match(/photography-(\d+)\./)?.[1] ?? -1)

export function ContactSheet({ items, countries }: { items: Photo[]; countries: string[] }) {
  // group photos by the country their title starts with ("Italy 2025: ...")
  const rolls = useMemo(
    () =>
      countries.map((country) => {
        const photos = items.filter((p) => p.title.startsWith(country))
        const year = photos[0]?.title.slice(country.length).match(/\d{4}/)?.[0] ?? ""
        return { country, code: CODES[country] ?? country.slice(0, 2).toUpperCase(), year, photos }
      }),
    [items, countries],
  )

  const [active, setActive] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const roll = rolls[active]

  const close = useCallback(() => setOpen(null), [])
  const viewerItems: ViewerItem[] = roll.photos.map((p, i) => ({
    src: p.imageUrl,
    title: p.title.replace(/^[^:]+:\s*/, ""),
    label: `▶ ${roll.code}-${String(i + 1).padStart(2, "0")} · ${i + 1}/${roll.photos.length}`,
    description: p.description,
  }))

  // route: pads zig-zag across, joined like a circuit trace
  const RW = 600
  const pad = (i: number) => ({ x: 22 + (i * (RW - 44)) / (rolls.length - 1), y: i % 2 === 0 ? 26 : 50 })
  const trace = rolls.map((_, i) => `${pad(i).x},${pad(i).y}`).join(" ")


  return (
    <div className="csheet">
      <div className="cs-route-wrap">
        <svg className="cs-route" viewBox={`0 0 ${RW} 80`} role="group" aria-label="Choose a country">
          <polyline points={trace} className="cs-trace" />
          {rolls.map((r, i) => {
            const p = pad(i)
            const on = i === active
            return (
              <g
                key={r.country}
                className={on ? "cs-pad on" : "cs-pad"}
                onClick={() => setActive(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(i)}
                tabIndex={0}
                role="button"
                aria-pressed={on}
                aria-label={`${r.country} ${r.year}, ${r.photos.length} photos`}
              >
                <title>{r.country}</title>
                <rect x={p.x - 13} y={i % 2 === 0 ? p.y - 30 : p.y - 8} width={26} height={38} className="cs-hit" />
                <rect x={p.x - 6} y={p.y - 6} width={12} height={12} className="cs-node" />
                {/* flag above top-row pads, below bottom-row pads */}
                <FlagShape country={r.country} x={p.x - 10.5} y={i % 2 === 0 ? p.y - 25 : p.y + 11} w={21} />
                {on && <rect x={p.x - 13} y={i % 2 === 0 ? p.y - 27.5 : p.y + 8.5} width={26} height={19} className="cs-flag-ring" />}
              </g>
            )
          })}
        </svg>
      </div>

      <div className="cs-meta">
        <span className="cs-country">
          <Flag country={roll.country} className="cs-meta-flag" />
          {roll.country}
        </span>
        <span>{roll.year}</span>
        <span>{roll.photos.length} frames</span>
        <span className="cs-hint">hover for colour · click to enlarge</span>
      </div>

      <div className="cs-grid">
        {roll.photos.map((p, i) => {
          const code = `${roll.code}-${String(i + 1).padStart(2, "0")}`
          return (
            <button
              key={p.imageUrl}
              className={CIRCLED.has(photoNumber(p.imageUrl)) ? "cs-frame circled" : "cs-frame"}
              onClick={() => setOpen(i)}
              aria-label={`Open ${p.title}`}
            >
              <span className="cs-img">
                <img src={thumb(p.imageUrl)} alt={p.title} loading="lazy" decoding="async" />
              </span>
              <span className="cs-edge">
                <span>▶ {code}</span>
                <span>{roll.year}</span>
              </span>
            </button>
          )
        })}
      </div>

      {open !== null && <PhotoViewer items={viewerItems} index={open} onClose={close} onIndex={setOpen} />}
    </div>
  )
}
