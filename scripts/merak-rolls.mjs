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

// which city each photo number belongs to: { country: { city: "12-14,20" } }
const cities = JSON.parse(readFileSync("scripts/merak-cities.json", "utf8"))
const numbers = (ranges) =>
  ranges.split(",").flatMap((r) => {
    const [a, b = a] = r.split("-").map(Number)
    return Array.from({ length: b - a + 1 }, (_, i) => a + i)
  })

const countries = JSON.parse(s.match(/countries=\{(\[[^\]]+\])\}/)[1])
const rolls = {}
let placed = 0
for (const c of countries) {
  const cityOf = {}
  for (const [city, ranges] of Object.entries(cities[c] ?? {})) for (const n of numbers(ranges)) cityOf[n] = city
  const photos = items.filter((p) => p.title.startsWith(c))
  const yearOf = (p) => p.title.slice(c.length).match(/\d{4}/)?.[0] ?? ""
  rolls[c] = {
    // a country visited more than once lists each year: "2018 · 2025"
    year: [...new Set(photos.map(yearOf))].join(" · "),
    photos: photos.map((p) => {
      // photos with no city still show in the country's full roll
      const city = cityOf[p.imageUrl.match(/photography-(\d+)/)[1]]
      if (city) placed++
      return { t: p.title.replace(/^[^:]+:\s*/, ""), d: p.description, src: p.imageUrl, y: yearOf(p), ...(city && { c: city }) }
    }),
  }
}
writeFileSync("public/merak/rolls.json", JSON.stringify(rolls))
console.log(`merak rolls: ${countries.length} countries, ${items.length} photos, ${placed} placed in a city`)
