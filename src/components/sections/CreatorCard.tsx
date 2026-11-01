"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/motion";
import { site } from "@/data/site";

const building = ["Web", "Apps", "3D", "Experiments"];

export default function CreatorCard() {
  const tilt = useRef<HTMLDivElement>(null);
  const rotX = useRef<((v: number) => void) | null>(null);
  const rotY = useRef<((v: number) => void) | null>(null);
  const start = useRef({ x: 0, y: 0 });
  const dragged = useRef(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const el = tilt.current;
    if (!el) return;
    gsap.set(el, { transformPerspective: 900 });
    rotX.current = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
    rotY.current = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
    dragged.current = false;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.current?.(px * 14);
    rotX.current?.(-py * 14);
    if (Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y) > 8) {
      dragged.current = true;
    }
  };

  const reset = () => {
    rotX.current?.(0);
    rotY.current?.(0);
  };

  const onClick = () => {
    if (dragged.current) return;
    setFlipped((v) => !v);
  };

  return (
    <section id="creator" className="px-6 py-20 md:px-10 md:py-32">
      <div className="mb-16 md:mb-24">
        <p className="mb-3 text-sm text-muted">06 / Creator Card</p>
        <h2
          className="font-bold uppercase leading-[0.9] tracking-tighter"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          The <span className="text-accent">Maker</span>
        </h2>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div ref={tilt} className="[transform-style:preserve-3d]">
          <button
            type="button"
            aria-pressed={flipped}
            aria-label="Creator card. Press to flip."
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerLeave={reset}
            onPointerUp={reset}
            onClick={onClick}
            className="block aspect-[3/4] w-[min(86vw,22rem)] cursor-pointer touch-pan-y text-left"
          >
            <span
              className="relative block size-full transition-transform duration-700 [transform-style:preserve-3d] motion-reduce:transition-none"
              style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
              {/* Front */}
              <span
                aria-hidden={flipped}
                className="absolute inset-0 flex flex-col justify-between rounded-lg border border-border bg-surface p-7 [backface-visibility:hidden]"
              >
                <span className="flex items-center justify-between text-sm text-muted">
                  <span>01</span>
                  <span className="size-2.5 rounded-full bg-accent" />
                </span>
                <span className="block">
                  <span
                    className="block font-bold uppercase leading-[0.9] tracking-tighter"
                    style={{ fontSize: "clamp(3rem, 14vw, 4.5rem)" }}
                  >
                    {site.name}
                    <span className="text-accent">.</span>
                  </span>
                  <span className="mt-4 block text-muted">{site.role}</span>
                  <span className="mt-1 block text-sm text-muted">{site.location}</span>
                </span>
              </span>

              {/* Back */}
              <span
                aria-hidden={!flipped}
                className="absolute inset-0 flex flex-col justify-between rounded-lg border border-accent bg-surface-2 p-7 [backface-visibility:hidden]"
                style={{ transform: "rotateY(180deg)" }}
              >
                <span className="text-sm text-muted">Currently building</span>
                <span className="flex flex-col gap-3">
                  {building.map((item) => (
                    <span
                      key={item}
                      className="border-b border-border pb-3 font-bold uppercase tracking-tighter"
                      style={{ fontSize: "var(--fs-lead)" }}
                    >
                      {item}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          </button>
        </div>
        <p className="text-sm text-muted">Tap or press Enter to flip</p>
      </div>
    </section>
  );
}