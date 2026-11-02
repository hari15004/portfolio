"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { gsap } from "@/lib/animations/gsap";
import { projects } from "@/data/projects";

const workshopCards = [
  {
    id: "web",
    number: "01",
    title: "Web Development",
    subtitle: "The digital world's front door",
    points: ["Responsive experiences", "Frontend engineering", "Performance"],
    accent: "#ff5c1f",
    cover: "web",
    categories: ["Web"],
  },
  {
    id: "uiux",
    number: "02",
    title: "UI / UX",
    subtitle: "Make every interaction make sense",
    points: ["Interface design", "User journeys", "Prototyping"],
    accent: "#3dd6ff",
    cover: "uiux",
    categories: ["Design"],
  },
  {
    id: "designer",
    number: "03",
    title: "Designer",
    subtitle: "Give good ideas a good-looking home",
    points: ["Visual identity", "Typography & layout", "Motion details"],
    accent: "#ff3d81",
    cover: "design",
    categories: ["Design", "Motion"],
  },
  {
    id: "business",
    number: "04",
    title: "Business / Digital",
    subtitle: "Turn digital thinking into real value",
    points: ["Product thinking", "Digital strategy", "Business goals"],
    accent: "#ffb03d",
    cover: "business",
    categories: ["App"],
  },
];

export default function Workshop() {
  const section = useRef<HTMLElement>(null);
  const portal = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const activeCard = workshopCards.find((card) => card.id === active);
  const activeProjects = activeCard
    ? projects.filter(
        (project) =>
          activeCard.categories.includes(project.category) &&
          project.status !== "Placeholder"
      )
    : [];

  useEffect(() => {
    const sectionEl = section.current;
    if (!sectionEl) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(sectionEl.querySelectorAll<HTMLElement>("[data-focus-card]"), {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionEl, start: "top 78%", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (active && portal.current && !portal.current.open) {
      portal.current.showModal();
      closeButton.current?.focus();
    }
  }, [active]);

  function closePortal() {
    if (portal.current?.open) portal.current.close();
    setActive(null);
  }

  return (
    <section
      ref={section}
      id="workshop"
      className="px-6 py-20 md:px-10 md:py-32"
    >
      <div className="mb-10 md:mb-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm text-muted">02 / Workshop</p>
            <h2
              className="font-bold uppercase leading-[0.9] tracking-tighter"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Enter the <span className="text-accent">Workshop</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted md:text-right">
            One curious mind, a few different ways to make digital things work
            and feel better.
          </p>
        </div>
      </div>

      <ul className="workshop-books">
        {workshopCards.map((card) => {
          return (
            <li key={card.id} data-focus-card>
              <article
                className="workshop-book"
                style={{ "--book-accent": card.accent } as CSSProperties}
              >
                <button
                  type="button"
                  className={`workshop-book__cover workshop-book__cover--${card.cover}`}
                  aria-label={`Open ${card.title} book and view projects`}
                  onClick={() => setActive(card.id)}
                >
                  <span className="workshop-book__spine" aria-hidden="true" />
                  <span className="workshop-book__edition">
                    <span>FIELD NOTES</span>
                    <span>{card.number} / 04</span>
                  </span>

                  <span className="workshop-book__illustration" aria-hidden="true">
                    {card.cover === "web" && (
                      <span className="book-art-browser">
                        <i /><i /><i /><b /><b /><b />
                      </span>
                    )}
                    {card.cover === "uiux" && (
                      <span className="book-art-orbit">
                        <i /><i /><i /><b />
                      </span>
                    )}
                    {card.cover === "design" && (
                      <span className="book-art-type">Aa<span>.</span></span>
                    )}
                    {card.cover === "business" && (
                      <span className="book-art-signal">
                        <i /><i /><i /><i /><b />
                      </span>
                    )}
                  </span>

                  <span className="workshop-book__title-block">
                    <span className="workshop-book__title">{card.title}</span>
                    <span className="workshop-book__rule" aria-hidden="true" />
                    <span className="workshop-book__subtitle">{card.subtitle}</span>
                  </span>
                  <span className="workshop-book__colophon">
                    A PRACTICE IN MAKING DIGITAL
                  </span>

                  <span className="workshop-book__hover">
                    <span className="workshop-book__hover-label">Inside this book</span>
                    <span className="workshop-book__points">
                      {card.points.map((point) => (
                        <span key={point}>
                          <span aria-hidden="true">✳</span> {point}
                        </span>
                      ))}
                    </span>
                    <span className="workshop-book__open">
                      Open the book <span aria-hidden="true">↗</span>
                    </span>
                  </span>
                </button>
              </article>
            </li>
          );
        })}
      </ul>

      {activeCard && (
        <dialog
          ref={portal}
          className="workshop-portal"
          aria-labelledby="workshop-portal-title"
          onClose={() => setActive(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) closePortal();
          }}
        >
          <div className="workshop-portal__content">
            <button
              ref={closeButton}
              type="button"
              className="workshop-portal__close"
              aria-label="Close project portal"
              onClick={closePortal}
            >
              <span aria-hidden="true">×</span>
              <span>Close</span>
            </button>

            <div className="workshop-portal__heading">
              <p>FIELD NOTES / {activeCard.number}</p>
              <h3 id="workshop-portal-title">{activeCard.title}</h3>
              <span>{activeProjects.length.toString().padStart(2, "0")} PROJECTS</span>
            </div>

            {activeProjects.length ? (
              <ul className="workshop-portal__projects">
                {activeProjects.map((project, index) => (
                  <li key={project.slug}>
                    <span className="workshop-portal__project-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="workshop-portal__project-visual"
                      style={{ background: project.gradient }}
                      aria-hidden="true"
                    >
                      <span>{project.title.slice(0, 1)}</span>
                    </div>
                    <div className="workshop-portal__project-copy">
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                    </div>
                    <span className="workshop-portal__project-year">
                      {project.year}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="workshop-portal__empty">
                <span className="workshop-portal__empty-orbit" aria-hidden="true" />
                <p>The next project is somewhere in the making.</p>
                <span>Come back soon</span>
              </div>
            )}
          </div>
        </dialog>
      )}
    </section>
  );
}