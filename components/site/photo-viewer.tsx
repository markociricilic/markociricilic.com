"use client"

import { useEffect, useState } from "react"

export type Poem = {
  note: string
  plaques: {
    original: string
    english: string
    verses: { original: [string, string]; english: [string, string] }[]
  }[]
}

export type ViewerItem = {
  src: string
  title: string
  label: string // small line above the title, e.g. "▶ IT-11 · 11/73"
  description?: string
  poem?: Poem
}

// A poem in its original language, with a button that swaps it to English.
function PoemText({ poem }: { poem: Poem }) {
  const [english, setEnglish] = useState(false)
  const lang = english ? "english" : "original"
  return (
    <div className="cs-poem">
      <button className="cs-poem-btn" onClick={() => setEnglish(!english)} aria-pressed={english}>
        {english ? "Show original" : "Translate to English"}
      </button>
      <div lang={english ? "en" : "ota"} dir={english ? "ltr" : "rtl"} className={english ? "cs-poem-text" : "cs-poem-text original"}>
        {poem.plaques.map((plaque) => (
          <div key={plaque.english} className="cs-plaque">
            <span className="cs-plaque-date">{plaque[lang]}</span>
            {plaque.verses.map((verse) => (
              <p key={verse.english[0]}>
                <span>{verse[lang][0]}</span>
                <span>{verse[lang][1]}</span>
              </p>
            ))}
          </div>
        ))}
      </div>
      <span className="cs-poem-note">{poem.note}</span>
    </div>
  )
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
          {item.poem && <PoemText key={item.src} poem={item.poem} />}
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
