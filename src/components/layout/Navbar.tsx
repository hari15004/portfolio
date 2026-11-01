"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/motion";
import { site } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  // Lock scroll + close on Escape while the menu is open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Menu open/close animation
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    if (open) {
      gsap.set(el, { display: "flex" });
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: reduced ? 0 : 0.7, ease: "power4.inOut" }
      );
      gsap.fromTo(
        el.querySelectorAll("[data-item]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: reduced ? 0 : 0.6,
          stagger: 0.08,
          delay: reduced ? 0 : 0.3,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: reduced ? 0 : 0.5,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(el, { display: "none" });
        },
      });
    }
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="text-lg font-bold tracking-tight">
          {site.name}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-text"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink"
          >
            Let&apos;s Talk
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="rounded-full border border-border bg-bg/60 px-4 py-2 text-sm backdrop-blur md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <div
        id="mobile-menu"
        ref={menu}
        className="fixed inset-0 z-[60] hidden flex-col justify-center gap-6 bg-bg px-6 md:hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        {site.nav.map((item) => (
          <a
            key={item.href}
            data-item
            href={item.href}
            onClick={() => setOpen(false)}
            className="font-bold leading-none"
            style={{ fontSize: "var(--fs-h2)" }}
          >
            {item.label}
          </a>
        ))}
        <a
          data-item
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-4 w-fit rounded-full bg-accent px-8 py-4 font-medium text-accent-ink"
        >
          Let&apos;s Talk
        </a>
      </div>
    </>
  );
}