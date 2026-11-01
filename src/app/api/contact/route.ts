import { NextResponse } from "next/server";

const MAX = { name: 100, email: 200, type: 60, budget: 60, message: 2000 };

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field
  if (body.company) return NextResponse.json({ ok: true });

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const type = clean(body.type, MAX.type);
  const budget = clean(body.budget, MAX.budget);
  const message = clean(body.message, MAX.message);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // TODO: send via an email service (e.g. Resend). For now, log only.
  console.log("New inquiry:", { name, email, type, budget, message });

  return NextResponse.json({ ok: true });
}