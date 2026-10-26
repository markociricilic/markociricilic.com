// Block diagram for a project, drawn as SVG in the site's line-art style.
// Blocks sit on a grid (col, row); edges are routed with right angles.

export type DiagramNode = {
  id: string
  label: string[] // one entry per line
  col: number
  row: number
  accent?: boolean // highlight (e.g. input/output blocks)
}

export type DiagramEdge = {
  from: string
  to: string
}

export type DiagramSpec = {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  caption?: string
}

const COL = 210 // column pitch
const ROW = 72 // row pitch
const W = 150 // block size
const H = 44
const PAD = 14

export function SystemDiagram({ spec, id }: { spec: DiagramSpec; id: string }) {
  const byId = new Map(spec.nodes.map((n) => [n.id, n]))
  const cols = Math.max(...spec.nodes.map((n) => n.col)) + 1
  const rows = Math.max(...spec.nodes.map((n) => n.row)) + 1
  const width = PAD * 2 + (cols - 1) * COL + W
  const height = PAD * 2 + (rows - 1) * ROW + H

  const x = (n: DiagramNode) => PAD + n.col * COL
  const y = (n: DiagramNode) => PAD + n.row * ROW
  const cx = (n: DiagramNode) => x(n) + W / 2
  const cy = (n: DiagramNode) => y(n) + H / 2

  // Same column: straight down/up. Different column: leave from the bottom,
  // drop to the target's middle, then run sideways into its edge.
  const route = (a: DiagramNode, b: DiagramNode) => {
    if (a.col === b.col) {
      const down = b.row > a.row
      return `M${cx(a)},${down ? y(a) + H : y(a)} V${down ? y(b) - 2 : y(b) + H + 2}`
    }
    if (a.row === b.row) {
      const right = b.col > a.col
      return `M${right ? x(a) + W : x(a)},${cy(a)} H${right ? x(b) - 2 : x(b) + W + 2}`
    }
    const left = b.col < a.col
    return `M${cx(a)},${y(a) + H} V${cy(b)} H${left ? x(b) + W + 2 : x(b) - 2}`
  }

  const marker = `arrow-${id}`

  return (
    <figure className="sysdiag">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={spec.caption ?? "System diagram"}>
        <defs>
          <marker id={marker} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L8,4 L0,8 Z" className="sd-head" />
          </marker>
        </defs>

        {spec.edges.map((e) => {
          const a = byId.get(e.from)
          const b = byId.get(e.to)
          if (!a || !b) return null
          return <path key={`${e.from}-${e.to}`} d={route(a, b)} className="sd-edge" markerEnd={`url(#${marker})`} />
        })}

        {spec.nodes.map((n, i) => (
          <g key={n.id} className={n.accent ? "sd-node accent" : "sd-node"}>
            <rect x={x(n)} y={y(n)} width={W} height={H} />
            <rect x={x(n)} y={y(n)} width={6} height={6} className="sd-tick" />
            <text x={x(n) + W - 6} y={y(n) + 11} className="sd-idx" textAnchor="end">
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={cx(n)} y={cy(n) + 4.5 - (n.label.length - 1) * 7.5} className="sd-label" textAnchor="middle">
              {n.label.map((line, j) => (
                <tspan key={j} x={cx(n)} dy={j === 0 ? 0 : 15}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        ))}
      </svg>
      {spec.caption && <figcaption>{spec.caption}</figcaption>}
    </figure>
  )
}
