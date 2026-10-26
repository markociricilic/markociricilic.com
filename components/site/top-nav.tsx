import Link from "next/link"
import { ThemeToggle } from "@/components/site/theme"

export type NavLink = {
  href: string
  label: string
  // shorter label used on phones, when the full one is long
  short?: string
}

export function TopNav({ links, cross }: { links: NavLink[]; cross: NavLink }) {
  return (
    <nav className="topnav" aria-label="Sections">
      <div className="links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.short ? (
              <>
                <span className="sm:hidden">{link.short}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </>
            ) : (
              link.label
            )}
          </a>
        ))}
        <Link href={cross.href} className="cross">
          {cross.label}
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  )
}
