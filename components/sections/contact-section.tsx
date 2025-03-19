import { AsciiArt } from "@/components/ascii-art"
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Music } from "lucide-react"

export function ContactSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="contact" />

      <div className="space-y-6">
        <div className="flex flex-col gap-3">
          <a
            href="mailto:markociricilic@gmail.com"
            className="flex items-center text-sm hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4 mr-2 text-primary" />
            markociricilic@gmail.com
          </a>
          <a href="tel:6044400342" className="flex items-center text-sm hover:text-primary transition-colors">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            604-440-0342
          </a>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            Toronto, ON
          </div>
          <a
            href="https://www.linkedin.com/in/markociricilic/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm hover:text-primary transition-colors"
          >
            <Linkedin className="h-4 w-4 mr-2 text-primary" />
            linkedin.com/in/markociricilic
          </a>
          <a
            href="https://github.com/markociricilic"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4 mr-2 text-primary" />
            github.com/markociricilic
          </a>
          <a
            href="https://open.spotify.com/user/markociricilic?si=c2314d1aa479444e"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm hover:text-primary transition-colors"
          >
            <Music className="h-4 w-4 mr-2 text-primary" />
            spotify.com/user/markociricilic
          </a>
        </div>
      </div>
    </div>
  )
}

