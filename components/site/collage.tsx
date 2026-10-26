import Link from "next/link"
import { Cut, Duo } from "@/components/site/duo"
import { LogoStrip } from "@/components/site/horizon"

// Art panel: Lisbon photo, travel cut-outs, shapes and technical line art.
// Used on both pages; on the interests page the tags link back to homepage sections.
export function Collage({ page = "home" }: { page?: "home" | "interests" }) {
  const base = page === "home" ? "" : "/"

  return (
    <aside className="art" aria-label="Collage">
      <Duo className="main-photo" src="/images/interests/photography-21.jpg" alt="Marko in Lisbon" position="62% 35%" />
      <div className="shard d" />
      <div className="shard a" />
      <div className="shard b" />
      <div className="shard e" />
      <div className="shard f" />
      <div className="shard h" />
      <div className="shard i" />
      <div className="shard j" />

      <Cut
        src="/images/interests/photography-19.jpg"
        position="55% 55%"
        style={{ left: "4%", top: "6%", width: "30%", height: "22%", clipPath: "polygon(0 8%, 100% 0, 94% 100%, 4% 92%)" }}
      />
      <Cut
        src="/images/interests/photography-244.jpg"
        position="36% 44%"
        style={{ left: "37%", top: "6%", width: "13%", height: "24%", clipPath: "polygon(0 0, 100% 6%, 100% 100%, 0 94%)" }}
      />
      <Cut
        src="/images/interests/photography-78.jpg"
        position="45% 35%"
        style={{ right: "5%", top: "10%", width: "24%", height: "17%", clipPath: "polygon(0 0, 100% 12%, 88% 100%, 6% 88%)" }}
      />
      <Cut
        src="/images/interests/photography-104.jpg"
        position="50% 40%"
        style={{ left: "3%", top: "44%", width: "23%", height: "21%", clipPath: "polygon(6% 0, 100% 6%, 94% 100%, 0 94%)" }}
      />
      <Cut
        src="/images/interests/photography-56.jpg"
        position="72% 40%"
        style={{ left: "5%", bottom: "6%", width: "26%", height: "30%", clipPath: "polygon(12% 0, 100% 4%, 88% 100%, 0 96%)" }}
      />
      <Cut
        src="/images/interests/photography-186.jpg"
        position="50% 62%"
        style={{ right: "6%", bottom: "7%", width: "25%", height: "34%", clipPath: "polygon(0 8%, 100% 0, 100% 100%, 6% 100%)" }}
      />

      {/* Full-colour cut-out of Marko, aligned exactly over the tinted Lisbon photo */}
      <div className="figure" aria-hidden="true">
        <img src="/images/collage/marko-lisbon-cutout.webp" alt="" style={{ objectPosition: "62% 35%" }} />
      </div>

      <svg className="overlay" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {/* clock waveform */}
        <polyline className="dim" points="318,462 318,442 334,442 334,462 350,462 350,442 366,442 366,462 382,462 382,442" />
        <text x="318" y="434">CLK</text>
        <line className="dim dash" x1="350" y1="462" x2="350" y2="760" />
        <rect className="dim" x="470" y="300" width="18" height="18" />
        <rect className="dim" x="492" y="300" width="18" height="18" />
        <polyline className="dim" points="196,724 214,692 340,692" />
        <text x="222" y="686">LISBOA / 2025</text>
        <text x="222" y="706">38.71N 9.14W</text>
        <text x="40" y="780">MARKO.CIRIC.ILIC — BEYOND RTL 002.04</text>
        <path className="dim" d="M120 230 L120 290 M110 240 L130 240 M110 280 L130 280" />
        <text x="134" y="264">1.75</text>
        {/* IC chip with pins */}
        <rect className="dim" x="238" y="288" width="24" height="22" />
        <path className="dim" d="M232 293 H238 M232 299 H238 M232 305 H238 M262 293 H268 M262 299 H268 M262 305 H268" />
        <line className="dim dash" x1="250" y1="310" x2="250" y2="420" />
        <line className="dim dash" x1="250" y1="420" x2="330" y2="420" />
        <rect className="dim" x="60" y="430" width="14" height="14" />
        <rect className="fill" x="78" y="430" width="14" height="14" />
        <rect className="dim" x="96" y="430" width="14" height="14" />
        <text x="60" y="460">001 002 003</text>
        <polyline className="thick" points="420,540 470,520 520,540" />
        <polygon className="fill" points="528,536 540,540 528,546" />
        <path className="dim" d="M300 600 L380 760 L220 760 Z" />
        <line className="dim" x1="460" y1="660" x2="560" y2="660" />
        <line className="dim" x1="460" y1="654" x2="460" y2="666" />
        <line className="dim" x1="560" y1="654" x2="560" y2="666" />
        <text x="474" y="652">8-16 MHZ</text>
        {/* circuit trace ending in a pad */}
        <path className="dim" d="M30 62 H46 L54 54 H70" />
        <rect className="fill" x="24" y="59" width="6" height="6" />
        <text x="30" y="560">↑ 3D-2D PROJECTION</text>
      </svg>

      <a className="tag" href={`${base}#project-01`} style={{ top: "38%", left: "8%" }}>
        3D Gaussian Splatting
      </a>
      <a className="tag" href={`${base}#project-06`} style={{ top: "62%", left: "56%" }}>
        16-bit CPU
      </a>
      {page === "home" ? (
        <Link className="tag" href="/interests" style={{ top: "80%", left: "14%" }}>
          Interests →
        </Link>
      ) : (
        <Link className="tag" href="/" style={{ top: "80%", left: "14%" }}>
          ← Portfolio
        </Link>
      )}
      <a className="tag hot desk-only" href={`${base}#experience`} style={{ top: "50%", left: "22%" }}>
        ★ AMD Spotlight Awards
      </a>
      <a className="tag desk-only" href={`${base}#about-me`} style={{ top: "27%", left: "30%" }}>
        2002 / Beograd
      </a>
      <a className="tag desk-only" href={`${base}#project-04`} style={{ top: "88%", left: "60%" }}>
        Melody unit / MIU
      </a>
      <LogoStrip num="26" />
    </aside>
  )
}
