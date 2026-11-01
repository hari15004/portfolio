"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap";
import { timeline } from "@/data/timeline";

export default function Story() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const listEl = list.current;
    const lineEl = line.current;
    if (!el || !listEl || !lineEl) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        lineEl,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listEl,
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );

      el.querySelectorAll<HTMLElement>("[data-event]").forEach((item) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 80%", once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="story" className="px-6 py-20 md:px-10 md:py-32">
      <div className="mb-16 md:mb-24">
        <p className="mb-3 text-sm text-muted">05 / Story</p>
        <h2
          className="font-bold uppercase leading-[0.9] tracking-tighter"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          How I got <span className="text-accent">here</span>
        </h2>
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-2 top-0 w-px bg-border md:left-1/2"
        >
          <div
            ref={line}
            className="h-full w-full origin-top bg-accent"
          />
        </div>

        <ol ref={list} className="flex flex-col gap-16 md:gap-28">
          {timeline.map((event, i) => (
            <li
              key={`${event.year}-${i}`}
              data-event
              className="relative pl-10 md:grid md:grid-cols-2 md:gap-20 md:pl-0"
            >
              <span
                aria-hidden="true"
                className="absolute left-2 top-3 size-3 -translate-x-1/2 rounded-full bg-accent md:left-1/2"
              />

              <p
                className={`font-bold leading-none tracking-tighter text-accent ${
                  i % 2 === 0 ? "md:text-right" : "md:order-2"
                }`}
                style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
              >
                {event.year}
              </p>

              <div
                className={`mt-4 md:mt-2 ${i % 2 === 0 ? "" : "md:order-1 md:text-right"}`}
              >
                <h3
                  className="mb-3 font-bold uppercase tracking-tighter"
                  style={{ fontSize: "var(--fs-lead)" }}
                >
                  {event.title}
                </h3>
                <p className="text-muted">{event.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}