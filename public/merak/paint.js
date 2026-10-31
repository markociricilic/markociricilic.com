// Paints the globe texture as a night-time dot-matrix display in the colours of
// markociricilic.com: black, amber and straw. Every country is outlined; the ones
// on the route light up as a grid of LED cells with circuit-board traces.
// Equirectangular, so it wraps the sphere.
const BG = "#060606"
const AMBER = "#f0ac2e"
const STRAW = "#f7d27a"
const DARK_LAND = "#13110d"
const LINE = "#2a2620"

function rng(seed) {
  let s = seed >>> 0 || 1
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

// render features into a white-on-black mask and return its pixels
function mask(W, H, draw) {
  const cv = document.createElement("canvas")
  cv.width = W
  cv.height = H
  const c = cv.getContext("2d", { willReadFrequently: true })
  c.fillStyle = "#fff"
  draw(c)
  return c.getImageData(0, 0, W, H).data
}

export function paintGlobe(topo, visited, { W = 4096, H = 2048 } = {}) {
  const cv = document.createElement("canvas")
  cv.width = W
  cv.height = H
  const ctx = cv.getContext("2d")
  const r = rng(7)
  const proj = d3.geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]).precision(0.2)

  const countries = topojson.feature(topo, topo.objects.countries).features
  const on = countries.filter((f) => visited.has(f.properties.name))
  const coast = topojson.mesh(topo, topo.objects.countries, (a, b) => a === b)
  const borders = topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b)

  // 1. sea: black with a faint dot grid
  ctx.fillStyle = BG
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = "rgba(240,172,46,0.07)"
  for (let y = 8; y < H; y += 16) for (let x = 8; x < W; x += 16) ctx.fillRect(x, y, 2, 2)

  // 2. graticule: thin lines every 15°, brighter every 45°, a dashed amber equator
  const geo = d3.geoPath(proj, ctx)
  ctx.lineWidth = 1.2
  ctx.strokeStyle = LINE
  ctx.beginPath(); geo(d3.geoGraticule().step([15, 15])()); ctx.stroke()
  ctx.strokeStyle = "#4a4134"
  ctx.lineWidth = 1.6
  ctx.beginPath(); geo(d3.geoGraticule().step([45, 45])()); ctx.stroke()
  ctx.setLineDash([18, 12])
  ctx.strokeStyle = "rgba(240,172,46,0.45)"
  ctx.lineWidth = 2
  ctx.beginPath(); geo({ type: "LineString", coordinates: d3.range(-180, 181, 5).map((x) => [x, 0]) }); ctx.stroke()
  ctx.setLineDash([])

  // 3. land: other countries stay dark; the ones we've been to light up as LED cells
  ctx.fillStyle = DARK_LAND
  ctx.beginPath(); geo({ type: "FeatureCollection", features: countries }); ctx.fill()
  const lit = mask(W, H, (c) => { c.beginPath(); d3.geoPath(proj, c)({ type: "FeatureCollection", features: on }); c.fill() })
  const S = 10, CELL = 6
  for (let y = S / 2; y < H; y += S) {
    for (let x = S / 2; x < W; x += S) {
      if (lit[(Math.floor(y) * W + Math.floor(x)) * 4] < 128) continue
      const k = r()
      ctx.fillStyle = k < 0.12 ? "#fff3cf" : k < 0.55 ? STRAW : AMBER
      ctx.fillRect(x - CELL / 2, y - CELL / 2, CELL, CELL)
    }
  }

  // 4. circuit traces inside the lit countries: right angles and 45° jogs, with vias
  on.forEach((f, i) => {
    const [[x0, y0], [x1, y1]] = geo.bounds(f)
    if (!isFinite(x0) || x1 - x0 > W * 0.9) return
    const rr = rng(300 + i)
    const n = Math.min(26, Math.max(2, Math.round(((x1 - x0) * (y1 - y0)) / 2500)))
    ctx.save()
    ctx.beginPath(); geo(f); ctx.clip()
    ctx.strokeStyle = "#140d02"
    ctx.fillStyle = "#140d02"
    ctx.lineWidth = 3
    ctx.lineCap = "square"
    for (let k = 0; k < n; k++) {
      let x = x0 + rr() * (x1 - x0), y = y0 + rr() * (y1 - y0)
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.moveTo(x, y)
      for (let s = 0; s < 3; s++) {
        const len = 20 + rr() * 60, dir = Math.floor(rr() * 4)
        if (rr() < 0.4) { const d = len * 0.5; x += dir % 2 ? d : -d; y += dir < 2 ? d : -d } // 45° jog
        else if (dir % 2) x += dir < 2 ? len : -len
        else y += dir < 2 ? len : -len
        ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.stroke()
    }
    ctx.restore()
  })

  // 5. lines with a neon glow: every border, amber coastline, straw outline on the route
  ctx.lineJoin = "round"
  ctx.strokeStyle = "rgba(240,172,46,0.5)"
  ctx.lineWidth = 1.4
  ctx.beginPath(); geo(borders); ctx.stroke()
  ctx.shadowColor = AMBER
  ctx.shadowBlur = 10
  ctx.strokeStyle = "rgba(240,172,46,0.7)"
  ctx.lineWidth = 1.8
  ctx.beginPath(); geo(coast); ctx.stroke()
  ctx.shadowColor = STRAW
  ctx.shadowBlur = 18
  ctx.strokeStyle = STRAW
  ctx.lineWidth = 2.6
  on.forEach((f) => { ctx.beginPath(); geo(f); ctx.stroke() })
  ctx.shadowBlur = 0

  // 6. scanlines; they curve with the sphere like a CRT
  ctx.fillStyle = "rgba(0,0,0,0.22)"
  for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 1.5)
  return cv
}

