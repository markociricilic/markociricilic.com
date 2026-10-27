"use client"

import { FlagShape } from "@/components/site/flags"

export type RouteStop = {
  key: string
  flag: string // key into the flag set in flags.tsx
  name: string // tooltip
  label: string // screen-reader label
}

type Pad = { x: number; y: number; flagAbove: boolean }

// A row of flags strung on a circuit trace, used as a filter menu (photography
// countries, cooking cuisines). Desktop: one zig-zag row. Phones: two rows joined
// like a serpentine trace.
export function FlagRoute({
  stops,
  active,
  onSelect,
  ariaLabel,
}: {
  stops: RouteStop[]
  active: number
  onSelect: (i: number) => void
  ariaLabel: string
}) {
  const n = stops.length
  const wide = (i: number): Pad => {
    const x = 22 + (i * (600 - 44)) / (n - 1)
    return i % 2 === 0 ? { x, y: 26, flagAbove: true } : { x, y: 50, flagAbove: false }
  }
  const perRow = Math.ceil(n / 2)
  const narrow = (i: number): Pad => {
    const step = (340 - 48) / (perRow - 1)
    const row = i < perRow ? 0 : 1
    const col = row === 0 ? i : perRow - 1 - (i - perRow) // second row runs back right-to-left
    return { x: 24 + col * step, y: row === 0 ? 38 : 96, flagAbove: row === 0 }
  }

  const route = (layout: (i: number) => Pad, width: number, height: number, className: string, serpentine = false) => {
    const pts = stops.map((_, i) => layout(i))
    let d = "M" + pts.map((p) => `${p.x},${p.y}`).join(" L")
    if (serpentine) {
      // route the row change around the right edge instead of cutting diagonally
      const b = pts[perRow]
      const edge = width - 8
      d = "M" + pts.slice(0, perRow).map((p) => `${p.x},${p.y}`).join(" L") +
        ` H${edge} V${b.y} H${b.x}` + pts.slice(perRow + 1).map((p) => ` L${p.x},${p.y}`).join("")
    }
    return (
      <svg className={`cs-route ${className}`} viewBox={`0 0 ${width} ${height}`} role="group" aria-label={ariaLabel}>
        <path d={d} className="cs-trace" />
        {stops.map((s, i) => {
          const p = pts[i]
          const on = i === active
          const fy = p.flagAbove ? p.y - 25 : p.y + 11
          return (
            <g
              key={s.key}
              className={on ? "cs-pad on" : "cs-pad"}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelect(i))}
              tabIndex={0}
              role="button"
              aria-pressed={on}
              aria-label={s.label}
            >
              <title>{s.name}</title>
              <rect x={p.x - 20} y={p.flagAbove ? p.y - 30 : p.y - 8} width={40} height={38} className="cs-hit" />
              <rect x={p.x - 6} y={p.y - 6} width={12} height={12} className="cs-node" />
              <FlagShape country={s.flag} x={p.x - 10.5} y={fy} w={21} />
              {on && <rect x={p.x - 13} y={fy - 2.5} width={26} height={19} className="cs-flag-ring" />}
            </g>
          )
        })}
      </svg>
    )
  }

  return (
    <div className="cs-route-wrap">
      {route(wide, 600, 80, "cs-route-wide")}
      {route(narrow, 340, 134, "cs-route-narrow", true)}
    </div>
  )
}
