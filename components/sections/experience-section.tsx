// import { AsciiArt } from "@/components/ascii-art"

export function ExperienceSection() {
  return (
    <div className="space-y-4">
      {/* <AsciiArt art="experience" /> */}

      <div className="space-y-6">
        <div className="relative pl-5 border-l border-primary/30">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1" />
          <div className="mb-1">
            <h3 className="text-primary font-bold">Graphics IP RTL Design Intern</h3>
            <p className="text-xs text-muted-foreground">Advanced Micro Devices, Inc. (AMD), Markham, ON | May 2023 - August 2024</p>
          </div>
          <ul className="text-sm space-y-1 list-disc pl-4">
            <li>
            Member of the Geometry (GE) sub-system team working as an RTL designer in the front-end Graphics pipeline to 
            implement tessellations for multiple next generation high-performance Radeon Graphics Cards.
            </li>
            <li>Provided day-to-day support for the design team by resolving triage failures using Verdi waveform debugging, resolving Lint errors, and other general debug tasks</li>
            <li>Updated common shared modules to be used for standardizing interfaces and implemented the module throughout GE pipeline</li>
            <li>Bundled several GE interfaces (both internal and external) for convenient debugging and code structure</li>
            <li>Implemented performance counters in GE for improved performance analysis</li>
            <li>Added back and integrated past-generation registers into RTL for new feature bring-up</li>
            <li>Implemented temporary RTL "hacks" for feature bring-up</li>
            <li>Resolved SEC (sequence equivalency checking) failures using static clock timing analysis practices</li>
            <li>Helped with preprocessing the RTL to prepare for the upcoming projects and cleaned up temporary feature macros before tape-out</li>
          </ul>
        </div>

        <div className="relative pl-5 border-l border-primary/30">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1" />
          <div className="mb-1">
            <h3 className="text-primary font-bold">Driverless Vehicle (DV) Hardware Team Member</h3>
            <p className="text-xs text-muted-foreground">UTFR University of Toronto Formula Racing, Toronto, ON | August 2022 - April 2023</p>
          </div>
          <ul className="text-sm space-y-1 list-disc pl-4">
            <li>Aided the driverless vehicle (DV) team with hardware development to satisfy the various electrical requirements of the FSAE competition</li>
            <li>Worked on developing the electrical activation of the emergency brakes (EBS)</li>
            <li>Helped with designing a controller to receive and transmit data over the CAN bus and distribute power to the driverless vehicle's electrical devices</li>
          </ul>
        </div>

        <div className="relative pl-5 border-l border-primary/30">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1" />
          <div className="mb-1">
            <h3 className="text-primary font-bold">ElecTRiC Workshop Teaching Assistant</h3>
            <p className="text-xs text-muted-foreground">Engineers Without Borders Canada, Toronto, ON | August 2022</p>
          </div>
          <ul className="text-sm space-y-1 list-disc pl-4">
            <li>Designed an analog piano with an audio amplifier circuit with added Bluetooth functionality via the HC-05 module and the Raspberry Pi Pico</li>
            <li>Taught this audio circuit to a class of high school students (Grades 9-12), introducing them to breadboarding, hardware debugging, microcontroller 
              programming with MicroPython, the Raspberry Pi Pico, and basic UART communication</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

