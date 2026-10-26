import { Duo } from "@/components/site/duo"

// The photo banner above the nav on desktop, like Afterlab's skyline strip.
export function Horizon({ src, position, label }: { src: string; position?: string; label: string }) {
  return (
    <div className="horizon" aria-hidden="true">
      <Duo src={src} position={position} />
      <div className="wedge" />
      <svg className="overlay" viewBox="0 0 600 230" preserveAspectRatio="none">
        <line className="dim dash" x1="0" y1="150" x2="600" y2="150" />
        <circle className="dim" cx="92" cy="80" r="9" />
        <line className="dim" x1="78" y1="80" x2="106" y2="80" />
        <line className="dim" x1="92" y1="66" x2="92" y2="94" />
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
