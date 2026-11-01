"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { stations } from "@/data/stations";
import { projects } from "@/data/projects";

const categoryByStation: Record<string, string | undefined> = {
  web: "Web",
  apps: "App",
  design: "Design",
  motion: "Motion",
};

export default function Workshop() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  // Desktop: pin + horizontal movement. Mobile: plain vertical stack.
  useEffect(() => {
    const sectionEl = section.current;
    const viewportEl = viewport.current;
    const trackEl = track.current;
    if (!sectionEl || !viewportEl || !trackEl) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);
      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    mm.add("(min-width: 768px) and (prefers-reduced-motion: reduce)", () => {
      viewportEl.style.overflowX = "auto";
      return () => {
        viewportEl.style.overflowX = "";
      };
    });

    return () => mm.revert();
  }, []);

  // Mobile cards change page height when opened
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 450);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <section
      ref={section}
      id="workshop"
      className="py-20 md:flex md:h-screen md:flex-col md:justify-center md:overflow-hidden md:py-0"
    >
      <div className="px-6 pb-10 md:px-10 md:pb-8">
        <p className="mb-3 text-sm text-muted">02 / Workshop</p>
        <h2
          className="font-bold uppercase leading-[0.9] tracking-tighter"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          Enter the <span className="text-accent">Workshop</span>
        </h2>
      </div>

      <div ref={viewport} className="md:w-full">
        <div
          ref={track}
          className="flex flex-col gap-4 px-6 md:w-max md:flex-row md:gap-6 md:px-10"
        >
          {stations.map((station, i) => {
            const isOpen = active === station.id;
            const category = categoryByStation[station.id];
            const related = category
              ? projects.filter((p) => p.category === category)
              : [];
            const panelId = `station-${station.id}`;

            return (
              <article
                key={station.id}
                className="flex flex-col justify-between gap-8 rounded-lg border bg-surface p-6 transition-colors md:h-[62vh] md:w-[40vw] md:shrink-0 md:p-8"
                style={{ borderColor: isOpen ? station.accent : "var(--border)" }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="text-sm font-medium"
                    style={{ color: station.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-muted">{station.tagline}</span>
                </div>

                <div>
                  <h3
                    className="mb-6 font-bold uppercase leading-[0.95] tracking-tighter"
                    style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
                  >
                    {station.title}
                  </h3>

                  <button
                    onClick={() => setActive(isOpen ? null : station.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
                  >
                    {isOpen ? "Close station" : "Open station"}
                  </button>

                  <div
                    id={panelId}
                    className="grid transition-[grid-template-rows] duration-500"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-6 text-muted">{station.description}</p>
                      <div className="mt-4 flex flex-col gap-2 text-sm">
                        {related.length > 0 ? (
                          related.map((p) => (
                            <a
                              key={p.slug}
                              href="#work"
                              className="flex items-center justify-between border-t border-border pt-2 hover:text-accent"
                            >
                              <span>{p.title}</span>
                              <span className="text-muted">{p.year}</span>
                            </a>
                          ))
                        ) : (
                          <span className="border-t border-border pt-2 text-muted">
                            Experiments coming soon.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}