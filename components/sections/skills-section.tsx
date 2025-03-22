import { AsciiArt } from "@/components/ascii-art"

export function SkillsSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="skills" />

      <div className="space-y-6">
        <div>
          <h3 className="text-primary font-bold mb-2">Hardware</h3>
          <div className="space-y-2">
            <SkillBar name="ASIC" percentage={93} />
            <SkillBar name="FPGA" percentage={92} />
            <SkillBar name="RTL Design" percentage={90} />
            <SkillBar name="SystemVerilog" percentage={90} />
            <SkillBar name="Synopsys VCS" percentage={88} />
            <SkillBar name="Synopsys Verdi" percentage={86} />
            <SkillBar name="Lint" percentage={82} />
            <SkillBar name="Static Timing Analysis" percentage={81} />
            <SkillBar name="AMD Vivado Design Suite" percentage={80} />
            <SkillBar name="AMD Vitis Unified Software Platform" percentage={75} />
            <SkillBar name="Intel Quartus Prime" percentage={70} />
            <SkillBar name="ModelSim" percentage={66} />
          </div>
        </div>

        <div>
          <h3 className="text-primary font-bold mb-2">Software</h3>
          <div className="space-y-2">
            <SkillBar name="C" percentage={94} />
            <SkillBar name="C++" percentage={93} />
            <SkillBar name="Python" percentage={82} />
            <SkillBar name="Perl" percentage={81} />
            <SkillBar name="Perforce" percentage={75} />
            <SkillBar name="ARM Assembly" percentage={72} />
            <SkillBar name="Git" percentage={70} />
          </div>
        </div>

        <div>
          <h3 className="text-primary font-bold mb-2">Operating Systems</h3>
          <div className="space-y-2">
            <SkillBar name="Linux" percentage={90} />
            <SkillBar name="Windows" percentage={87} />
            <SkillBar name="Android" percentage={80} />
            <SkillBar name="Unix" percentage={72} />
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillBar({ name, percentage }: { name: string; percentage: number }) {
  // Determine the color based on percentage range
  const getBarColor = (percent: number) => {
    if (percent >= 86) return "bg-green-500" // Green for 86-100%
    if (percent >= 71) return "bg-yellow-500" // Yellow for 71-85%
    return "bg-red-500" // Red for 55-70%
  }

  const barColor = getBarColor(percentage)

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span>{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} skill level: ${percentage}%`}
        />
      </div>
    </div>
  )
}
