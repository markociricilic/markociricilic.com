// Small simplified flags (emblems omitted), drawn in a 30x20 box.
// Emoji flags don't render on Windows, so these are plain SVG shapes.

const H3 = (a: string, b: string, c: string) => (
  <>
    <rect width="30" height="6.67" fill={a} />
    <rect y="6.67" width="30" height="6.67" fill={b} />
    <rect y="13.33" width="30" height="6.67" fill={c} />
  </>
)
const V3 = (a: string, b: string, c: string) => (
  <>
    <rect width="10" height="20" fill={a} />
    <rect x="10" width="10" height="20" fill={b} />
    <rect x="20" width="10" height="20" fill={c} />
  </>
)

const FLAGS: Record<string, React.ReactNode> = {
  Tunisia: (
    <>
      <rect width="30" height="20" fill="#e70013" />
      <circle cx="15" cy="10" r="5.5" fill="#fff" />
      <circle cx="15.6" cy="10" r="3.8" fill="#e70013" />
      <circle cx="16.8" cy="10" r="3.1" fill="#fff" />
      <circle cx="16.4" cy="10" r="1.3" fill="#e70013" />
    </>
  ),
  "Costa Rica": (
    <>
      <rect width="30" height="20" fill="#002b7f" />
      <rect y="3.33" width="30" height="13.33" fill="#fff" />
      <rect y="6.67" width="30" height="6.67" fill="#ce1126" />
    </>
  ),
  Chile: (
    <>
      <rect width="30" height="10" fill="#fff" />
      <rect y="10" width="30" height="10" fill="#d52b1e" />
      <rect width="10" height="10" fill="#0039a6" />
      <path d="M5 2.2 L5.9 4.9 L8.7 4.9 L6.4 6.6 L7.3 9.2 L5 7.6 L2.7 9.2 L3.6 6.6 L1.3 4.9 L4.1 4.9 Z" fill="#fff" />
    </>
  ),
  Peru: V3("#d91023", "#fff", "#d91023"),
  Ecuador: (
    <>
      <rect width="30" height="10" fill="#ffd100" />
      <rect y="10" width="30" height="5" fill="#034ea2" />
      <rect y="15" width="30" height="5" fill="#ed1c24" />
    </>
  ),
  Portugal: (
    <>
      <rect width="12" height="20" fill="#006600" />
      <rect x="12" width="18" height="20" fill="#ff0000" />
      <circle cx="12" cy="10" r="4" fill="#ffcc00" />
      <circle cx="12" cy="10" r="2.2" fill="#ff0000" />
    </>
  ),
  Spain: (
    <>
      <rect width="30" height="20" fill="#aa151b" />
      <rect y="5" width="30" height="10" fill="#f1bf00" />
    </>
  ),
  France: V3("#002395", "#fff", "#ed2939"),
  Monaco: (
    <>
      <rect width="30" height="10" fill="#ce1126" />
      <rect y="10" width="30" height="10" fill="#fff" />
    </>
  ),
  Italy: V3("#009246", "#fff", "#ce2b37"),
  "Vatican City": (
    <>
      <rect width="15" height="20" fill="#ffe000" />
      <rect x="15" width="15" height="20" fill="#fff" />
      <circle cx="22.5" cy="10" r="2.4" fill="none" stroke="#b8a04a" strokeWidth="1" />
    </>
  ),
  Germany: H3("#000", "#dd0000", "#ffce00"),
  Scotland: (
    <>
      <rect width="30" height="20" fill="#005eb8" />
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#fff" strokeWidth="3.2" />
    </>
  ),
  Serbia: H3("#c6363c", "#0c4076", "#fff"),
  Ukraine: (
    <>
      <rect width="30" height="10" fill="#0057b7" />
      <rect y="10" width="30" height="10" fill="#ffd700" />
    </>
  ),
  "South Korea": (
    <>
      <rect width="30" height="20" fill="#fff" />
      <path d="M10.5 10 A4.5 4.5 0 0 1 19.5 10 Z" fill="#cd2e3a" />
      <path d="M10.5 10 A4.5 4.5 0 0 0 19.5 10 Z" fill="#0047a0" />
      <circle cx="12.75" cy="10" r="2.25" fill="#cd2e3a" />
      <circle cx="17.25" cy="10" r="2.25" fill="#0047a0" />
      {/* trigrams, reduced to three bars in each corner */}
      <g fill="#000">
        {[
          [5, 4.5, 34],
          [25, 15.5, 34],
          [25, 4.5, -34],
          [5, 15.5, -34],
        ].map(([x, y, r]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <rect x="-1.9" y="-2.2" width="3.8" height="0.9" />
            <rect x="-1.9" y="-0.45" width="3.8" height="0.9" />
            <rect x="-1.9" y="1.3" width="3.8" height="0.9" />
          </g>
        ))}
      </g>
    </>
  ),
  Japan: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <circle cx="15" cy="10" r="6" fill="#bc002d" />
    </>
  ),
  Thailand: (
    <>
      <rect width="30" height="20" fill="#a51931" />
      <rect y="3.33" width="30" height="13.33" fill="#f4f5f8" />
      <rect y="6.67" width="30" height="6.67" fill="#2d2a4a" />
    </>
  ),
  India: (
    <>
      {H3("#ff9933", "#fff", "#138808")}
      <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth="0.7" />
      <circle cx="15" cy="10" r="0.6" fill="#000080" />
    </>
  ),
  // not countries: markers for the cooking filter
  "Eastern Europe": (
    <>
      <rect width="30" height="20" fill="#2b2b2b" />
      <text x="15" y="15.5" textAnchor="middle" fontSize="14" fontWeight="700" fill="#e3a43a" fontFamily="var(--font-px), monospace">
        EE
      </text>
    </>
  ),
  Original: (
    <>
      <rect width="30" height="20" fill="#e3a43a" />
      <path d="M15 4 L16.5 8.3 L21 8.3 L17.4 11 L18.8 15.4 L15 12.7 L11.2 15.4 L12.6 11 L9 8.3 L13.5 8.3 Z" fill="#fff" />
    </>
  ),
  All: (
    <>
      <rect width="30" height="20" fill="#1a1a1a" />
      <g fill="#e3a43a">
        <rect x="5" y="3" width="9" height="6" />
        <rect x="16" y="3" width="9" height="6" />
        <rect x="5" y="11" width="9" height="6" />
        <rect x="16" y="11" width="9" height="6" />
      </g>
    </>
  ),
}

// Flag placed inside another SVG (e.g. the travel route).
export function FlagShape({ country, x, y, w = 30 }: { country: string; x: number; y: number; w?: number }) {
  const s = w / 30
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <svg width="30" height="20" viewBox="0 0 30 20" overflow="hidden">
        {FLAGS[country]}
      </svg>
      <rect width="30" height="20" fill="none" stroke="rgba(0,0,0,.35)" strokeWidth={1 / s} />
    </g>
  )
}

// Standalone inline flag (e.g. next to a heading).
export function Flag({ country, className }: { country: string; className?: string }) {
  if (!FLAGS[country]) return null
  return (
    <svg className={className} viewBox="0 0 30 20" width="21" height="14" aria-hidden="true">
      {FLAGS[country]}
      <rect width="30" height="20" fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="1" />
    </svg>
  )
}
