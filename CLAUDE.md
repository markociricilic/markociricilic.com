# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build static site to /out/ directory (type-checks too)
npm run start    # Serve production build locally
```

No test infrastructure exists in this project. Deployed on AWS Amplify (`amplify.yml`: `npm ci` + `npm run build`, serves `out/`).

## Architecture

Personal portfolio site built with **Next.js 15 App Router**, **TypeScript**, **React 19**, and **Tailwind CSS**. Configured as a **pure static export** (`output: 'export'` in next.config.mjs) — no server-side rendering, no API routes, no dynamic data fetching.

The design is inspired by Afterlab (2001): a split layout with content on the left and a collage "art panel" on the right, hibiscus-red duotone photos, technical line art, and a pixel font for labels. It adapts to all screen sizes: two columns at >=1024px; below that a single centred column with the art panel as a banner on top.

### Key pages

- [app/page.tsx](app/page.tsx) — Main portfolio/resume page. All resume data (education, skills, experience, 7 projects with ASCII diagrams) is hardcoded inline. Art panel: [components/site/collage.tsx](components/site/collage.tsx).
- [app/interests/page.tsx](app/interests/page.tsx) — Interests page. All gallery data (cooking, photography by country, art, Spotify tracks) hardcoded inline. Art panel: animated hibiscus field + pixel pot + Charlie walking on scroll.

### Components

- [components/site/](components/site/) — Shared layout pieces: `theme.tsx` (ThemeProvider, `useTheme`, ThemeToggle, pre-paint theme script), `top-nav.tsx`, `footer-bar.tsx`, `section.tsx` (Section + Box), `duo.tsx` (duotone photo + collage cut-out), `horizon.tsx` (horizon banner, logo, vertical logo strip), `collage.tsx`, `pixel-pot.tsx`, `scroll-charlie.tsx`.
- [components/image-carousel.tsx](components/image-carousel.tsx), [components/music-player.tsx](components/music-player.tsx), [components/hibiscus-field.tsx](components/hibiscus-field.tsx), [components/charlie-walker.tsx](components/charlie-walker.tsx) — interests page widgets. They read the theme via `useTheme()`.
- [lib/utils.ts](lib/utils.ts) — `cn()` utility only (clsx + tailwind-merge).

### Styling

Most styling lives in [app/globals.css](app/globals.css) as plain CSS classes (`.page`, `.art`, `.topnav`, `.sec`, `.proj`, `.tag`, ...) driven by colour tokens (`--accent`, `--ink`, `--bg`, ...). Tailwind utilities are still available and used inside the interests widgets.

Theme: `<html data-theme="light|dark">`, set before first paint by the inline script in [app/layout.tsx](app/layout.tsx) from the saved choice (`localStorage.theme`) or the system preference. Dark-mode tokens are defined under `:root[data-theme="dark"]`.

Fonts (next/font/google): Geist Mono (`--font-mono`, body), Silkscreen (`--font-px`, pixel labels; it lacks Greek/Cyrillic glyphs such as μ), Space Grotesk (`--font-display`, logo/headings).

### Static assets

- [public/images/](public/images/) — Portraits, interests photos (also used in the collages), Charlie animation frames.
- [public/docs/](public/docs/) — PDF resume and project detail documents.

### Path alias

`@/` maps to the project root (configured in tsconfig.json). Use `@/components/...`, `@/lib/...` for imports.
