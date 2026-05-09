# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build static site to /out/ directory
npm run start    # Serve production build locally
npm run lint     # Run ESLint (uses Next.js built-in config)
```

No test infrastructure exists in this project.

## Architecture

Personal portfolio site built with **Next.js 15 App Router**, **TypeScript**, **React 19**, and **Tailwind CSS**. Configured as a **pure static export** (`output: 'export'` in next.config.mjs) — no server-side rendering, no API routes, no dynamic data fetching. TypeScript build errors are ignored (`ignoreBuildErrors: true`).

### Key pages

- [app/page.tsx](app/page.tsx) — Main portfolio/resume page. Two-column layout: left panel (resume content) + right panel (animated Dithering shader effect). Contains all resume data hardcoded inline: education, skills, experience, 7 projects.
- [app/interests/page.tsx](app/interests/page.tsx) — Interests showcase page. Same split layout. All gallery data (150+ cooking/photography/art images) hardcoded inline. Photography organized by country.

### Component structure

- [components/ui/](components/ui/) — 50+ shadcn/ui components (New York style, Radix UI primitives). Many are present but not actively used — they're available as building blocks.
- [components/image-carousel.tsx](components/image-carousel.tsx) — Custom carousel wrapping Embla Carousel for the interests galleries.
- [components/infinite-card-stack.tsx](components/infinite-card-stack.tsx) — Animated card stack component.
- [lib/utils.ts](lib/utils.ts) — `cn()` utility only (clsx + tailwind-merge).

### Styling

All theme colors are HSL CSS variables defined in [app/globals.css](app/globals.css). Dark mode is toggled via `document.documentElement.classList` and local React state — **not** via next-themes, despite the ThemeProvider component existing. Tailwind uses `darkMode: ["class"]`.

### Static assets

- [public/images/](public/images/) — All portfolio photos referenced by hardcoded arrays in the page components.
- [public/docs/](public/docs/) — PDF resume and project detail documents.
- Favicons exist in both light and dark variants (`favicon-light.png`, `favicon-dark.png`).

### Path alias

`@/` maps to the project root (configured in tsconfig.json). Use `@/components/...`, `@/lib/...`, `@/hooks/...` for imports.
