"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap";
import { capabilities } from "@/data/capabilities";

export default function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      el.querySelectorAll<HTMLElement>("[data-row]").forEach((row) => {
        gsap.from(row, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="capabilities"
      className="px-6 py-20 md:px-10 md:py-32"
    >
      <div className="mb-16 md:mb-24">
        <p className="mb-3 text-sm text-muted">04 / Capabilities</p>
        <h2
          className="font-bold uppercase leading-[0.9] tracking-tighter"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          What I <span className="text-accent">Do</span>
        </h2>
      </div>

      <ul className="border-t border-border">
        {capabilities.map((item) => (
          <li
            key={item.id}
            data-row
            className="group grid gap-6 border-b border-border py-8 transition-colors hover:bg-surface focus-within:bg-surface md:grid-cols-12 md:items-center md:gap-10 md:py-12"
          >
            <span className="text-sm text-muted transition-colors group-hover:text-accent md:col-span-1 md:pl-4">
              {item.number}
            </span>

            <h3
              tabIndex={0}
              className="font-bold uppercase leading-none tracking-tighter transition-all duration-500 group-hover:translate-x-3 group-hover:text-accent group-focus-within:translate-x-3 group-focus-within:text-accent md:col-span-5"
              style={{ fontSize: "clamp(2.25rem, 6vw, 5.5rem)" }}
            >
              {item.title}
            </h3>

            <div className="flex flex-col gap-5 md:col-span-6 md:pr-4">
              <p className="text-muted" style={{ fontSize: "var(--fs-lead)" }}>
                {item.description}
              </p>
              <ul className="flex flex-wrap gap-2">
                {item.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-border px-3 py-1 text-sm text-muted transition-colors group-hover:border-accent group-hover:text-text"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}