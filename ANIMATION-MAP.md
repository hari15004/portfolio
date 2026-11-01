# Animation Map

Setup: lib/animations/gsap.ts (GSAP + ScrollTrigger), lib/animations/motion.ts (prefersReducedMotion).
Smooth scroll: components/providers/SmoothScroll.tsx (Lenis driven by gsap.ticker, off for reduced motion).

| Where | Animation | Trigger |
|---|---|---|
| Loader | Counter 0-100, progress bar, overlay slides up on ENTER | On load, then click |
| Navbar (mobile) | Full-screen clip-path menu, staggered links | Menu button |
| Hero | Line-by-line headline reveal, staggered fade-up | Loader ENTER ("loader:done" event) |
| Workshop (desktop) | Pinned section, horizontal track movement | Scroll scrub |
| Workshop (mobile) | Accordion open/close (CSS grid rows) | Tap |
| Work | Frame clip reveal, image scale, copy fade-up | Scroll |
| Capabilities | Row fade-up, hover/focus title shift | Scroll, hover |
| Story | Timeline line draws, events fade-up | Scroll scrub |
| CreatorCard | 3D tilt (gsap.quickTo), flip (CSS transform) | Pointer, click/tap |

Reduced motion: GSAP animations are skipped via gsap.matchMedia; CSS transitions are neutralised in globals.css.