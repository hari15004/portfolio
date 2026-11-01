"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/motion";
import { site } from "@/data/site";

const lines = ["I BUILD", "DIGITAL", "EXPERIENCES."];
const skills = ["Design", "Development", "Motion", "Creative"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");

  // Local time (updates every 30s)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: site.timezone,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  // Staged reveal, starts after the loader's ENTER
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-line]", { yPercent: 110 });
      gsap.set("[data-fade]", { opacity: 0, y: 24 });
    }, el);

    const play = () =>
      ctx.add(() => {
        gsap
          .timeline({ defaults: { ease: "power4.out" }, delay: 0.35 })
          .to("[data-line]", { yPercent: 0, duration: 1.1, stagger: 0.12 })
          .to(
            "[data-fade]",
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
            "-=0.6"
          );
      });

    const alreadyLoaded = document.documentElement.dataset.loaded === "true";
    if (alreadyLoaded) play();
    else window.addEventListener("loader:done", play, { once: true });

    return () => {
      window.removeEventListener("loader:done", play);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end gap-10 px-6 pb-10 pt-32 md:px-10"
    >
      <div
        data-fade
        className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted"
      >
        <span className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
          </span>
          {site.availability.label}
        </span>
        <span>{site.location}</span>
        <span suppressHydrationWarning>{time}</span>
      </div>

      <h1
        className="font-bold uppercase leading-[0.9] tracking-tighter"
        style={{ fontSize: "clamp(2.25rem, 10vw, 11rem)" }}
      >
        <span className="sr-only">I build digital experiences.</span>
        <span aria-hidden="true" className="block">
          {lines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span
                data-line
                className={`block ${line === "DIGITAL" ? "text-accent" : ""}`}
              >
                {line}
              </span>
            </span>
          ))}
        </span>
      </h1>

      <div
        data-fade
        className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
      >
        <div className="flex flex-col gap-6">
          <p className="flex flex-wrap gap-x-3 text-muted" style={{ fontSize: "var(--fs-lead)" }}>
            {skills.map((s, i) => (
              <span key={s}>
                {s}
                {i < skills.length - 1 && <span className="ml-3 text-border">/</span>}
              </span>
            ))}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-accent px-8 py-4 font-medium text-accent-ink"
            >
              Let&apos;s Talk
            </a>
            <a
              href="#work"
              className="rounded-full border border-border px-8 py-4 font-medium transition-colors hover:bg-surface"
            >
              View Work
            </a>
          </div>
        </div>

        <a
          href="#work"
          aria-label="Scroll to work"
          className="hidden items-center gap-3 text-sm text-muted md:flex"
        >
          Scroll
          <span className="h-10 w-px animate-pulse bg-accent" />
        </a>
      </div>
    </section>
  );
}