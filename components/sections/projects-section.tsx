import { AsciiArt } from "@/components/ascii-art"

export function ProjectsSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="projects" />

      <div className="space-y-6">
      <div className="p-3 border border-primary/20 rounded bg-primary/5">
        <h3 className="text-primary font-bold">Optimizing 3D Gaussian Splatting for Qualcomm Snapdragon Hardware</h3>
        <pre className="text-xs my-2 text-muted-foreground">
        {`
  +----------------+                      +----------------+
  | Gaussian       |                      | Touch          |
  | Reduction      |                      | Interpreter    |
  +----------------+                      +----------------+
        |                                       |
        |                                       |
        v                                       |
  +----------------+                            |
  | Culling        |<---------------------------+
  | Module         |                            |
  +----------------+                            |
        |                                       |
        v                                       |
  +----------------+                            |
  | Radix          |                            |
  | Sort           |                            |
  +----------------+                            |
        |                                       |
        v                                       |
  +----------------+                            |
  | 3D-2D          |<---------------------------+
  | Projection     |
  +----------------+
        |
        v
  +----------------+
  | Display        |
  | Unit           |
  +----------------+
`}
        </pre>
        <p className="text-sm mb-2">
          University capstone project focused on implementing and optimizing 3D Gaussian Splatting rendering on the
          Snapdragon 8 Gen 2 processor. Developed a complete rendering pipeline including Gaussian reduction,
          culling, sorting, and projection modules to achieve real-time performance on mobile hardware. Implemented
          using the Vulkan API to maximize hardware utilization and performance.
        </p>
        <p className="text-xs text-muted-foreground mb-2">
          Technologies: Computer Graphics, 3D Gaussian Splatting, Vulkan, Android SDK, Qualcomm Snapdragon, Touch Interaction
        </p>
      </div>

      <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">Space Object Detection and Interception</h3>
          <pre className="text-xs my-2 text-muted-foreground">
            {`
  +-------------+     +----------------+     +----------------+
  | Ultrasonic  |---->| Object         |---->| Trajectory     |
  | Sensors     |     | Localization   |     | Calculation    |
  +-------------+     +----------------+     +----------------+
        |                    |                      |
        |                    v                      |
        |             +--------------+              |
        +------------>| Servo        |<-------------+
                      | Control      |
                      +--------------+
                             |
                             v
                      +---------------+
                      | HDMI          |
                      | Visualization |
                      +---------------+
`}
          </pre>
          <p className="text-sm mb-2">
            Designed a real-time detection and response system for tracking and intercepting space debris. Used an array
            of ultrasonic sensors to detect objects and calculate their trajectories with custom IP blocks in RTL.
            Implemented servo-controlled laser targeting and landing position prediction with HDMI visualization.
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Technologies: Artix-7 FPGA, SystemVerilog, MicroBlaze, Ultrasonic Sensors, Servo Motors, HDMI
          </p>
        </div>

        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">Wireless Communication between STM32</h3>
          <pre className="text-xs my-2 text-muted-foreground">
            {`
  +-------------+     +----------------+     +----------------+
  | STM32F4     |---->| USART          |---->| DAC            |
  | Transmitter |     | Interface      |     | Conversion     |
  +-------------+     +----------------+     +----------------+
        |                                            |
        v                                            v
  +-------------+                            +----------------+
  | Wireless    |                            | STM32F4        |
  | Transmission|--------------------------->| Receiver       |
  +-------------+                            +----------------+
                                                    |
                                                    v
                                             +----------------+
                                             | ADC            |
                                             | Conversion     |
                                             +----------------+
`}
          </pre>
          <p className="text-sm mb-2">
            Implemented wireless communication between two STM32F4 microcontrollers, allowing data transmission up to 20
            meters. Created the interface between the STM32F4 and computer using USART serial communication, with data
            encoding/decoding through DAC/ADC conversion.
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Technologies: STM32F4, USART, DAC/ADC, DMA, Hercules SETUP utility
          </p>
        </div>

        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">Melody Improvisation Unit (μ)</h3>
          <pre className="text-xs my-2 text-muted-foreground">
            {`
  +-------------+     +----------------+     +----------------+
  | Chord       |---->| FFT            |---->| Frequency      |
  | Input       |     | Processing     |     | Extraction     |
  +-------------+     +----------------+     +----------------+
        |                    |                      |
        |                    v                      |
        |             +--------------+              |
        +------------>| Melody       |<-------------+
                      | Generation   |
                      +--------------+
                             |
                             v
                      +---------------+
                      | Audio         |
                      | Output        |
                      +---------------+
`}
          </pre>
          <p className="text-sm mb-2">
            Developed a system that generates melodies with variations in pitches and rhythms based on input chords. The
            algorithm digitally processes chord inputs, computes FFT to extract dominant frequencies, and generates
            randomized melodies based on harmonic relationships.
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Technologies: Raspberry Pi, Python, FFT Analysis, Digital Signal Processing
          </p>
        </div>

        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">Power Amplifier in Software-Defined Radio</h3>
          <pre className="text-xs my-2 text-muted-foreground">
            {`
  +-------------+     +----------------+     +----------------+
  | Class-B     |---->| Push-Pull      |---->| Low-Pass       |
  | Amplifier   |     | Configuration  |     | Filter         |
  +-------------+     +----------------+     +----------------+
        |                    |                      |
        |                    v                      |
        |             +--------------+              |
        +------------>| Transformer  |<-------------+
                      | Coupling     |
                      +--------------+
                             |
                             v
                      +---------------+
                      | 50 Ω Load     |
                      | (Antenna)     |
                      +---------------+
`}
          </pre>
          <p className="text-sm mb-2">
            Designed a class-B discrete transistor power amplifier with a low-pass filter to drive the software-defined
            radio's antenna. Used transformer coupling and BJTs in a push-pull configuration with a 3rd order LC
            low-pass filter to pass signals in the 8-16 MHz range.
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Technologies: NI Multisim, Altium Designer, Python, Oscilloscope, Multimeter
          </p>
        </div>

        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">Enhanced 16-bit 'ARM-like' Processor</h3>
          <pre className="text-xs my-2 text-muted-foreground">
            {`
  +-------------+     +----------------+     +----------------+
  | Instruction |---->| Register       |---->| ALU            |
  | Decoder     |     | File           |     | Operations     |
  +-------------+     +----------------+     +----------------+
        |                    |                      |
        |                    v                      |
        |             +--------------+              |
        +------------>| Memory       |<-------------+
                      | Interface    |
                      +--------------+
                             |
                             v
                      +---------------+
                      | I/O           |
                      | Devices       |
                      +---------------+
`}
          </pre>
          <p className="text-sm mb-2">
            Designed a 16-bit, 8-register processor in Verilog based on the ARM architecture family. Implemented
            subroutine and stack functionality, along with connections to external I/O devices. Supported various
            operations including arithmetic, logical, memory, and branch instructions.
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Technologies: Verilog, Intel Quartus Prime Design Software, ModelSim, ARM Architecture, Hardware Simulation
          </p>
        </div>

        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">Radio-Controlled Airplane</h3>
          <pre className="text-xs my-2 text-muted-foreground">
            {`
  +-------------+     +----------------+     +----------------+
  | Radio       |---->| Channel        |---->| Micro          |
  | Controller  |     | Assignment     |     | Servos         |
  +-------------+     +----------------+     +----------------+
        |                    |                      |
        |                    v                      |
        |             +--------------+              |
        +------------>| ESC          |<-------------+
                      | Controller   |
                      +--------------+
                             |
                             v
                      +---------------+
                      | 3D Printed    |
                      | Airframe      |
                      +---------------+
`}
          </pre>
          <p className="text-sm mb-2">
            3D printed a radio-controlled airplane as a high school capstone project. Used four micro servos to control
            the airplane's direction with each servo corresponding to a channel on the radio control system. Implemented
            an ESC controller to regulate the motor speed.
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Technologies: 3D Printing, Radio Control Systems, Servo Motors, ESC Controllers
          </p>
        </div>
      </div>
    </div>
  )
}
