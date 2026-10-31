// Writes public/merak/rolls.json (the globe page's photos) from photographyItems in the
// interests page, so both views stay in sync. Runs before every build.
import { readFileSync, writeFileSync } from "node:fs"

const s = readFileSync("app/interests/page.tsx", "utf8")
const a = s.indexOf("const photographyItems = [")
const body = s.slice(a, s.indexOf("\n]", a))
const unescape = (t) => t.replace(/\\(.)/g, "$1")

const items = []
const re = /title: "((?:[^"\\]|\\.)*)",\s*description: "((?:[^"\\]|\\.)*)",\s*imageUrl: "([^"]+)"/g
for (let m; (m = re.exec(body)); ) items.push({ title: unescape(m[1]), description: unescape(m[2]), imageUrl: m[3] })

const countries = JSON.parse(s.match(/countries=\{(\[[^\]]+\])\}/)[1])
const rolls = {}
for (const c of countries) {
  const photos = items.filter((p) => p.title.startsWith(c))
  const yearOf = (p) => p.title.slice(c.length).match(/\d{4}/)?.[0] ?? ""
  rolls[c] = {
    // a country visited more than once lists each year: "2018 · 2025"
    year: [...new Set(photos.map(yearOf))].join(" · "),
    photos: photos.map((p) => ({ t: p.title.replace(/^[^:]+:\s*/, ""), d: p.description, src: p.imageUrl, y: yearOf(p) })),
  }
}
writeFileSync("public/merak/rolls.json", JSON.stringify(rolls))
console.log(`merak rolls: ${countries.length} countries, ${items.length} photos`)
