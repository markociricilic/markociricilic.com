// A photo tinted into the hibiscus duotone (see .duo in globals.css).
export function Duo({
  src,
  alt = "",
  position,
  className = "",
}: {
  src: string
  alt?: string
  position?: string
  className?: string
}) {
  return (
    <div className={`duo ${className}`}>
      <img src={src} alt={alt} style={position ? { objectPosition: position } : undefined} />
    </div>
  )
}

// A tilted photo cut-out placed on the collage.
export function Cut({ src, position, style }: { src: string; position?: string; style: React.CSSProperties }) {
  return (
    <div className="cut" style={style} aria-hidden="true">
      <Duo src={src} position={position} />
    </div>
  )
}
