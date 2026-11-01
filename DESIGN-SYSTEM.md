# Design System

All tokens are CSS variables in src/app/globals.css (:root) and mapped to Tailwind in @theme inline.

## Colors
--bg #0a0a0b, --surface #121214, --surface-2 #1a1a1d, --text #f4f4f1,
--muted #8a8a90, --border #26262a, --accent #c6ff3d, --accent-ink #0a0a0b

Tailwind usage: bg-bg, bg-surface, text-muted, border-border, bg-accent, text-accent-ink

## Spacing
--space-1 .. --space-7 (0.25rem to 7rem)

## Radius
--radius-sm 0.5rem, --radius-md 1rem, --radius-lg 1.75rem

## Typography (fluid, clamp-based)
--fs-body, --fs-lead, --fs-h2, --fs-display
Font: Geist (via next/font), set in layout.tsx

## Rules
- Change the accent color in one place: --accent in globals.css.
- Section headings use uppercase, bold, tight tracking, with one accent word.
- Focus ring: 2px accent outline (:focus-visible).
- prefers-reduced-motion is respected globally in globals.css and per animation in JS.