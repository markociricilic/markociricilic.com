"use client"

import { useCallback, useMemo, useState } from "react"
import { Flag } from "@/components/site/flags"
import { FlagRoute } from "@/components/site/flag-route"
import { PhotoViewer, type ViewerItem } from "@/components/site/photo-viewer"

type Photo = {
  title: string
  description?: string
  imageUrl: string
}

// Two-letter frame codes printed on the film edge, per country.
const CODES: Record<string, string> = {
  Tunisia: "TN",
  Greece: "GR",
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
const yearOf = (p: Photo, country: string) => p.title.slice(country.length).match(/\d{4}/)?.[0] ?? ""

export function ContactSheet({ items, countries }: { items: Photo[]; countries: string[] }) {
  // group photos by the country their title starts with ("Italy 2025: ...")
  const rolls = useMemo(
    () =>
      countries.map((country) => {
        const photos = items.filter((p) => p.title.startsWith(country))
        // a country visited more than once lists each year: "2018 · 2025"
        const year = [...new Set(photos.map((p) => yearOf(p, country)))].join(" · ")
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

  return (
    <div className="csheet">
      <FlagRoute
        stops={rolls.map((r) => ({
          key: r.country,
          flag: r.country,
          name: r.country,
          label: `${r.country} ${r.year}, ${r.photos.length} photos`,
        }))}
        active={active}
        onSelect={setActive}
        ariaLabel="Choose a country"
      />

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
                <span>{yearOf(p, roll.country)}</span>
              </span>
            </button>
          )
        })}
      </div>

      {open !== null && <PhotoViewer items={viewerItems} index={open} onClose={close} onIndex={setOpen} />}
    </div>
  )
}
