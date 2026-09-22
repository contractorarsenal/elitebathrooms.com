"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Container } from "../ui/Container";
import { ImageSlot } from "../ui/ImageSlot";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export function EstimateTeaser() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    if (phone) params.set("phone", phone);
    if (zip) params.set("zip", zip);
    const query = params.toString();
    router.push(`/estimate${query ? `?${query}` : ""}`);
  }

  return (
    <section className="bg-warm-50 py-20 sm:py-28">
      <Container>
        <Reveal className="grid items-center gap-10 overflow-hidden border border-line bg-warm-100 p-6 sm:p-10 lg:grid-cols-[0.9fr,1.1fr] lg:gap-16 lg:p-12">
          <ImageSlot
            alt="Elite Bathrooms team member ready to help with your estimate"
            aspectRatio="4/5"
            label="/images/elite-contact-team-member.jpg"
          />

          <div>
            <Eyebrow>Get Started</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] text-charcoal-950 sm:text-4xl">
              Let&rsquo;s talk about your bathroom.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
              Tell us a little about your project and we&rsquo;ll follow up to schedule a
              consultation — no pressure, no obligation.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="min-h-11 border border-line bg-warm-50 px-4 text-sm text-ink placeholder:text-ink-muted focus:border-bronze-500 focus:outline-none sm:col-span-2"
              />
              <input
                type="tel"
                required
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="min-h-11 border border-line bg-warm-50 px-4 text-sm text-ink placeholder:text-ink-muted focus:border-bronze-500 focus:outline-none"
              />
              <input
                type="text"
                required
                inputMode="numeric"
                placeholder="ZIP code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="min-h-11 border border-line bg-warm-50 px-4 text-sm text-ink placeholder:text-ink-muted focus:border-bronze-500 focus:outline-none"
              />
              <Button type="submit" variant="primary" className="sm:col-span-2">
                Get My Estimate
              </Button>
            </form>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
