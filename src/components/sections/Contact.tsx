"use client";

import { useState } from "react";

const types = ["Website", "App", "Design", "Motion / 3D", "Something else"];
const budgets = [
  "Under ₹50k",
  "₹50k – ₹1.5L",
  "₹1.5L – ₹5L",
  "₹5L+",
  "Not sure yet",
];

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-md border border-border bg-surface px-4 py-3 text-text outline-none transition-colors placeholder:text-muted focus:border-accent";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="px-6 py-20 md:px-10 md:py-32">
      <div className="mb-12 md:mb-20">
        <p className="mb-3 text-sm text-muted">07 / Contact</p>
        <h2
          className="font-bold uppercase leading-[0.9] tracking-tighter"
          style={{ fontSize: "clamp(2.5rem, 9vw, 9rem)" }}
        >
          Let&apos;s build <span className="text-accent">something.</span>
        </h2>
      </div>

      <div className="max-w-2xl" aria-live="polite">
        {status === "success" ? (
          <div
            role="status"
            className="flex flex-col items-start gap-5 rounded-lg border border-accent bg-surface p-8"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-accent text-xl text-accent-ink">
              ✓
            </span>
            <h3
              className="font-bold uppercase tracking-tighter"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Message sent
            </h3>
            <p className="text-muted">
              Thanks for reaching out. I will get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-surface-2"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            {/* Honeypot: hidden from people, bots tend to fill it */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-muted">
                Name
                <input
                  name="name"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Your name"
                  className={field}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-muted">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={field}
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-muted">
                What are we building?
                <select name="type" defaultValue={types[0]} className={field}>
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-muted">
                Budget
                <select name="budget" defaultValue={budgets[4]} className={field}>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-muted">
              Message
              <textarea
                name="message"
                required
                rows={5}
                maxLength={2000}
                placeholder="Tell me about your idea"
                className={field}
              />
            </label>

            {status === "error" && (
              <p role="alert" className="text-sm text-red-400">
                Something went wrong. Please check your details and try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-fit rounded-full bg-accent px-8 py-4 font-medium text-accent-ink transition-opacity disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send inquiry"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}