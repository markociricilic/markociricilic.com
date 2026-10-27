"use client"

import { useCallback, useState } from "react"
import { PhotoViewer, type ViewerItem } from "@/components/site/photo-viewer"

type Dish = {
  title: string
  description?: string
  imageUrl: string
}

const INITIAL = 6

const thumb = (url: string) => url.replace("/images/interests/", "/images/interests/thumbs/")

// Cuisine shown in the datasheet header, guessed from the dish text.
function cuisine(d: Dish) {
  const t = `${d.title} ${d.description ?? ""}`.toLowerCase()
  if (/шашлык|eastern european/.test(t)) return "Eastern European"
  if (/borscht|борщ|ukrainian/.test(t)) return "Ukrainian"
  if (/balkan|[Ѐ-ӿ]/.test(t)) return "Balkan"
  if (/tteokbokki/.test(t)) return "Korean"
  if (/japanese/.test(t)) return "Japanese"
  if (/thai/.test(t)) return "Thai"
  if (/malai|handi/.test(t)) return "Indian"
  if (/bourguignon|french/.test(t)) return "French"
  if (/pasta|ragù|rigatoni|spaghetti|fettuccine|carbonara|italian/.test(t)) return "Italian"
  return "Original"
}

// "Braised lamb shank in a red wine, beef stock, walnut sauce"
//   -> ["Braised lamb shank", "Red wine", "Beef stock", "Walnut sauce"]
function components(d: Dish) {
  const text = d.description || d.title
  return text
    .split(/\s+with\s+|,\s*|\s+and\s+|\s+in an?\s+/i)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1))
}

// "Borscht (Борщ)" -> ["Borscht", "Борщ"]
function splitTitle(title: string): [string, string | null] {
  const m = title.match(/^(.*?)\s*\(([^)]+)\)\s*$/)
  return m ? [m[1], m[2]] : [title, null]
}

export function RecipeSheets({ items }: { items: Dish[] }) {
  const [showAll, setShowAll] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const shown = showAll ? items : items.slice(0, INITIAL)
  const viewerItems: ViewerItem[] = items.map((d, i) => ({
    src: d.imageUrl,
    title: d.title,
    label: `DISH-${String(i + 1).padStart(3, "0")} · ${cuisine(d)}`,
    description: d.description,
  }))

  return (
    <div className="rsheets">
      <div className="rs-grid">
        {shown.map((d, i) => {
          const [name, local] = splitTitle(d.title)
          const pins = components(d)
          return (
            <article
              className="rs-card"
              key={d.imageUrl}
              onClick={() => setOpen(i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpen(i))}
              tabIndex={0}
              role="button"
              aria-label={`Enlarge photo of ${d.title}`}
            >
              <header className="rs-head">
                <span>DISH-{String(i + 1).padStart(3, "0")}</span>
                <span>{cuisine(d)}</span>
              </header>
              <div className="rs-photo">
                <img src={thumb(d.imageUrl)} alt={d.title} loading="lazy" decoding="async" />
              </div>
              <div className="rs-body">
                <h3>{name}</h3>
                {local && <p className="rs-local">{local}</p>}
                <table className="rs-pins">
                  <thead>
                    <tr>
                      <th>Pin</th>
                      <th>Component</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pins.map((p, j) => (
                      <tr key={j}>
                        <td>P{j + 1}</td>
                        <td>{p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          )
        })}
      </div>
      {items.length > INITIAL && (
        <button className="rs-more" onClick={() => setShowAll((v) => !v)}>
          {showAll ? "Show fewer" : `Show all ${items.length} dishes`}
        </button>
      )}
      {open !== null && <PhotoViewer items={viewerItems} index={open} onClose={close} onIndex={setOpen} />}
    </div>
  )
}
