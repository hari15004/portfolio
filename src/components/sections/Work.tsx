"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap";
import { projects } from "@/data/projects";

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      el.querySelectorAll<HTMLElement>("[data-project]").forEach((item) => {
        const frame = item.querySelector("[data-frame]");
        const visual = item.querySelector("[data-visual]");
        const copy = item.querySelectorAll("[data-copy]");

        gsap.fromTo(
          frame,
          { clipPath: "inset(12% 8% 12% 8%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 35%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          visual,
          { scale: 1.3 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.from(copy, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 65%", once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="work" className="px-6 py-20 md:px-10 md:py-32">
      <div className="mb-16 md:mb-24">
        <p className="mb-3 text-sm text-muted">03 / Selected Work</p>
        <h2
          className="font-bold uppercase leading-[0.9] tracking-tighter"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          Selected <span className="text-accent">Work</span>
        </h2>
      </div>

      <div className="flex flex-col gap-24 md:gap-40">
        {projects.map((project, i) => (
          <article
            key={project.slug}
            data-project
            className="group grid items-end gap-8 md:grid-cols-12 md:gap-10"
          >
            <div
              data-frame
              className={`relative aspect-[4/3] overflow-hidden rounded-lg md:col-span-8 md:aspect-[16/10] ${
                i % 2 === 1 ? "md:order-2" : ""
              }`}
            >
              <div
                data-visual
                className="absolute inset-0"
                style={{ background: project.gradient }}
              />
              <span
                aria-hidden="true"
                className="absolute bottom-4 left-5 font-bold leading-none tracking-tighter text-text/10"
                style={{ fontSize: "clamp(4rem, 14vw, 12rem)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div
              className={`flex flex-col gap-5 md:col-span-4 ${
                i % 2 === 1 ? "md:order-1" : ""
              }`}
            >
              <p
                data-copy
                className="flex items-center justify-between text-sm text-muted"
              >
                <span className="text-accent">{project.category}</span>
                <span>
                  {project.year} / {project.status}
                </span>
              </p>
              <h3
                data-copy
                className="font-bold uppercase leading-[0.95] tracking-tighter"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                {project.title}
              </h3>
              <p data-copy className="text-muted">
                {project.description}
              </p>
              <button
                data-copy
                type="button"
                className="group/btn flex w-fit items-center gap-3 rounded-full border border-border py-2 pl-5 pr-2 text-sm font-medium transition-colors hover:bg-surface"
              >
                View project
                <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform duration-300 group-hover/btn:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}