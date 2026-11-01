"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/motion";
import { site } from "@/data/site";

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const counterEl = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  useEffect(() => {
    const counter = { value: 0 };
    const reduced = prefersReducedMotion();
    const timeline = gsap.timeline({
      onComplete: () => setDone(true),
    });

    timeline
      .to(counter, {
        value: 100,
        duration: reduced ? 0 : 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterEl.current) {
            counterEl.current.textContent = String(Math.round(counter.value));
          }
          if (bar.current) gsap.set(bar.current, { scaleX: counter.value / 100 });
        },
      })
      .call(() => {
        document.documentElement.dataset.loaded = "true";
        window.dispatchEvent(new Event("loader:done"));
      })
      .to(
        root.current,
        {
          yPercent: -100,
          duration: reduced ? 0 : 0.9,
          ease: "power4.inOut",
        },
        "+=0.18"
      );

    return () => {
      timeline.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-6 md:p-10"
    >
      <div className="flex justify-between text-sm text-muted">
        <span>{site.name}</span>
        <span>{site.location}</span>
      </div>

      <p
        className="font-bold leading-none tracking-[-0.1em]"
        style={{ fontSize: "var(--fs-display)" }}
      >
        <span ref={counterEl}>0</span>
        <span className="text-accent">%</span>
      </p>

      <div className="flex items-center gap-5">
        <span className="text-xs uppercase tracking-[0.24em] text-muted">
          Shaping the experience
        </span>
        <div className="h-px flex-1 overflow-hidden bg-border">
          <div
            ref={bar}
            className="h-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <span className="text-sm tabular-nums text-muted">01 / 01</span>
      </div>
    </div>
  );
}
