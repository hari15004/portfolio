# Architecture

Single-page portfolio built with Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP and Lenis.

## Folder structure

src/
  app/
    layout.tsx          Fonts, metadata, SmoothScroll wrapper
    page.tsx            Page shell: assembles all sections in order
    globals.css         Design tokens, base styles, Lenis CSS
    api/contact/route.ts  Contact form endpoint (validation + honeypot)
  components/
    layout/             Navbar, Footer
    sections/           Loader, Hero, Workshop, Work, Capabilities, Story, CreatorCard, Contact
    providers/          SmoothScroll (Lenis synced with GSAP ticker)
  data/                 All editable content (site, projects, capabilities, timeline, stations)
  lib/animations/       gsap.ts (plugin registration), motion.ts (reduced-motion helper)

## Principles

- Content lives in src/data, components only render it.
- GSAP is registered once in lib/animations/gsap.ts. Always import from there.
- Every animation is wrapped in gsap.matchMedia or checks prefersReducedMotion().
- Desktop and mobile layouts are designed separately where needed (Workshop, Story, Navbar).
- No database or auth. The contact endpoint only validates and logs for now.

## Page order

Loader -> Navbar -> Hero -> Workshop -> Work -> Capabilities -> Story -> CreatorCard -> Contact -> Footer

## Editing content

- Name, role, location, email, links: src/data/site.ts
- Projects: src/data/projects.ts
- Capabilities: src/data/capabilities.ts
- Timeline: src/data/timeline.ts
- Workshop stations: src/data/stations.ts