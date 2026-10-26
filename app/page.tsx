import { Collage } from "@/components/site/collage"
import { SystemDiagram, type DiagramSpec } from "@/components/site/system-diagram"
import { FooterBar } from "@/components/site/footer-bar"
import { Horizon, Logo } from "@/components/site/horizon"
import { Box, Section } from "@/components/site/section"
import { TopNav } from "@/components/site/top-nav"

const navLinks = [
  { href: "#about-me", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
]

const coursework = [
  "ECE532: Digital Systems Design",
  "ECE552: Computer Architecture",
  "ECE342: Computer Hardware",
  "ECE243: Computer Organization",
  "ECE437: VLSI Technology",
  "ECE334: Digital Electronics",
  "ECE430: Analog Integrated Circuits",
  "ECE331: Analog Electronics",
  "ECE568: Computer Security",
  "ECE344: Operating Systems",
]

const hardwareSkills = ["ASIC", "FPGA", "RTL Design", "SystemVerilog", "Synopsys VCS", "Synopsys Verdi", "Lint", "Static Timing Analysis", "AMD Vivado Design Suite", "AMD Vitis Unified Software Platform", "Intel Quartus Prime", "ModelSim", "RDNA", "3D Graphics"]
const softwareSkills = ["C", "C++", "Python", "Perl", "Perforce", "ARM Assembly", "Git"]

type Project = {
  title: string
  github?: string
  details?: string
  diagram: string
  // drawn SVG diagram; when set it replaces the ASCII one
  system?: DiagramSpec
  description: React.ReactNode
  tech: string
}

const projects: Project[] = [
  {
    title: "Optimizing 3D Gaussian Splatting for Qualcomm Snapdragon Hardware",
    github: "https://github.com/markociricilic/3DGS-Snapdragon",
    details: "/docs/3d-gaussian-splatting.pdf",
    system: {
      nodes: [
        { id: "reduce", label: ["Gaussian", "Reduction"], col: 0, row: 0, accent: true },
        { id: "touch", label: ["Touch", "Interpreter"], col: 1, row: 0, accent: true },
        { id: "cull", label: ["Culling", "Module"], col: 0, row: 1 },
        { id: "sort", label: ["Radix", "Sort"], col: 0, row: 2 },
        { id: "project", label: ["3D-2D", "Projection"], col: 0, row: 3 },
        { id: "display", label: ["Display", "Unit"], col: 0, row: 4, accent: true },
      ],
      edges: [
        { from: "reduce", to: "cull" },
        { from: "cull", to: "sort" },
        { from: "sort", to: "project" },
        { from: "project", to: "display" },
        { from: "touch", to: "cull" },
        { from: "touch", to: "project" },
      ],
      caption: "Fig. 1 — Vulkan rendering pipeline on Snapdragon 8 Gen 2",
    },
    diagram: `+---------------+          +---------------+
| Gaussian      |          | Touch         |
| Reduction     |          | Interpreter   |
+---------------+          +---------------+
      |                          |
      v                          |
+---------------+                |
| Culling       |<---------------+
| Module        |                |
+---------------+                |
      |                          |
      v                          |
+---------------+                |
| Radix         |                |
| Sort          |                |
+---------------+                |
      |                          |
      v                          |
+---------------+                |
| 3D-2D         |<---------------+
| Projection    |
+---------------+
      |
      v
+---------------+
| Display       |
| Unit          |
+---------------+`,
    description: (
      <>
        <span className="hl">University capstone project</span> focused on implementing and optimizing <span className="hl">3D Gaussian Splatting rendering on the Snapdragon 8 Gen 2 SoC</span>. Developed a complete rendering pipeline including Gaussian reduction, culling, sorting, projection, and display modules to achieve <span className="hl">20 fps performance</span> on mobile hardware. Also, configured the renderer to use touch input to update the camera view inside the scene. Implemented renderer using <span className="hl">Vulkan API</span> to maximize hardware utilization and performance.
      </>
    ),
    tech: "Computer Graphics, 3D Gaussian Splatting, Vulkan, Android SDK, Qualcomm Snapdragon, Touch Interaction",
  },
  {
    title: "Space Object Detection and Interception System",
    github: "https://github.com/markociricilic/MeteorDestroyer",
    details: "/docs/space-object-detection.pdf",
    system: {
      nodes: [
        { id: "a", label: ["Ultrasonic", "Sensors"], col: 0, row: 0, accent: true },
        { id: "b", label: ["Object", "Localization"], col: 1, row: 0 },
        { id: "c", label: ["Trajectory", "Calculation"], col: 2, row: 0 },
        { id: "hub", label: ["Servo", "Control"], col: 1, row: 1 },
        { id: "out", label: ["HDMI", "Visualization"], col: 1, row: 2, accent: true },
      ],
      edges: [
        { from: "a", to: "b" },
        { from: "b", to: "c" },
        { from: "a", to: "hub" },
        { from: "b", to: "hub" },
        { from: "c", to: "hub" },
        { from: "hub", to: "out" },
      ],
      caption: "Fig. 2 — Detection and interception on an Artix-7 FPGA",
    },
    diagram: `+--------------+    +---------------+     +---------------+
| Ultrasonic   |--->| Object        |---->| Trajectory    |
| Sensors      |    | Localization  |     | Calculation   |
+--------------+    +---------------+     +---------------+
      |                   |                     |
      |                   v                     |
      |             +---------------+           |
      +------------>| Servo         |<----------+
                    | Control       |
                    +---------------+
                          |
                          v
                    +---------------+
                    | HDMI          |
                    | Visualization |
                    +---------------+`,
    description: (
      <>
        Designed a real-time detection and response system for tracking and intercepting space debris. Used an array of ultrasonic sensors to detect objects and calculate their trajectories with <span className="hl">custom IP blocks</span> in RTL. Implemented servo-controlled laser targeting and landing position prediction with <span className="hl">HDMI visualization</span>.
      </>
    ),
    tech: "Artix-7 FPGA, SystemVerilog, MicroBlaze, Ultrasonic Sensors, Servo Motors, HDMI",
  },
  {
    title: "Wireless Communication between STM32",
    github: "https://github.com/markociricilic/STM32-Wireless-Communication",
    system: {
      nodes: [
        { id: "tx", label: ["STM32F4", "Transmitter"], col: 0, row: 0, accent: true },
        { id: "usart", label: ["USART", "Interface"], col: 1, row: 0 },
        { id: "dac", label: ["DAC", "Conversion"], col: 2, row: 0 },
        { id: "wl", label: ["Wireless", "Transmission"], col: 0, row: 1 },
        { id: "rx", label: ["STM32F4", "Receiver"], col: 2, row: 1 },
        { id: "adc", label: ["ADC", "Conversion"], col: 2, row: 2, accent: true },
      ],
      edges: [
        { from: "tx", to: "usart" },
        { from: "usart", to: "dac" },
        { from: "tx", to: "wl" },
        { from: "dac", to: "rx" },
        { from: "wl", to: "rx" },
        { from: "rx", to: "adc" },
      ],
      caption: "Fig. 3 — Wireless link between two STM32F4 boards",
    },
    diagram: `+--------------+    +---------------+    +---------------+
| STM32F4      |--->| USART         |--->| DAC           |
| Transmitter  |    | Interface     |    | Conversion    |
+--------------+    +---------------+    +---------------+
      |                                        |
      v                                        v
+--------------+                         +---------------+
| Wireless     |                         | STM32F4       |
| Transmission |------------------------>| Receiver      |
+--------------+                         +---------------+
                                               |
                                               v
                                         +---------------+
                                         | ADC           |
                                         | Conversion    |
                                         +---------------+`,
    description: (
      <>
        Implemented wireless communication between two STM32F4 microcontrollers, allowing for data transmission <span className="hl">up to 20 meters</span>. Created the interface between the STM32F4 and computer using <span className="hl">USART</span> serial communication, with data encoding/decoding through <span className="hl">DAC/ADC</span> conversion.
      </>
    ),
    tech: "STM32F4, USART, DAC/ADC, DMA, Hercules SETUP utility",
  },
  {
    title: "Melody Improvisation Unit (μ)",
    github: "https://github.com/markociricilic/MIU",
    details: "/docs/melody-improvisation-unit.pdf",
    system: {
      nodes: [
        { id: "a", label: ["Chord", "Input"], col: 0, row: 0, accent: true },
        { id: "b", label: ["FFT", "Processing"], col: 1, row: 0 },
        { id: "c", label: ["Frequency", "Extraction"], col: 2, row: 0 },
        { id: "hub", label: ["Melody", "Generation"], col: 1, row: 1 },
        { id: "out", label: ["Audio", "Output"], col: 1, row: 2, accent: true },
      ],
      edges: [
        { from: "a", to: "b" },
        { from: "b", to: "c" },
        { from: "a", to: "hub" },
        { from: "b", to: "hub" },
        { from: "c", to: "hub" },
        { from: "hub", to: "out" },
      ],
      caption: "Fig. 4 — Chord-to-melody signal chain on a Raspberry Pi",
    },
    diagram: `+--------------+    +---------------+    +---------------+
| Chord        |--->| FFT           |--->| Frequency     |
| Input        |    | Processing    |    | Extraction    |
+--------------+    +---------------+    +---------------+
      |                   |                     |
      |                   v                     |
      |             +---------------+           |
      +------------>| Melody        |<----------+
                    | Generation    |
                    +---------------+
                          |
                          v
                    +---------------+
                    | Audio         |
                    | Output        |
                    +---------------+`,
    description: (
      <>
        Developed a system that generates new melodies with variations in pitches and rhythms based on input chords. The algorithm digitally processes <span className="hl">chord inputs</span>, computes FFT to extract <span className="hl">dominant frequencies</span>, and generates randomized melodies based on <span className="hl">harmonic relationships</span>.
      </>
    ),
    tech: "Raspberry Pi, Python, FFT Analysis, Digital Signal Processing",
  },
  {
    title: "Power Amplifier in Software-Defined Radio",
    github: "https://github.com/markociricilic/Power-Amplifier-in-Software-Defined-Radio",
    system: {
      nodes: [
        { id: "a", label: ["Class-B", "Amplifier"], col: 0, row: 0, accent: true },
        { id: "b", label: ["Push-Pull", "Config"], col: 1, row: 0 },
        { id: "c", label: ["Low-Pass", "Filter"], col: 2, row: 0 },
        { id: "hub", label: ["Transformer", "Coupling"], col: 1, row: 1 },
        { id: "out", label: ["50 Ohm Load", "(Antenna)"], col: 1, row: 2, accent: true },
      ],
      edges: [
        { from: "a", to: "b" },
        { from: "b", to: "c" },
        { from: "a", to: "hub" },
        { from: "b", to: "hub" },
        { from: "c", to: "hub" },
        { from: "hub", to: "out" },
      ],
      caption: "Fig. 5 — Class-B power amplifier, 8-16 MHz",
    },
    diagram: `+--------------+    +---------------+    +---------------+
| Class-B      |--->| Push-Pull     |--->| Low-Pass      |
| Amplifier    |    | Configuration |    | Filter        |
+--------------+    +---------------+    +---------------+
      |                   |                     |
      |                   v                     |
      |             +---------------+           |
      +------------>| Transformer   |<----------+
                    | Coupling      |
                    +---------------+
                          |
                          v
                    +---------------+
                    | 50 Ω Load     |
                    | (Antenna)     |
                    +---------------+`,
    description: (
      <>
        Designed a <span className="hl">class-B discrete transistor power amplifier with a low-pass filter</span> to drive the software-defined radio&apos;s antenna. Used transformer coupling and BJTs in a push-pull configuration with a <span className="hl">3rd order</span> LC low-pass filter to pass signals in the <span className="hl">8-16 MHz range</span>.
      </>
    ),
    tech: "NI Multisim, Altium Designer, Python, Oscilloscope, Multimeter",
  },
  {
    title: "Enhanced 16-bit 'ARM-like' Processor",
    github: "https://github.com/markociricilic/CustomEnhancedProcessor",
    system: {
      nodes: [
        { id: "a", label: ["Instruction", "Decoder"], col: 0, row: 0, accent: true },
        { id: "b", label: ["Register", "File"], col: 1, row: 0 },
        { id: "c", label: ["ALU", "Operations"], col: 2, row: 0 },
        { id: "hub", label: ["Memory", "Interface"], col: 1, row: 1 },
        { id: "out", label: ["I/O", "Devices"], col: 1, row: 2, accent: true },
      ],
      edges: [
        { from: "a", to: "b" },
        { from: "b", to: "c" },
        { from: "a", to: "hub" },
        { from: "b", to: "hub" },
        { from: "c", to: "hub" },
        { from: "hub", to: "out" },
      ],
      caption: "Fig. 6 — 16-bit, 8-register processor datapath",
    },
    diagram: `+--------------+    +---------------+    +---------------+
| Instruction  |--->| Register      |--->| ALU           |
| Decoder      |    | File          |    | Operations    |
+--------------+    +---------------+    +---------------+
      |                   |                     |
      |                   v                     |
      |             +---------------+           |
      +------------>| Memory        |<----------+
                    | Interface     |
                    +---------------+
                          |
                          v
                    +---------------+
                    | I/O           |
                    | Devices       |
                    +---------------+`,
    description: (
      <>
        Designed a <span className="hl">16-bit, 8-register processor</span> in Verilog based on the <span className="hl">ARM architecture family</span>. Implemented subroutine and stack functionality, along with connections to <span className="hl">external I/O devices</span>. Supported various operations including arithmetic, logical, memory, and branch instructions.
      </>
    ),
    tech: "Verilog, Intel Quartus Prime Design Software, ModelSim, ARM Architecture, Hardware Simulation",
  },
  {
    title: "Radio-Controlled Airplane",
    system: {
      nodes: [
        { id: "a", label: ["Radio", "Controller"], col: 0, row: 0, accent: true },
        { id: "b", label: ["Channel", "Assignment"], col: 1, row: 0 },
        { id: "c", label: ["Micro", "Servos"], col: 2, row: 0 },
        { id: "hub", label: ["ESC", "Controller"], col: 1, row: 1 },
        { id: "out", label: ["3D Printed", "Airframe"], col: 1, row: 2, accent: true },
      ],
      edges: [
        { from: "a", to: "b" },
        { from: "b", to: "c" },
        { from: "a", to: "hub" },
        { from: "b", to: "hub" },
        { from: "c", to: "hub" },
        { from: "hub", to: "out" },
      ],
      caption: "Fig. 7 — Radio control and actuation",
    },
    diagram: `+--------------+    +---------------+    +---------------+
| Radio        |--->| Channel       |--->| Micro         |
| Controller   |    | Assignment    |    | Servos        |
+--------------+    +---------------+    +---------------+
      |                   |                     |
      |                   v                     |
      |             +---------------+           |
      +------------>| ESC           |<----------+
                    | Controller    |
                    +---------------+
                          |
                          v
                    +---------------+
                    | 3D Printed    |
                    | Airframe      |
                    +---------------+`,
    description: (
      <>
        <span className="hl">3D printed</span> a radio-controlled airplane as my <span className="hl">high school capstone project</span>. Used four micro servos to control the airplane&apos;s direction with each servo corresponding to a channel on the radio control system. Implemented an ESC controller to regulate the motor speed.
      </>
    ),
    tech: "3D Printing, Radio Control Systems, Servo Motors, ESC Controllers",
  },
]

export default function ResumePage() {
  return (
    <>
      <div className="page">
        <div className="content">
          <Horizon src="/images/interests/photography-197.jpg" position="50% 48%" label="BERLIN 2025" />
          <TopNav links={navLinks} cross={{ href: "/interests", label: "Interests →" }} />

          <div className="wrap">
            <Logo sub="portfolio/" />
            <p className="role">
              Marko (Džidžan) Ćirić Ilić — <b>RTL Design Engineer</b> · Toronto, ON 🌺
            </p>

            <Section id="about-me" title="About me" index="01">
              {/* Portraits hidden for now (photos kept in public/images):
              <div className="portraits">
                <figure>
                  <img src="/images/portrait.jpg" alt="Marko Ćirić portrait" />
                  <figcaption>fig. a</figcaption>
                </figure>
                <figure>
                  <img src="/images/portrait-2.jpg" alt="Marko Ćirić portrait 2" />
                  <figcaption>fig. b</figcaption>
                </figure>
              </div>
              */}
              <p>Hi! I&apos;m Marko Ćirić. Aspiring computer architect.</p>
              <p>
                Currently working at <span className="hl">Advanced Micro Devices, Inc. (AMD)</span> as a <span className="hl">Graphics IP RTL Design Engineer</span> where as a member of the <span className="hl">Shader Processor Input (SPI) team</span>, I work to coordinate shader execution across all pipeline stages, manage hardware resource allocation, and optimize the flow of graphics and compute workloads to maximize parallel processing efficiency, for multiple next generation high-performance <span className="hl">Radeon and Instinct (MI series) Graphics Cards</span>.
              </p>
              <p>
                In the past, I&apos;ve worked at Advanced Micro Devices, Inc. (AMD) as a Graphics IP RTL Design Intern where as a member of the Geometry team, I worked to implement tessellations in hardware, for multiple next generation Radeon Graphics Cards.
              </p>
              <p>
                With additional computer hardware experiences from university courses and personal projects, I currently focus primarily on the intersection of computer hardware and computer graphics, but have an extended interest in ASICs for AI acceleration as a future career.
              </p>

              <Box label="Personal bio">
                <p>
                  Born in <span className="hl">Belgrade, Serbia</span> in 2002 but raised in Vancouver, BC before moving to Toronto, ON for university.
                </p>
                <p>
                  I have interests in music, including record and CD collecting, home cooking, sailing, martial arts, specifically karate and judo, hiking, painting with oil pastels, and fashion.
                </p>
                <p>
                  Thinking about it now, my interests together involve some combination of <span className="hl">passion, introspection, creativity, logic, and discipline</span>.
                </p>
                <p>
                  So, it&apos;s perhaps not surprising that I&apos;m pursuing a career in ASIC and RTL design where the field as a whole, also constitutes and requires, in some ways, a combination of these mindsets/skills.
                </p>
              </Box>

              <Box label="Quick facts">
                <dl className="facts">
                  <dt>Location</dt>
                  <dd>Toronto, ON</dd>
                  <dt>Education</dt>
                  <dd>BASc in Computer Engineering, University of Toronto</dd>
                  <dt>Specialty</dt>
                  <dd>Computer Hardware, Computer Architecture, Digital Systems Design, VLSI Technology, Analog/Digital Electronics, Embedded Systems</dd>
                </dl>
              </Box>
            </Section>

            <Section id="education" title="Education" index="02">
              <ul className="tl">
                <li>
                  <h3>University of Toronto, Toronto, ON</h3>
                  <div className="meta">BASc in Computer Engineering · May 2025</div>
                  <div className="note">Relevant coursework:</div>
                  <div className="chips mt-2">
                    {coursework.map((course) => (
                      <span key={course}>{course}</span>
                    ))}
                  </div>
                </li>
                <li>
                  <h3>Clayton Heights Secondary School, Surrey, BC</h3>
                  <div className="meta">Dogwood Diploma, i.e. B.C. Certificate of Graduation · June 2020</div>
                </li>
              </ul>
            </Section>

            <Section id="skills" title="Skills" index="03">
              <div className="skill-grid">
                <div>
                  <h3>Hardware</h3>
                  <div className="chips">
                    {hardwareSkills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3>Software</h3>
                  <div className="chips">
                    {softwareSkills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section id="experience" title="Experience" index="04">
              <ul className="tl">
                <li>
                  <h3>Silicon Design Engineer II</h3>
                  <div className="meta">Advanced Micro Devices, Inc. (AMD), Markham, ON · August 2025 – Present</div>
                  <div className="note">Re-hired at AMD into a full-time silicon design role after graduating from university.</div>
                  <ul>
                    <li>Member of the Shader Processor Input (SPI) sub-system team working as an RTL designer in the Graphics pipeline for multiple next generation high-performance Radeon and Instinct (MI series) Graphics Cards.</li>
                    <li>Focusing on coordinating shader execution across pipeline stages, managing hardware resource allocation, and optimizing the flow of graphics and compute workloads to maximize parallel processing efficiency.</li>
                    <li>Collaborating with micro-architecture engineers and the design verification (DV) team to implement new features and optimize performance for AMD&apos;s next-generation graphics processors.</li>
                  </ul>
                  <span className="award">★ Recipient of the Q4 2025 Spotlight Award</span>
                </li>
                <li>
                  <h3>Graphics IP RTL Design Intern</h3>
                  <div className="meta">Advanced Micro Devices, Inc. (AMD), Markham, ON · May 2023 – August 2024</div>
                  <ul>
                    <li>Member of the Geometry (GE) sub-system team working as an RTL designer in the front-end Graphics pipeline to implement tessellations for multiple next generation high-performance Radeon Graphics Cards.</li>
                    <li>Provided day-to-day support for the design team by resolving triage failures using Verdi waveform debugging, resolving Lint errors, and other general debug tasks</li>
                    <li>Updated common shared modules to be used for standardizing interfaces and implemented the module throughout GE pipeline</li>
                    <li>Bundled several GE interfaces (both internal and external) for convenient debugging and code structure</li>
                    <li>Implemented performance counters in GE for improved performance analysis</li>
                    <li>Added back and integrated past-generation registers into RTL for new feature bring-up</li>
                    <li>Implemented temporary RTL &quot;hacks&quot; for feature bring-up</li>
                    <li>Resolved SEC (sequence equivalency checking) failures using static clock timing analysis practices</li>
                    <li>Helped with preprocessing the RTL to prepare for the upcoming projects and cleaned up temporary feature macros before tape-out</li>
                  </ul>
                </li>
                <li>
                  <h3>Driverless Vehicle (DV) Hardware Team Member</h3>
                  <div className="meta">UTFR University of Toronto Formula Racing, Toronto, ON · August 2022 – April 2023</div>
                  <ul>
                    <li>Aided the driverless vehicle (DV) team with hardware development to satisfy the various electrical requirements of the FSAE competition</li>
                    <li>Worked on developing the electrical activation of the emergency brakes (EBS)</li>
                    <li>Helped with designing a controller to receive and transmit data over the CAN bus and distribute power to the driverless vehicle&apos;s electrical devices</li>
                  </ul>
                </li>
                <li>
                  <h3>ElecTRiC Workshop Teaching Assistant</h3>
                  <div className="meta">Engineers Without Borders Canada, Toronto, ON · August 2022</div>
                  <ul>
                    <li>Designed an analog piano with an audio amplifier circuit with added Bluetooth functionality via the HC-05 module and the Raspberry Pi Pico</li>
                    <li>Taught this audio circuit to a class of high school students (Grades 9-12), introducing them to breadboarding, hardware debugging, microcontroller programming with MicroPython, the Raspberry Pi Pico, and basic UART communication</li>
                  </ul>
                </li>
              </ul>
            </Section>

            <Section id="projects" title="Projects" index="05">
              <div className="projects">
                {projects.map((project, i) => (
                  <article className="proj" key={project.title}>
                    <span className="no">P/{String(i + 1).padStart(2, "0")}</span>
                    <h3>
                      {project.github ? (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          {project.title} ↗
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    {project.system ? <SystemDiagram spec={project.system} id={`p${i + 1}`} /> : <pre>{project.diagram}</pre>}
                    <p>{project.description}</p>
                    <p className="tech">Technologies: {project.tech}</p>
                    {(project.github || project.details) && (
                      <div className="links">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            GitHub
                          </a>
                        )}
                        {project.details && (
                          <a href={project.details} target="_blank" rel="noopener noreferrer">
                            Project details (PDF)
                          </a>
                        )}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </Section>
          </div>
        </div>

        <Collage />
      </div>
      <FooterBar />
    </>
  )
}
