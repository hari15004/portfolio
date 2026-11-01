import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 pb-8 pt-16 md:px-10 md:pt-24">
      <a
        href="#contact"
        className="group block"
        aria-label="Start a project, go to contact form"
      >
        <span
          className="block font-bold uppercase leading-[0.9] tracking-tighter transition-colors group-hover:text-accent"
          style={{ fontSize: "clamp(2.5rem, 11vw, 11rem)" }}
        >
          Start a<br />
          project<span className="text-accent">.</span>
        </span>
      </a>

      <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-4">
        <div>
          <p className="text-lg font-bold tracking-tight">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-2 text-sm text-muted">{site.role}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-col gap-2 text-sm">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="text-muted transition-colors hover:text-text"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 text-sm text-muted">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-text"
          >
            {site.email}
          </a>
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent" />
            {site.availability.label}
          </span>
          <span>{site.location}</span>
        </div>
      </div>

      <p className="mt-16 text-sm text-muted">
        © 2026 {site.name}. All rights reserved.
      </p>
    </footer>
  );
}