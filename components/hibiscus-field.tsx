"use client"

import { useRef, useEffect } from "react"

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

export function HibiscusField({ isDarkMode }: { isDarkMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const darkRef = useRef(isDarkMode)
  darkRef.current = isDarkMode

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = 200
    const H = 300
    canvas.width = W
    canvas.height = H

    const ctx = canvas.getContext("2d")!
    ctx.imageSmoothingEnabled = false

    const SKY_H = 75
    const FIELD_H = H - SKY_H  // 225px

    // Precompute row base y positions with perspective spacing
    const NUM_ROWS = 18
    const baseYs: number[] = []
    for (let i = 0; i < NUM_ROWS; i++) {
      const p = i / (NUM_ROWS - 1)
      baseYs.push(SKY_H + Math.round(FIELD_H * Math.pow(p, 1.4)))
    }

    // Full row config — rows span the entire width W
    const rows = baseYs.map((baseY, i) => {
      const p = i / (NUM_ROWS - 1)
      const gap = i === 0 ? 5 : baseY - baseYs[i - 1]
      const bandH = Math.max(2, gap)
      // Arc: centre of each row sits slightly higher on screen than edges
      // (negative arcOffset at centre → smaller y → higher → looks like the
      //  centre recedes into the valley)
      const curve = p * 4          // max 4 canvas-px dip at centre for near rows
      const count = Math.max(5, Math.round(22 - 15 * p))
      return { baseY, bandH, curve, count, p }
    })

    // arc offset at a given x — makes the centre appear higher / farther away
    const arc = (curve: number, x: number) =>
      -Math.round(curve * Math.sin(Math.PI * x / W) ** 2)

    // ── stars / clouds helpers (unchanged) ──
    const stars: number[][] = [
      [12, 6], [35, 12], [58, 4], [78, 18], [100, 8], [122, 20], [145, 5], [168, 14], [190, 9],
      [22, 32], [48, 44], [72, 28], [98, 50], [130, 36], [158, 48], [182, 30],
      [8, 55], [55, 62], [110, 58], [162, 65], [192, 52],
    ]
    const brightStars: number[][] = [[40, 20], [95, 40], [172, 22], [62, 60]]
    const clouds = [
      { baseX: 20,  y: 12, w: 38, h: 14, speed: 2.4 },
      { baseX: 100, y: 5,  w: 50, h: 18, speed: 1.7 },
      { baseX: 175, y: 20, w: 32, h: 12, speed: 3.1 },
    ]
    const drawCloud = (cx: number, cy: number, w: number, h: number) => {
      ctx.beginPath()
      ctx.arc(cx,            cy + h * 0.62, h * 0.50, 0, Math.PI * 2)
      ctx.arc(cx + w * 0.28, cy + h * 0.35, h * 0.62, 0, Math.PI * 2)
      ctx.arc(cx + w * 0.58, cy + h * 0.50, h * 0.50, 0, Math.PI * 2)
      ctx.arc(cx + w * 0.16, cy + h * 0.70, h * 0.42, 0, Math.PI * 2)
      ctx.arc(cx + w * 0.44, cy + h * 0.68, h * 0.40, 0, Math.PI * 2)
      ctx.fill()
    }

    let raf: number

    const draw = (ts: number) => {
      const t = ts / 1000
      const dark = darkRef.current

      // ── SKY ──
      const skyGrad = ctx.createLinearGradient(0, 0, 0, SKY_H)
      if (dark) {
        skyGrad.addColorStop(0, "#01000a")
        skyGrad.addColorStop(0.55, "#06031a")
        skyGrad.addColorStop(1, "#180b34")
      } else {
        skyGrad.addColorStop(0, "#1558a8")
        skyGrad.addColorStop(0.5, "#4e98d8")
        skyGrad.addColorStop(0.8, "#f0c060")
        skyGrad.addColorStop(1, "#ee8830")
      }
      ctx.fillStyle = skyGrad
      ctx.fillRect(0, 0, W, SKY_H)

      if (dark) {
        ctx.fillStyle = "#a8a098"
        stars.forEach(([sx, sy]) => ctx.fillRect(sx, sy, 1, 1))
        ctx.fillStyle = "#ffffc8"
        brightStars.forEach(([sx, sy]) => {
          ctx.fillRect(sx - 1, sy, 3, 1)
          ctx.fillRect(sx, sy - 1, 1, 3)
        })
        ctx.fillStyle = "#dcd6c4"
        ctx.beginPath(); ctx.arc(158, 26, 10, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = "#06031a"
        ctx.beginPath(); ctx.arc(153, 23, 9, 0, Math.PI * 2); ctx.fill()
      } else {
        ctx.fillStyle = "rgba(255,255,255,0.82)"
        clouds.forEach(cloud => {
          const totalW = W + cloud.w * 2
          const rawX = cloud.baseX - (t * cloud.speed) % totalW
          const cx = rawX < -cloud.w ? rawX + totalW : rawX
          drawCloud(cx, cloud.y, cloud.w, cloud.h)
        })
        ctx.fillStyle = "rgba(255,205,70,0.16)"
        ctx.beginPath(); ctx.arc(155, 23, 22, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = "rgba(255,210,80,0.30)"
        ctx.beginPath(); ctx.arc(155, 23, 16, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = "#ffd030"
        ctx.beginPath(); ctx.arc(155, 23, 12, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = "#fff588"
        ctx.beginPath(); ctx.arc(155, 23, 7, 0, Math.PI * 2); ctx.fill()
      }

      // ── FIELD BACKGROUND (earthy soil between rows) ──
      const fieldGrad = ctx.createLinearGradient(0, SKY_H, 0, H)
      if (dark) {
        fieldGrad.addColorStop(0, "#180b34")
        fieldGrad.addColorStop(0.4, "#0c0820")
        fieldGrad.addColorStop(1, "#030708")
      } else {
        fieldGrad.addColorStop(0, "#c0a0d8")
        fieldGrad.addColorStop(0.15, "#a08050")
        fieldGrad.addColorStop(0.5, "#8a7038")
        fieldGrad.addColorStop(1, "#706028")
      }
      ctx.fillStyle = fieldGrad
      ctx.fillRect(0, SKY_H, W, FIELD_H)

      // ── LAVENDER ROWS — full-width, back → front ──
      rows.forEach((row) => {
        const { baseY, bandH, curve, count, p } = row
        const windSpeed = 0.55 + p * 0.4
        const rowPhase = baseY * 0.04
        // Gap positions converge toward centre (W/2) at the horizon (p→0),
        // spread to full width at the foreground (p→1) — perspective projection.
        const N_GAPS = 9
        const GAP_HALF = Math.max(1, Math.round(p * 2))
        const isGap = new Uint8Array(W)
        for (let gi = 1; gi <= N_GAPS; gi++) {
          const frac = gi / (N_GAPS + 1)
          const gapX = Math.round(W * 0.5 + (frac - 0.5) * W * p)
          for (let dx = -GAP_HALF; dx <= GAP_HALF; dx++) {
            const px = gapX + dx
            if (px >= 0 && px < W) isGap[px] = 1
          }
        }

        // Draw the curved lavender band pixel-column by pixel-column
        for (let x = 0; x < W; x++) {
          const a = arc(curve, x)
          const yBot = baseY + a
          const yTop = yBot - bandH
          if (yTop >= H || yBot < SKY_H) continue

          const drawTop = Math.max(SKY_H, yTop)
          const drawBot = Math.min(H - 1, yBot)
          if (drawBot <= drawTop) continue

          if (isGap[x]) {
            ctx.fillStyle = dark ? "#2a1e10" : "#b09858"
            ctx.fillRect(x, drawTop, 1, drawBot - drawTop)
          } else {
            // Wind wave travels across the row (left → right)
            const wind = Math.sin(t * windSpeed - x * 0.035 + rowPhase) * 0.13
            // Stable per-column texture hash — no flicker since it doesn't use time
            const th = (x * 7 + Math.round(baseY) * 11) % 9
            const tv = (th - 4) * 6  // ±24 brightness nudge

            let r: number, g: number, bv: number
            if (dark) {
              const base = 0.21 + wind + p * 0.04
              r  = clamp(Math.round(12  + base * 28 + tv * 0.3), 0, 255)
              g  = clamp(Math.round(38  + base * 58 + tv),       0, 255)
              bv = clamp(Math.round(10  + base * 22 - tv * 0.2), 0, 255)
            } else {
              const base = 0.50 + wind + p * 0.12
              r  = clamp(Math.round(28  + base * 42 + tv * 0.4), 0, 255)
              g  = clamp(Math.round(85  + base * 75 + tv),       0, 255)
              bv = clamp(Math.round(18  + base * 30 - tv * 0.2), 0, 255)
            }

            ctx.fillStyle = `rgb(${r},${g},${bv})`
            ctx.fillRect(x, drawTop, 1, drawBot - drawTop)

            // Sparse scattered grass-tip pixels — large prime multipliers avoid clustering
            const bi = Math.round(baseY)
            const colH = drawBot - drawTop
            for (let gy = 0; gy < colH; gy++) {
              if ((x * 1619 + gy * 701 + bi * 331) % 100 < 7) {
                ctx.fillStyle = dark ? "#2d5520" : "#98d055"
                ctx.fillRect(x, drawTop + gy, 1, 1)
              }
            }
          }
        }

        // ── Hibiscus flowers ──
        const flowerR = Math.max(2, Math.round(1 + 4 * p))
        const stemH   = Math.max(2, Math.round(3 + 10 * p))

        for (let i = 0; i < count; i++) {
          const bx = Math.round((i + 0.5) * W / count)
          if (isGap[bx]) continue
          const a = arc(curve, bx)
          const surfaceY = baseY + a

          const sway = Math.sin(t * windSpeed - bx * 0.035 + rowPhase) * p * 1.2
          const tipX = Math.round(bx + sway)
          const stemTopY = surfaceY - stemH

          // Green stem
          for (let fy = 0; fy < stemH; fy++) {
            const py = surfaceY - fy
            if (py >= SKY_H && py < H) {
              ctx.fillStyle = dark ? "#1a3510" : "#2d7020"
              ctx.fillRect(tipX, py, 1, 1)
            }
          }

          // Hibiscus flower head — circular with lower-centre gap for petal split,
          // lighter colour at petal edges, yellow stamen at centre
          const petalCol = dark ? "#7a1020" : "#d03050"
          const edgeCol  = dark ? "#9a2540" : "#f06080"
          const stamCol  = dark ? "#a87010" : "#ffd020"

          for (let dy = -flowerR; dy <= flowerR; dy++) {
            const py = stemTopY + dy
            if (py < SKY_H || py >= H) continue
            const absDy = Math.abs(dy)
            const halfW = Math.round(flowerR * Math.sqrt(Math.max(0, 1 - (absDy / (flowerR + 0.5)) ** 2)))
            for (let dx = -halfW; dx <= halfW; dx++) {
              const px = tipX + dx
              if (px < 0 || px >= W) continue
              if (dy >= Math.round(flowerR * 0.35) && Math.abs(dx) < 1) continue
              const isStamen = Math.abs(dx) <= 1 && absDy <= 1
              const isEdge   = Math.abs(dx) + absDy >= flowerR
              ctx.fillStyle = isStamen ? stamCol : isEdge ? edgeCol : petalCol
              ctx.fillRect(px, py, 1, 1)
            }
          }
        }
      })

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", imageRendering: "pixelated", display: "block" }}
    />
  )
}
