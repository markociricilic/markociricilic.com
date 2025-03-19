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
            <SkillBar name="Lint" percentage={85} />
            <SkillBar name="Synopsys VCS" percentage={84} />
            <SkillBar name="Synopsys Verdi" percentage={82} />
            <SkillBar name="AMD Vivado Design Suite" percentage={80} />
            <SkillBar name="AMD Vitis Unified Software Platform" percentage={75} />
            <SkillBar name="Intel Quartus Prime" percentage={72} />
            <SkillBar name="ModelSim" percentage={70} />
            <SkillBar name="Static Timing Analysis" percentage={68} />
          </div>
        </div>

        <div>
          <h3 className="text-primary font-bold mb-2">Software</h3>
          <div className="space-y-2">
            <SkillBar name="C" percentage={85} />
            <SkillBar name="C++" percentage={80} />
            <SkillBar name="Python" percentage={76} />
            <SkillBar name="Perforce" percentage={75} />
            <SkillBar name="ARM Assembly" percentage={70} />
            <SkillBar name="Git" percentage={65} />
            <SkillBar name="MATLAB" percentage={50} />
          </div>
        </div>

        <div>
          <h3 className="text-primary font-bold mb-2">Operating Systems</h3>
          <div className="space-y-2">
            <SkillBar name="Linux" percentage={85} />
            <SkillBar name="Windows" percentage={80} />
            <SkillBar name="Android" percentage={75} />
            <SkillBar name="Unix" percentage={70} />
            <SkillBar name="Ubuntu" percentage={60} />
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillBar({ name, percentage }: { name: string; percentage: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span>{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
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