// The globe texture goes soft up close, so zooming in repaints just the area in view
// from the map's outlines, K pixels per degree. Same look, finer LED cells, fixed to a
// lat/lng grid so neighbouring close-ups line up.
const CELL_DEG = 0.2
let shapes = null
export function paintCloseup(topo, visited, [west, south, east, north], K) {
  if (!shapes) {
    const countries = topojson.feature(topo, topo.objects.countries).features
    shapes = {
      land: { type: "FeatureCollection", features: countries },
      on: { type: "FeatureCollection", features: countries.filter((f) => visited.has(f.properties.name)) },
      coast: topojson.mesh(topo, topo.objects.countries, (a, b) => a === b),
      borders: topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b),
    }
  }
  const W = Math.round((east - west) * K), H = Math.round((north - south) * K)
  const cv = document.createElement("canvas")
  cv.width = W
  cv.height = H
  const ctx = cv.getContext("2d")
  const rad = Math.PI / 180, S = K / rad
  const proj = d3.geoEquirectangular().scale(S).translate([-west * rad * S, north * rad * S]).clipExtent([[0, 0], [W, H]]).precision(0.1)
  const geo = d3.geoPath(proj, ctx)
  const toX = (lng) => (lng - west) * K, toY = (lat) => (north - lat) * K
  const first = (v) => Math.ceil(v / CELL_DEG) * CELL_DEG

  ctx.fillStyle = BG
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = "rgba(240,172,46,0.07)"
  for (let lat = first(south); lat < north; lat += CELL_DEG) for (let lng = first(west); lng < east; lng += CELL_DEG) ctx.fillRect(toX(lng) - 1, toY(lat) - 1, 2, 2)
  ctx.lineWidth = 1.2
  ctx.strokeStyle = LINE
  ctx.beginPath(); geo(d3.geoGraticule().step([15, 15])()); ctx.stroke()

  ctx.fillStyle = DARK_LAND
  ctx.beginPath(); geo(shapes.land); ctx.fill()
  const lit = mask(W, H, (c) => { c.beginPath(); d3.geoPath(proj, c)(shapes.on); c.fill() })
  const cell = CELL_DEG * K * 0.62
  for (let lat = first(south); lat < north; lat += CELL_DEG) {
    for (let lng = first(west); lng < east; lng += CELL_DEG) {
      const x = Math.round(toX(lng)), y = Math.round(toY(lat))
      if (x < 0 || y < 0 || x >= W || y >= H || lit[(y * W + x) * 4] < 128) continue
      // colour from the cell's position, so it's the same in every close-up
      const k = rng(Math.round(lat * 5) * 7919 + Math.round(lng * 5) * 104729 + 1)()
      ctx.fillStyle = k < 0.12 ? "#fff3cf" : k < 0.55 ? STRAW : AMBER
      ctx.fillRect(x - cell / 2, y - cell / 2, cell, cell)
    }
  }

  // the glow is wide see-through strokes: shadowBlur takes seconds on a canvas this big
  ctx.lineJoin = "round"
  ctx.strokeStyle = "rgba(240,172,46,0.5)"
  ctx.lineWidth = 1.5
  ctx.beginPath(); geo(shapes.borders); ctx.stroke()
  ctx.beginPath(); geo(shapes.coast)
  ctx.strokeStyle = "rgba(240,172,46,0.14)"; ctx.lineWidth = 9; ctx.stroke()
  ctx.strokeStyle = "rgba(240,172,46,0.85)"; ctx.lineWidth = 2; ctx.stroke()
  ctx.beginPath(); geo(shapes.on)
  ctx.strokeStyle = "rgba(247,210,122,0.16)"; ctx.lineWidth = 11; ctx.stroke()
  ctx.strokeStyle = STRAW; ctx.lineWidth = 2.4; ctx.stroke()

  ctx.fillStyle = "rgba(0,0,0,0.18)"
  for (let y = 0; y < H; y += 6) ctx.fillRect(0, y, W, 2)
  return cv
}

