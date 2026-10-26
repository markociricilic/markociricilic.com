import { Duo } from "@/components/site/duo"

// The photo banner above the nav on desktop, like Afterlab's skyline strip.
export function Horizon({ src, position, label }: { src: string; position?: string; label: string }) {
  return (
    <div className="horizon" aria-hidden="true">
      <Duo src={src} position={position} />
      <div className="wedge" />
      <svg className="overlay" viewBox="0 0 600 230" preserveAspectRatio="none">
        <line className="dim dash" x1="0" y1="150" x2="600" y2="150" />
        <polyline className="dim" points="72,88 72,74 86,74 86,88 100,88 100,74 114,74" />
        <rect className="dim" x="430" y="40" width="22" height="22" />
        <text x="458" y="56">
          {label}
        </text>
      </svg>
    </div>
  )
}

// The vertical logo bar on the right edge of the art panel.
export function LogoStrip({ num }: { num: string }) {
  return (
    <div className="strip" aria-hidden="true">
      <span className="num">{num}</span>
      <span className="vlogo">
        marko<b>ćirić</b>
      </span>
    </div>
  )
}

export function Logo({ sub }: { sub: string }) {
  return (
    <div className="logo">
      <span className="dots" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="n">002</span>
      <h1 className="word">
        marko<b>ćirić</b>
      </h1>
      <span className="sub">{sub}</span>
    </div>
  )
}
