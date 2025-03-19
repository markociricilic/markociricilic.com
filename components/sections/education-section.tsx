import { AsciiArt } from "@/components/ascii-art"

export function EducationSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="education" />

      <div className="space-y-6">
        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">University of Toronto, Toronto, ON</h3>
          <p className="text-sm">BASc in Computer Engineering</p>
          <p className="text-xs text-muted-foreground">May 2025</p>
          <div className="mt-2">
            <h4 className="text-sm font-semibold">Relevant Coursework:</h4>
            <ul className="text-xs mt-1 space-y-1 list-disc pl-4">
              <li>ECE532: Digital Systems Design</li>
              <li>ECE552: Computer Architecture</li>
              <li>ECE342: Computer Hardware</li>
              <li>ECE243: Computer Organization</li>
              <li>ECE437: VLSI Technology</li>
              <li>ECE334: Digital Electronics</li>
              <li>ECE430: Analog Integrated Circuits</li>
              <li>ECE331: Analog Electronics</li>
              <li>ECE568: Computer Security</li>
              <li>ECE344: Operating Systems</li>
            </ul>
          </div>
        </div>

        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">Clayton Heights Secondary School, Surrey, BC</h3>
          <p className="text-sm">Dogwood Diploma, i.e. B.C. Certificate of Graduation</p>
          <p className="text-xs text-muted-foreground">June 2020</p>
        </div>
      </div>
    </div>
  )
}

