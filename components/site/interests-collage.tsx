import Link from "next/link"
import { Duo } from "@/components/site/duo"
import { LogoStrip } from "@/components/site/horizon"

// Interests page art panel: Matmata home interior (duotone) with full-colour
// cut-outs of the "Untitled 6" pastel figure and five home-cooked plates.
const plates = [
  { src: "/images/collage/plate-trout.webp", cls: "ic-trout", alt: "Rainbow trout" },
  { src: "/images/collage/plate-pear.webp", cls: "ic-pear", alt: "Hibiscus poached pear" },
  { src: "/images/collage/plate-ragu.webp", cls: "ic-ragu", alt: "Beef ragù pasta" },
  { src: "/images/collage/plate-curry.webp", cls: "ic-curry", alt: "Thai-inspired yellow curry" },
  { src: "/images/collage/plate-steak.webp", cls: "ic-steak", alt: "Steak with creamy peppercorn sauce" },
]

export function InterestsCollage() {
  return (
    <aside className="art icollage" aria-label="Collage">
      <Duo src="/images/interests/photography-274.jpg" alt="" position="50% 55%" />
      <div className="shard d" />
      <div className="shard a" />
      <div className="shard h" />

      <svg className="overlay" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="dim" d="M30 62 H46 L54 54 H70" />
        <rect className="fill" x="24" y="59" width="6" height="6" />
        <line className="dim dash" x1="470" y1="40" x2="470" y2="180" />
        <polyline className="dim" points="500,560 500,540 516,540 516,560 532,560 532,540 548,540" />
        <text x="40" y="780">MATMATA 2011 — HOME KITCHEN / STUDIO</text>
      </svg>

      {plates.map((p) => (
        <img key={p.cls} className={`ic-cut ic-plate ${p.cls}`} src={p.src} alt={p.alt} loading="lazy" decoding="async" />
      ))}
      <img className="ic-cut ic-figure" src="/images/collage/art6-figure.webp" alt="Figure from oil pastel Untitled 6" decoding="async" />

      <a className="tag hot" href="#cooking" style={{ top: "27%", left: "4%" }}>
        Cooking
      </a>
      <a className="tag" href="#art" style={{ top: "30%", left: "70%" }}>
        Art
      </a>
      <a className="tag desk-only" href="#photography" style={{ top: "90%", left: "60%" }}>
        Photography
      </a>
      <a className="tag desk-only" href="#music" style={{ top: "66%", left: "36%" }}>
        Music
      </a>
      <Link className="tag" href="/" style={{ top: "20%", left: "70%" }}>
        ← Portfolio
      </Link>
      <LogoStrip num="27" />
    </aside>
  )
}
