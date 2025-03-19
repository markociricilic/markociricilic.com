import { AsciiArt } from "@/components/ascii-art"
import { AsciiPortraitComparison } from "@/components/ascii-portrait-comparison"

export function AboutSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="about" />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/5">
          <AsciiPortraitComparison />
          <div className="text-center text-xs text-muted-foreground mt-2">
            Marko (Džidžan) Ćirić Ilić
            <br />
            <span className="text-primary/60">RTL Design Engineer</span>
          </div>
        </div>

        <div className="space-y-3 md:w-3/5">
          <p>
            Hi! I'm Marko Ćirić. Aspiring computer architect.
          </p>

          <p>
            In the past, I've worked at Advanced Micro Devices, Inc. (AMD) as a Graphics IP Design Intern where as a member 
            of the Geometry team, I worked to implement tessellations in hardware, for multiple next generation Radeon Graphics Cards.
          </p>

          <p>
            With additional computer hardware experience from university courses and personal projects, I currently focus primarily on the 
            intersection of computer hardware and computer graphics, but have an extended interest in ASICs for AI acceleration as a future career.
          </p>

          <div className="mt-2 p-3 border border-primary/20 rounded bg-primary/5">
            <h3 className="text-primary font-bold mb-2">Personal Bio:</h3>
            <div className="space-y-2 text-sm">
              <p>
                I was born in Belgrade, Serbia in 2002 but I grew up in Vancouver, BC before moving to Toronto, ON for university.
              </p>

              <p>
                I have interests in music, including record collecting and DJing, home cooking, sailing, martial arts, specifically karate
                and judo, hiking, and fashion.
              </p>

              <p>
                Thinking about it now, my interests together involve some combination of passion, introspection, creativity, logic, and 
                discipline.
              </p>

              <p>
                So, it's perhaps not surprising that I'm pursuing a career in ASIC and RTL design where the field as a whole, 
                also constitutes and requires, in some ways, a combination of these mindsets/skills.
              </p>
            </div>
          </div>

          <div className="mt-2 p-3 border border-primary/20 rounded bg-primary/5">
            <h3 className="text-primary font-bold mb-2">Quick Facts:</h3>
            <ul className="space-y-1">
              <li>
                <span className="text-muted-foreground">Location:</span> Toronto, ON
              </li>
              <li>
                <span className="text-muted-foreground">Education:</span> BASc in Computer Engineering, University of Toronto
              </li>
              <li>
                <span className="text-muted-foreground">Specialty:</span> Computer Hardware, Computer Architecture, Digital Systems Design, VLSI Technology, Analog/Digital Electronics, Embedded Systems
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