// Targeting reticle around the globe: a fine ring, a segmented ring turning
// slowly, a compass of ticks and corner brackets.
export function hudRing(ctx, cx, cy, R, t, heading = 0) {
  ctx.save()
  ctx.lineCap = "butt"
  ctx.strokeStyle = "rgba(240,172,46,0.55)"
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.arc(cx, cy, R + 6, 0, Math.PI * 2); ctx.stroke()

  // segmented ring
  const spin = t / 9000
  ctx.lineWidth = 3
  for (let s = 0; s < 12; s++) {
    const a = spin + (s / 12) * Math.PI * 2
    ctx.strokeStyle = s % 4 === 0 ? "rgba(247,210,122,0.9)" : "rgba(240,172,46,0.35)"
    ctx.beginPath(); ctx.arc(cx, cy, R + 14, a, a + (Math.PI * 2) / 12 - 0.06); ctx.stroke()
  }
  // counter-rotating short arcs
  ctx.lineWidth = 1.5
  ctx.strokeStyle = "rgba(247,210,122,0.8)"
  for (let s = 0; s < 3; s++) {
    const a = -spin * 1.7 + (s / 3) * Math.PI * 2
    ctx.beginPath(); ctx.arc(cx, cy, R + 24, a, a + 0.35); ctx.stroke()
  }

  // compass ticks, turning with the globe's longitude
  ctx.strokeStyle = "rgba(240,172,46,0.5)"
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let d = 0; d < 360; d += 5) {
    const a = ((d - heading) * Math.PI) / 180
    const r0 = R + 30, r1 = r0 + (d % 30 === 0 ? 9 : 4)
    ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0)
    ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1)
  }
  ctx.stroke()

  // corner brackets
  const B = R + 46, L = Math.max(14, R * 0.12)
  ctx.strokeStyle = "rgba(247,210,122,0.85)"
  ctx.lineWidth = 2
  ctx.beginPath()
  for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    const x = cx + sx * B, y = cy + sy * B
    ctx.moveTo(x, y - sy * L); ctx.lineTo(x, y); ctx.lineTo(x - sx * L, y)
  }
  ctx.stroke()
  ctx.restore()
}
