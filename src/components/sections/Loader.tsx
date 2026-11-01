"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/motion";
import { site } from "@/data/site";

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const counterEl = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);
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
    const tween = gsap.to(counter, {
      value: 100,
      duration: prefersReducedMotion() ? 0 : 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterEl.current)
          counterEl.current.textContent = String(Math.round(counter.value));
        if (bar.current) gsap.set(bar.current, { scaleX: counter.value / 100 });
      },
      onComplete: () => {
        setReady(true);
        button.current?.focus();
      },
    });
    return () => {
      tween.kill();
    };
  }, []);

    const enter = () => {
    document.documentElement.dataset.loaded = "true";
    window.dispatchEvent(new Event("loader:done"));
    if (prefersReducedMotion()) {
      setDone(true);
      return;
    }
    gsap.to(root.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
      onComplete: () => setDone(true),
    });
  };

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
        className="font-bold leading-none"
        style={{ fontSize: "var(--fs-display)" }}
      >
        <span ref={counterEl}>0</span>
        <span className="text-accent">%</span>
      </p>

      <div className="flex items-center gap-6">
        <div className="h-px flex-1 overflow-hidden bg-border">
          <div
            ref={bar}
            className="h-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <button
          ref={button}
          onClick={enter}
          disabled={!ready}
          className="rounded-full bg-accent px-8 py-4 font-medium text-accent-ink transition-opacity disabled:opacity-40"
        >
          {ready ? "Enter" : "Loading"}
        </button>
      </div>
    </div>
  );
}
