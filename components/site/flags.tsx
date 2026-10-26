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
