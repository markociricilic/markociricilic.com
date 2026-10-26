export function Section({
  id,
  title,
  index,
  children,
}: {
  id: string
  title: string
  index: string
  children: React.ReactNode
}) {
  return (
    <section className="sec" id={id}>
      <div className="sec-h">
        <span className="ico" />
        <h2>{title}</h2>
        <span className="rule" />
        <span className="idx">{index}</span>
      </div>
      {children}
    </section>
  )
}

export function Box({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="box">
      <span className="lbl">{label}</span>
      {children}
    </div>
  )
}
