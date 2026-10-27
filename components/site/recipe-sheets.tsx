"use client"

import { useCallback, useMemo, useState } from "react"
import { Flag } from "@/components/site/flags"
import { FlagRoute } from "@/components/site/flag-route"
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

// Filter menu order (roughly west to east), and the flag shown for each cuisine.
const CUISINES: [string, string][] = [
  ["French", "France"],
  ["Italian", "Italy"],
  ["Balkan", "Serbia"],
  ["Ukrainian", "Ukraine"],
  ["Eastern European", "Eastern Europe"],
  ["Indian", "India"],
  ["Thai", "Thailand"],
  ["Korean", "South Korea"],
  ["Japanese", "Japan"],
  ["Original", "Original"],
]
const flagFor = (c: string) => CUISINES.find(([name]) => name === c)?.[1] ?? "Original"

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
  // keep each dish's number from the full list, so DISH-007 stays DISH-007 when filtered
  const dishes = useMemo(() => items.map((d, i) => ({ ...d, num: i + 1, cuisine: cuisine(d) })), [items])
  const stops = useMemo(
    () => [
      { key: "all", flag: "All", name: "All cuisines", label: `All cuisines, ${dishes.length} dishes` },
      ...CUISINES.map(([name, flag]) => {
        const n = dishes.filter((d) => d.cuisine === name).length
        return { key: name, flag, name, label: `${name}, ${n} ${n === 1 ? "dish" : "dishes"}`, n }
      }).filter((c) => c.n > 0),
    ],
    [dishes],
  )
  const [active, setActive] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const filtered = active === 0 ? dishes : dishes.filter((d) => d.cuisine === stops[active].key)
  const shown = showAll ? filtered : filtered.slice(0, INITIAL)
  const viewerItems: ViewerItem[] = filtered.map((d) => ({
    src: d.imageUrl,
    title: d.title,
    label: `DISH-${String(d.num).padStart(3, "0")} · ${d.cuisine}`,
    description: d.description,
  }))
  const select = (i: number) => {
    setActive(i)
    setShowAll(false)
  }

  return (
    <div className="rsheets">
      <FlagRoute stops={stops} active={active} onSelect={select} ariaLabel="Filter by cuisine" />
      <div className="cs-meta">
        <span className="cs-country">
          <Flag country={stops[active].flag} className="cs-meta-flag" />
          {stops[active].name}
        </span>
        <span>
          {filtered.length} {filtered.length === 1 ? "dish" : "dishes"}
        </span>
        <span className="cs-hint">click to enlarge</span>
      </div>
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
                <span>DISH-{String(d.num).padStart(3, "0")}</span>
                <span className="rs-cuisine">
                  <Flag country={flagFor(d.cuisine)} className="rs-flag" />
                  {d.cuisine}
                </span>
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
      {filtered.length > INITIAL && (
        <button className="rs-more" onClick={() => setShowAll((v) => !v)}>
          {showAll ? "Show fewer" : `Show all ${filtered.length} dishes`}
        </button>
      )}
      {open !== null && <PhotoViewer items={viewerItems} index={open} onClose={close} onIndex={setOpen} />}
    </div>
  )
}
