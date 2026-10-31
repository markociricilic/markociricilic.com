// Small simplified flags (emblems reduced to a few shapes), drawn in a 30x20 box.
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
  // thirteen stripes; the stars are reduced to a grid of dots
  "United States": (
    <>
      <rect width="30" height="20" fill="#b22234" />
      {[1, 3, 5, 7, 9, 11].map((k) => (
        <rect key={k} y={(k * 20) / 13} width="30" height={20 / 13} fill="#fff" />
      ))}
      <rect width="13" height="10.77" fill="#3c3b6e" />
      <g fill="#fff">
        {[1.8, 4.6, 7.4, 10.2].flatMap((x) =>
          [1.8, 4.2, 6.6, 9].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.55" />),
        )}
      </g>
    </>
  ),
  Tunisia: (
    <>
      <rect width="30" height="20" fill="#e70013" />
      <circle cx="15" cy="10" r="5.5" fill="#fff" />
      <circle cx="15.6" cy="10" r="3.8" fill="#e70013" />
      <circle cx="16.8" cy="10" r="3.1" fill="#fff" />
      <circle cx="16.4" cy="10" r="1.3" fill="#e70013" />
    </>
  ),
  // nine stripes with a white cross on blue in the canton
  Greece: (
    <>
      <rect width="30" height="20" fill="#0d5eaf" />
      {[1, 3, 5, 7].map((k) => (
        <rect key={k} y={(k * 20) / 9} width="30" height={20 / 9} fill="#fff" />
      ))}
      <rect width="11.11" height="11.11" fill="#0d5eaf" />
      <rect x="4.44" width="2.22" height="11.11" fill="#fff" />
      <rect y="4.44" width="11.11" height="2.22" fill="#fff" />
    </>
  ),
  "Bosnia and Herzegovina": (
    <>
      <rect width="30" height="20" fill="#002395" />
      <path d="M8 0 H24 V20 Z" fill="#fecb00" />
      <g fill="#fff">
        {[1.5, 4.5, 7.5, 10.5, 13.5, 16.5, 19.5].map((y) => (
          <circle key={y} cx={5 + y * 0.8} cy={y} r="0.9" />
        ))}
      </g>
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
      <ellipse cx="15" cy="10.8" rx="2.7" ry="3.5" fill="#7fc4e8" stroke="#c8a13a" strokeWidth=".6" />
      <path d="M12.9 12.2 Q15 11 17.1 12.2 Q16.4 14 15 14.3 Q13.6 14 12.9 12.2 Z" fill="#2e8b3d" />
      <path d="M10.6 5.6 L15 7.3 L19.4 5.6 L17.6 8 H12.4 Z" fill="#3a2a1a" />
    </>
  ),
  Portugal: (
    <>
      <rect width="12" height="20" fill="#006600" />
      <rect x="12" width="18" height="20" fill="#ff0000" />
      <circle cx="12" cy="10" r="4.4" fill="none" stroke="#ffcc00" strokeWidth="1.2" />
      <path d="M10 7.4 H14 V11 Q14 12.8 12 13.4 Q10 12.8 10 11 Z" fill="#ff0000" stroke="#fff" strokeWidth=".3" />
      <path d="M11 8.6 H13 V10.8 Q13 11.7 12 12 Q11 11.7 11 10.8 Z" fill="#fff" />
    </>
  ),
  Spain: (
    <>
      <rect width="30" height="20" fill="#aa151b" />
      <rect y="5" width="30" height="10" fill="#f1bf00" />
      <path d="M8.7 6.4 V5.4 L9.5 5.9 L10 5.2 L10.5 5.9 L11.3 5.4 V6.4 Z" fill="#b8860b" />
      <rect x="8" y="6.6" width="2" height="3.4" fill="#aa151b" />
      <rect x="10" y="6.6" width="2" height="3.4" fill="#fff" />
      <path d="M8 10 H10 V14 Q8.4 13.6 8 12 Z" fill="#f7dc6f" />
      <path d="M10 10 H12 V12 Q11.6 13.6 10 14 Z" fill="#aa151b" />
      <path d="M8 6.6 H12 V12 Q11.6 13.6 10 14 Q8.4 13.6 8 12 Z" fill="none" stroke="#8a5a00" strokeWidth=".35" />
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
      <path d="M21.2 7.2 Q22.5 2.4 23.8 7.2 Z" fill="#d4a017" />
      <path d="M19.8 15.8 L25 8.4 M24.2 7.9 L25.8 9" fill="none" stroke="#d4a017" strokeWidth="1" />
      <path d="M25.2 15.8 L20 8.4 M20.8 7.9 L19.2 9" fill="none" stroke="#8d949b" strokeWidth="1" />
    </>
  ),
  Germany: H3("#000", "#dd0000", "#ffce00"),
  Scotland: (
    <>
      <rect width="30" height="20" fill="#005eb8" />
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#fff" strokeWidth="3.2" />
    </>
  ),
  Serbia: (
    <>
      {H3("#c6363c", "#0c4076", "#fff")}
      <path d="M9.7 5.8 V3.4 L10.9 4.6 L11.7 3 L12.5 4.6 L13.7 3.4 V5.8 Z" fill="#edb92e" />
      <path d="M8.4 6 H15 V12 Q15 15.4 11.7 16.6 Q8.4 15.4 8.4 12 Z" fill="#c6363c" stroke="#edb92e" strokeWidth=".4" />
      <path
        d="M11.7 8.6 L11.1 7.9 L10.6 7.2 L9.9 7.4 L10.4 7.9 L10.8 8.6 L9.2 8.2 V11.6 L10.7 11 L10.4 13.6 L11.7 13 L13 13.6 L12.7 11 L14.2 11.6 V8.2 L12.6 8.6 L13 7.9 L13.5 7.4 L12.8 7.2 L12.3 7.9 Z"
        fill="#fff"
      />
      <path d="M11 9 H12.4 V10.4 Q12.4 11.2 11.7 11.5 Q11 11.2 11 10.4 Z" fill="#c6363c" />
      <path d="M11.7 9.2 V11.2 M11.15 9.95 H12.25" stroke="#fff" strokeWidth=".3" />
    </>
  ),
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
  Jamaica: (
    <>
      <rect width="30" height="20" fill="#009b3a" />
      <path d="M0 0 L15 10 L0 20 Z M30 0 L15 10 L30 20 Z" fill="#000" />
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#fed100" strokeWidth="2.6" />
    </>
  ),
  "United Arab Emirates": (
    <>
      {H3("#00732f", "#fff", "#000")}
      <rect width="8" height="20" fill="#ff0000" />
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
