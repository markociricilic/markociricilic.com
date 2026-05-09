"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import Link from "next/link"

const Dithering = dynamic(() => import("@paper-design/shaders-react").then(m => ({ default: m.Dithering })), { ssr: false })

export default function ResumePage() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Sync dark class on html element for CSS variable theming
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row pb-16 pt-12">
      {/* Fixed Top Navigation */}
      <div className={`fixed top-0 left-0 right-0 z-50 h-12 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
        <div className="relative flex items-center justify-between md:justify-center w-full h-full px-2 md:px-4 font-mono text-[clamp(8px,2.2vw,0.875rem)]">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`md:absolute md:left-4 p-1 md:p-2 rounded-full shrink-0 transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <div className="flex flex-1 items-center justify-evenly md:flex-none md:justify-start md:gap-6">
            <a href="#about-me" className="hover:opacity-70 transition-opacity whitespace-nowrap">about me</a>
            <a href="#education" className="hover:opacity-70 transition-opacity whitespace-nowrap">education</a>
            <a href="#skills" className="hover:opacity-70 transition-opacity whitespace-nowrap">skills</a>
            <a href="#experience" className="hover:opacity-70 transition-opacity whitespace-nowrap">experience</a>
            <a href="#projects" className="hover:opacity-70 transition-opacity whitespace-nowrap">projects</a>
          </div>
          <Link href="/interests" className="shrink-0 md:absolute md:right-4 hover:opacity-70 transition-opacity whitespace-nowrap">
            <span className="hidden md:inline">to marko&apos;s interests →</span>
            <span className="md:hidden">→ interests</span>
          </Link>
        </div>
      </div>

      <div
        className={`w-full md:w-1/2 p-4 md:p-8 font-mono relative z-10 order-2 md:order-1 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
      >
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-lg font-normal mb-8">marko&apos;s portfolio 🌺</h1>
          <div className="mb-8">
            <h2 className="text-lg font-normal">Marko (Džidžan) Ćirić Ilić</h2>
            <h3 className="text-lg font-normal">RTL Design Engineer</h3>
          </div>
        </div>

        {/* Portrait Images */}
        <div className="mb-12 flex gap-4">
          <div className="flex-1 aspect-[3/4] rounded-lg overflow-hidden border border-current/40">
            <img
              src="/images/portrait.jpg"
              alt="Marko Ćirić portrait"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 aspect-[3/4] rounded-lg overflow-hidden border border-current/40">
            <img
              src="/images/portrait-2.jpg"
              alt="Marko Ćirić portrait 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* About Me Section */}
        <div id="about-me" className="mb-12 scroll-mt-16">
          <h2 className="text-sm lowercase mb-4 opacity-70">about me</h2>

          <p className="text-sm mb-4">
            Hi! I&apos;m Marko Ćirić. Aspiring computer architect.
          </p>

          <p className="text-sm mb-4">
            Currently working at Advanced Micro Devices, Inc. (AMD) as a Graphics IP RTL Design Engineer where as a member of the Shader Processor Input (SPI) team, I work to coordinate shader execution across all pipeline stages, manage hardware resource allocation, and optimize the flow of graphics and compute workloads to maximize parallel processing efficiency, for multiple next generation high-performance Radeon and Instinct (MI series) Graphics Cards.
          </p>

          <p className="text-sm mb-4">
            In the past, I&apos;ve worked at Advanced Micro Devices, Inc. (AMD) as a Graphics IP RTL Design Intern where as a member of the Geometry team, I worked to implement tessellations in hardware, for multiple next generation Radeon Graphics Cards.
          </p>

          <p className="text-sm mb-4">
            With additional computer hardware experiences from university courses and personal projects, I currently focus primarily on the intersection of computer hardware and computer graphics, but have an extended interest in ASICs for AI acceleration as a future career.
          </p>

          {/* Personal Bio */}
          <div className={`border p-4 mb-4 ${isDarkMode ? "border-white/50" : "border-black/30"}`}>
            <h3 className="text-sm font-semibold mb-2">Personal Bio:</h3>
            <p className="text-sm mb-2">
              Born in Belgrade, Serbia in 2002 but raised in Vancouver, BC before moving to Toronto, ON for university.
            </p>
            <p className="text-sm mb-2">
              I have interests in music, including record and CD collecting, home cooking, sailing, martial arts, specifically karate and judo, hiking, painting with oil pastels, and fashion.
            </p>
            <p className="text-sm mb-2">
              Thinking about it now, my interests together involve some combination of passion, introspection, creativity, logic, and discipline.
            </p>
            <p className="text-sm">
              So, it&apos;s perhaps not surprising that I&apos;m pursuing a career in ASIC and RTL design where the field as a whole, also constitutes and requires, in some ways, a combination of these mindsets/skills.
            </p>
          </div>

          {/* Interests */}
          <div className={`border p-4 mb-4 ${isDarkMode ? "border-white/50" : "border-black/30"}`}>
            <h3 className="text-sm font-semibold mb-2">Interests:</h3>
            <p className="text-sm mb-2">
              <span className="opacity-70">Favourite Music Artists:</span> Aphex Twin, Sade, Radiohead, Nujabes, Yung Lean, Playboi Carti
            </p>
            <p className="text-sm mb-2">
              <span className="opacity-70">Favourite Films:</span> Kill Bill (2003-2004), The Lord of the Rings (2001-2003), City of God (2002), All About Lily Chou-Chou (2001), Memento (2000), Fight Club (1999), The Big Lebowski (1998), Gattaca (1997), Fallen Angels (1995), La Haine (1995), Dead Poets Society (1989), Time of the Gypsies (1988), Wings of Desire (1987), Mirror (1975), Blade Runner (1982)
            </p>
            <p className="text-sm mb-2">
              <span className="opacity-70">Favourite Animations:</span> serial experiments lain (1998), Samurai Champloo (2004), Trigun (1998), Violet Evergarden (2018), Naruto (2002-2017), The Boy and The Beast (2015), Fantastic Planet (1973)
            </p>
            <p className="text-sm">
              <span className="opacity-70">Favourite Fashion:</span> Stüssy, Supreme, Nike, New Balance, Aries Arise, Paloma Wool, Fucking Awesome, Bode, Professor. E, Yohji Yamamoto
            </p>
          </div>

          {/* Quick Facts */}
          <div className={`border p-4 ${isDarkMode ? "border-white/50" : "border-black/30"}`}>
            <h3 className="text-sm font-semibold mb-2">Quick Facts:</h3>
            <p className="text-sm"><span className="opacity-70">Location:</span> Toronto, ON</p>
            <p className="text-sm"><span className="opacity-70">Education:</span> BASc in Computer Engineering, University of Toronto</p>
            <p className="text-sm"><span className="opacity-70">Specialty:</span> Computer Hardware, Computer Architecture, Digital Systems Design, VLSI Technology, Analog/Digital Electronics, Embedded Systems</p>
          </div>
        </div>

        {/* Education Section */}
        <div id="education" className="mb-12 scroll-mt-16">
          <h2 className="text-sm lowercase mb-4 opacity-70">education</h2>

          {/* University of Toronto */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <span className="font-semibold">University of Toronto, Toronto, ON</span>
            </div>
            <div className="flex justify-between items-start">
              <span>BASc in Computer Engineering</span>
              <span className="text-sm opacity-70">May 2025</span>
            </div>
            <div className="mt-3">
              <span className="text-sm">Relevant Coursework:</span>
              <ul className="mt-1 text-sm list-disc list-inside opacity-90 space-y-0.5">
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

          {/* Clayton Heights Secondary School */}
          <div className="mt-6 pt-4 border-t border-current/20">
            <div className="flex justify-between items-start">
              <span className="font-semibold">Clayton Heights Secondary School, Surrey, BC</span>
            </div>
            <div className="flex justify-between items-start">
              <span>Dogwood Diploma, i.e. B.C. Certificate of Graduation</span>
              <span className="text-sm opacity-70">June 2020</span>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div id="skills" className="mb-12 scroll-mt-16">
          <h2 className="text-sm lowercase mb-4 opacity-70">skills</h2>

          {/* Hardware */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Hardware</h3>
            <div className="space-y-2">
              {[
                { name: "ASIC", level: 95 },
                { name: "FPGA", level: 93 },
                { name: "RTL Design", level: 92 },
                { name: "SystemVerilog", level: 92 },
                { name: "Synopsys VCS", level: 91 },
                { name: "Synopsys Verdi", level: 90 },
                { name: "Lint", level: 86 },
                { name: "Static Timing Analysis", level: 85 },
                { name: "AMD Vivado Design Suite", level: 80 },
                { name: "AMD Vitis Unified Software Platform", level: 75 },
                { name: "Intel Quartus Prime", level: 70 },
                { name: "ModelSim", level: 66 },
              ].map((skill) => (
                <div key={skill.name} className="text-sm">
                  <div className="flex justify-between mb-0.5">
                    <span>{skill.name}</span>
                    <span className="opacity-70">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-current/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${skill.level >= 90
                        ? "bg-green-500"
                        : skill.level >= 70
                          ? "bg-yellow-500"
                          : "bg-red-500"
                        }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Software */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Software</h3>
            <div className="space-y-2">
              {[
                { name: "C", level: 94 },
                { name: "C++", level: 93 },
                { name: "Python", level: 82 },
                { name: "Perl", level: 81 },
                { name: "Perforce", level: 78 },
                { name: "ARM Assembly", level: 72 },
                { name: "Git", level: 70 },
              ].map((skill) => (
                <div key={skill.name} className="text-sm">
                  <div className="flex justify-between mb-0.5">
                    <span>{skill.name}</span>
                    <span className="opacity-70">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-current/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${skill.level >= 90
                        ? "bg-green-500"
                        : skill.level >= 70
                          ? "bg-yellow-500"
                          : "bg-red-500"
                        }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operating Systems */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Operating Systems</h3>
            <div className="space-y-2">
              {[
                { name: "Linux", level: 90 },
                { name: "Windows", level: 87 },
                { name: "Android", level: 80 },
                { name: "Unix", level: 72 },
              ].map((skill) => (
                <div key={skill.name} className="text-sm">
                  <div className="flex justify-between mb-0.5">
                    <span>{skill.name}</span>
                    <span className="opacity-70">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-current/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${skill.level >= 90
                        ? "bg-green-500"
                        : skill.level >= 70
                          ? "bg-yellow-500"
                          : "bg-red-500"
                        }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div id="experience" className="mb-12 scroll-mt-16">
          <h2 className="text-sm lowercase mb-4 opacity-70">experience</h2>

          {/* AMD */}
          <div className="mb-6 grid gap-x-2" style={{ gridTemplateColumns: "1rem 1fr" }}>
            <div className="relative flex justify-center">
              <span className="relative z-10 mt-1.5 h-2 w-2 rounded-full bg-current" />
              <span
                className="absolute top-4"
                style={{
                  bottom: "-0.5rem",
                  width: "2px",
                  backgroundColor: "currentColor",
                  opacity: 0.45,
                }}
              />
            </div>
            <div className="pb-6">
                <div className="font-semibold">Silicon Design Engineer II</div>
                <div className="text-sm opacity-70">Advanced Micro Devices, Inc. (AMD), Markham, ON | August 2025 - Present</div>
                <div className="text-sm mt-1 opacity-70">Re-hired at AMD into a full-time silicon design role after graduating from university.</div>
                <ul className="mt-2 text-sm list-disc list-inside opacity-90 space-y-1">
                  <li>Member of the Shader Processor Input (SPI) sub-system team working as an RTL designer in the Graphics pipeline for multiple next generation high-performance Radeon and Instinct (MI series) Graphics Cards.</li>
                  <li>Focusing on coordinating shader execution across pipeline stages, managing hardware resource allocation, and optimizing the flow of graphics and compute workloads to maximize parallel processing efficiency.</li>
                  <li>Recipient of the Q4 2025 Spotlight Award.</li>
                </ul>
            </div>

            <div className="relative flex justify-center">
              <span className="relative z-10 mt-1.5 h-2 w-2 rounded-full bg-current" />
            </div>
            <div>
                <div className="font-semibold">Graphics IP RTL Design Intern</div>
                <div className="text-sm opacity-70">Advanced Micro Devices, Inc. (AMD), Markham, ON | May 2023 - August 2024</div>
                <ul className="mt-2 text-sm list-disc list-inside opacity-90 space-y-1">
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
            </div>
          </div>

          {/* UTFR */}
          <div className="mb-6">
            <div className="flex items-start gap-2">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-current flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold">Driverless Vehicle (DV) Hardware Team Member</div>
                <div className="text-sm opacity-70">UTFR University of Toronto Formula Racing, Toronto, ON | August 2022 - April 2023</div>
                <ul className="mt-2 text-sm list-disc list-inside opacity-90 space-y-1">
                  <li>Aided the driverless vehicle (DV) team with hardware development to satisfy the various electrical requirements of the FSAE competition</li>
                  <li>Worked on developing the electrical activation of the emergency brakes (EBS)</li>
                  <li>Helped with designing a controller to receive and transmit data over the CAN bus and distribute power to the driverless vehicle&apos;s electrical devices</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Engineers Without Borders */}
          <div className="mb-6">
            <div className="flex items-start gap-2">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-current flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold">ElecTRiC Workshop Teaching Assistant</div>
                <div className="text-sm opacity-70">Engineers Without Borders Canada, Toronto, ON | August 2022</div>
                <ul className="mt-2 text-sm list-disc list-inside opacity-90 space-y-1">
                  <li>Designed an analog piano with an audio amplifier circuit with added Bluetooth functionality via the HC-05 module and the Raspberry Pi Pico</li>
                  <li>Taught this audio circuit to a class of high school students (Grades 9-12), introducing them to breadboarding, hardware debugging, microcontroller programming with MicroPython, the Raspberry Pi Pico, and basic UART communication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div id="projects" className="mb-12 scroll-mt-16">
          <h2 className="text-sm lowercase mb-4 opacity-70">projects</h2>

          {/* Project 1: 3D Gaussian Splatting */}
          <div className="border border-current/40 p-4 mb-4">
            <a
              href="https://github.com/markociricilic/3DGS-Snapdragon"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline inline-flex items-center gap-1"
            >
              Optimizing 3D Gaussian Splatting for Qualcomm Snapdragon Hardware
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
            <pre className="text-xs mt-3 mb-3 overflow-x-auto opacity-80 leading-tight">{`    +---------------+          +---------------+
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
    +---------------+`}</pre>
            <p className="text-sm mb-2">
              University capstone project focused on implementing and optimizing 3D Gaussian Splatting rendering on the Snapdragon 8 Gen 2 SoC. Developed a complete rendering pipeline including Gaussian reduction, culling, sorting, projection, and display modules to achieve 20 fps performance on mobile hardware. Also, configured the renderer to use touch input to update the camera view inside the scene. Implemented renderer using Vulkan API to maximize hardware utilization and performance.
            </p>
            <p className="text-xs opacity-70 mb-2">
              Technologies: Computer Graphics, 3D Gaussian Splatting, Vulkan, Android SDK, Qualcomm Snapdragon, Touch Interaction
            </p>
            <a href="/docs/3d-gaussian-splatting.pdf" target="_blank" rel="noopener noreferrer" className="text-xs opacity-70 hover:opacity-100 inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Project Details
            </a>
          </div>

          {/* Project 2: Space Object Detection */}
          <div className="border border-current/40 p-4 mb-4">
            <a
              href="https://github.com/markociricilic/MeteorDestroyer"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline inline-flex items-center gap-1"
            >
              Space Object Detection and Interception System
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
            <pre className="text-xs mt-3 mb-3 overflow-x-auto opacity-80 leading-tight">{`    +--------------+    +---------------+     +---------------+
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
                        +---------------+`}</pre>
            <p className="text-sm mb-2">
              Designed a real-time detection and response system for tracking and intercepting space debris. Used an array of ultrasonic sensors to detect objects and calculate their trajectories with custom IP blocks in RTL. Implemented servo-controlled laser targeting and landing position prediction with HDMI visualization.
            </p>
            <p className="text-xs opacity-70 mb-2">
              Technologies: Artix-7 FPGA, SystemVerilog, MicroBlaze, Ultrasonic Sensors, Servo Motors, HDMI
            </p>
            <a href="/docs/space-object-detection.pdf" target="_blank" rel="noopener noreferrer" className="text-xs opacity-70 hover:opacity-100 inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Project Details
            </a>
          </div>

          {/* Project 3: Wireless Communication STM32 */}
          <div className="border border-current/40 p-4 mb-4">
            <a
              href="https://github.com/markociricilic/STM32-Wireless-Communication"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline inline-flex items-center gap-1"
            >
              Wireless Communication between STM32
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
            <pre className="text-xs mt-3 mb-3 overflow-x-auto opacity-80 leading-tight">{`    +--------------+    +---------------+    +---------------+
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
                                             +---------------+`}</pre>
            <p className="text-sm mb-2">
              Implemented wireless communication between two STM32F4 microcontrollers, allowing data transmission up to 20 meters. Created the interface between the STM32F4 and computer using USART serial communication, with data encoding/decoding through DAC/ADC conversion.
            </p>
            <p className="text-xs opacity-70">
              Technologies: STM32F4, USART, DAC/ADC, DMA, Hercules SETUP utility
            </p>
          </div>

          {/* Project 4: Melody Improvisation Unit */}
          <div className="border border-current/40 p-4 mb-4">
            <a
              href="https://github.com/markociricilic/MIU"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline inline-flex items-center gap-1"
            >
              Melody Improvisation Unit (μ)
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
            <pre className="text-xs mt-3 mb-3 overflow-x-auto opacity-80 leading-tight">{`    +--------------+    +---------------+    +---------------+
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
                        +---------------+`}</pre>
            <p className="text-sm mb-2">
              Developed a system that generates melodies with variations in pitches and rhythms based on input chords. The algorithm digitally processes chord inputs, computes FFT to extract dominant frequencies, and generates randomized melodies based on harmonic relationships.
            </p>
            <p className="text-xs opacity-70 mb-2">
              Technologies: Raspberry Pi, Python, FFT Analysis, Digital Signal Processing
            </p>
            <a href="/docs/melody-improvisation-unit.pdf" target="_blank" rel="noopener noreferrer" className="text-xs opacity-70 hover:opacity-100 inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Project Details
            </a>
          </div>

          {/* Project 5: Power Amplifier */}
          <div className="border border-current/40 p-4 mb-4">
            <a
              href="https://github.com/markociricilic/Power-Amplifier-in-Software-Defined-Radio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline inline-flex items-center gap-1"
            >
              Power Amplifier in Software-Defined Radio
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
            <pre className="text-xs mt-3 mb-3 overflow-x-auto opacity-80 leading-tight">{`    +--------------+    +---------------+    +---------------+
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
                        +---------------+`}</pre>
            <p className="text-sm mb-2">
              Designed a class-B discrete transistor power amplifier with a low-pass filter to drive the software-defined radio&apos;s antenna. Used transformer coupling and BJTs in a push-pull configuration with a 3rd order LC low-pass filter to pass signals in the 8-16 MHz range.
            </p>
            <p className="text-xs opacity-70">
              Technologies: NI Multisim, Altium Designer, Python, Oscilloscope, Multimeter
            </p>
          </div>

          {/* Project 6: Enhanced 16-bit Processor */}
          <div className="border border-current/40 p-4 mb-4">
            <a
              href="https://github.com/markociricilic/CustomEnhancedProcessor"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline inline-flex items-center gap-1"
            >
              Enhanced 16-bit &apos;ARM-like&apos; Processor
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
            <pre className="text-xs mt-3 mb-3 overflow-x-auto opacity-80 leading-tight">{`    +--------------+    +---------------+    +---------------+
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
                        +---------------+`}</pre>
            <p className="text-sm mb-2">
              Designed a 16-bit, 8-register processor in Verilog based on the ARM architecture family. Implemented subroutine and stack functionality, along with connections to external I/O devices. Supported various operations including arithmetic, logical, memory, and branch instructions.
            </p>
            <p className="text-xs opacity-70">
              Technologies: Verilog, Intel Quartus Prime Design Software, ModelSim, ARM Architecture, Hardware Simulation
            </p>
          </div>

          {/* Project 7: Radio-Controlled Airplane */}
          <div className="border border-current/40 p-4 mb-4">
            <span className="font-semibold">Radio-Controlled Airplane</span>
            <pre className="text-xs mt-3 mb-3 overflow-x-auto opacity-80 leading-tight">{`    +--------------+    +---------------+    +---------------+
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
                        +---------------+`}</pre>
            <p className="text-sm mb-2">
              3D printed a radio-controlled airplane as a high school capstone project. Used four micro servos to control the airplane&apos;s direction with each servo corresponding to a channel on the radio control system. Implemented an ESC controller to regulate the motor speed.
            </p>
            <p className="text-xs opacity-70">
              Technologies: 3D Printing, Radio Control Systems, Servo Motors, ESC Controllers
            </p>
          </div>
        </div>

      </div>

      <div className="hidden md:block md:relative md:w-1/2 md:order-2">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={isDarkMode ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 95%)"}
          colorFront={isDarkMode ? "hsl(350, 75%, 50%)" : "hsl(220, 100%, 70%)"}
          shape="cat"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={0.8}
          rotation={0}
          speed={0.1}
        />
      </div>

{/* Fixed Footer Links */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 h-12 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
        <div className="flex items-center justify-center gap-3 md:gap-6 w-full h-full px-2 md:px-4 font-mono text-[clamp(9px,2.4vw,0.875rem)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden whitespace-nowrap">
          <a
            href="mailto:markociricilic@gmail.com"
            className="hover:opacity-70 transition-opacity"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/markociricilic/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/markociricilic"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            GitHub
          </a>
          <a
            href="/docs/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            Resume
          </a>
          <span className="opacity-70">📍 Toronto, ON</span>
        </div>
      </div>
    </div>
  )
}
