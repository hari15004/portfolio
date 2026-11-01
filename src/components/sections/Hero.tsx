"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/motion";
import { site } from "@/data/site";

const introLines = ["HEY, THIS", "IS HARI."];
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
      gsap.set("[data-portrait]", { clipPath: "inset(12% 0 12% 0)", scale: 1.06 });
    }, el);

    const play = () =>
      ctx.add(() => {
        gsap
          .timeline({ defaults: { ease: "power4.out" }, delay: 0.35 })
          .to("[data-line]", { yPercent: 0, duration: 1.1, stagger: 0.12 })
          .to(
            "[data-portrait]",
            { clipPath: "inset(0% 0 0% 0)", scale: 1, duration: 1.2 },
            "-=0.85"
          )
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
      className="relative flex min-h-[100svh] flex-col gap-10 px-6 pb-10 pt-32 md:px-10 md:pb-12"
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

      <div className="grid flex-1 items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <h1
            className="font-bold uppercase leading-[0.86] tracking-[-0.075em]"
            style={{ fontSize: "clamp(3.25rem, 8vw, 8.5rem)" }}
          >
            <span className="sr-only">Hey, this is Hari.</span>
            <span aria-hidden="true" className="block">
              {introLines.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <span data-line className="block">{line}</span>
                </span>
              ))}
            </span>
          </h1>

          <h2
            data-fade
            className="mt-7 font-bold uppercase leading-[0.95] tracking-[-0.065em] text-muted md:mt-9"
            style={{ fontSize: "clamp(1.75rem, 4.1vw, 4.25rem)" }}
          >
            Digital{" "}
            <span className="font-serif font-medium normal-case italic tracking-[-0.07em] text-accent">
              with feeling.
            </span>
          </h2>

          <div
            data-fade
            className="mt-7 flex flex-col gap-6 md:mt-8 md:gap-8"
          >
            <p
              className="flex flex-wrap gap-x-3 text-muted"
              style={{ fontSize: "var(--fs-lead)" }}
            >
              {skills.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < skills.length - 1 && (
                    <span className="ml-3 text-border">/</span>
                  )}
                </span>
              ))}
            </p>
            <p className="max-w-lg text-muted">
              Thoughtful interfaces, playful details, and digital experiences
              made to feel as good as they work.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-accent px-8 py-4 font-medium text-accent-ink transition-transform hover:-translate-y-1"
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
        </div>

        <div
          data-fade
          data-portrait
          className="group relative mx-auto w-full max-w-[24rem] md:col-span-5 md:max-w-[28rem]"
          onPointerMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty(
              "--pointer-x",
              `${event.clientX - bounds.left}px`
            );
            event.currentTarget.style.setProperty(
              "--pointer-y",
              `${event.clientY - bounds.top}px`
            );
          }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            {site.photo ? (
              <>
                <Image
                  src={site.photo}
                  alt={`${site.name}, ${site.role}`}
                  fill
                  sizes="(min-width: 768px) 36vw, 85vw"
                  className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
                <Image
                  src={site.photo}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 768px) 36vw, 85vw"
                  className="portrait-color-reveal pointer-events-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
              </>
            ) : (
              <div
                role="img"
                aria-label={`${site.name}'s portrait will appear here`}
                className="portrait-placeholder flex size-full flex-col items-center justify-center overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="font-bold leading-none tracking-[-0.12em] text-text/90"
                  style={{ fontSize: "clamp(10rem, 26vw, 21rem)" }}
                >
                  H<span className="text-accent">.</span>
                </span>
                <span className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.2em] text-muted">
                  Hari / Indore, India
                </span>
              </div>
            )}
          </div>
          <span className="absolute -bottom-5 -right-3 flex size-16 items-center justify-center rounded-full bg-accent text-sm font-bold uppercase leading-tight text-accent-ink">
            Let&apos;s
            <br />
            build
          </span>
        </div>
      </div>

      <a
        data-fade
        href="#work"
        aria-label="Scroll to selected work"
        className="hidden items-center gap-3 self-end text-sm text-muted md:flex"
      >
        Scroll to explore
        <span className="h-10 w-px animate-pulse bg-accent" />
      </a>
    </section>
  );
}