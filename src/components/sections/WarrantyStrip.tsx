"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckIcon, DropletIcon, PhoneIcon } from "../ui/icons";

// Exact WordPress warranty strip, including the real "More Details" expand
// behavior. The live page genuinely expands this on click — content
// verified by clicking the real button and reading the revealed DOM (it
// was not visible in a static crawl and had been wrongly assumed empty in
// an earlier pass; see docs/migration/homepage-parity.md). All three
// warranty item titles/descriptions below are verbatim from that live,
// expanded content.
const items = [
  {
    icon: DropletIcon,
    title: "10-Year Waterproofing Coverage",
    body: "Our limited 10-year warranty covers installation-related waterproofing deficiencies and water infiltration issues directly associated with completed bathroom renovation work under normal residential use and proper maintenance conditions.",
  },
  {
    icon: CheckIcon,
    title: "1-Year Labour Warranty",
    body: "All installation labour and renovation workmanship are covered for 1 year from the project completion date to help ensure installation quality, reliability, and professional project execution.",
  },
  {
    icon: PhoneIcon,
    title: "Responsive Post-Project Support",
    body: "Our team remains available after project completion to answer questions, review concerns, and provide guidance regarding maintenance, materials, and warranty-related service requests whenever needed.",
  },
];

export function WarrantyStrip() {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-y border-line bg-warm-100">
      <div className="mx-auto max-w-[1410px] px-5 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <Image src="/images/wordpress/finance-icon.svg" alt="" width={56} height={56} className="h-14 w-14 shrink-0" />
            <div>
              <h3 className="text-lg font-extrabold text-charcoal-950 sm:text-xl">
                Professional Warranty Protection From Elite Bathrooms
              </h3>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.04em] text-bronze-500">
                For Any Bathroom Remodel Project
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-charcoal-950/15 px-6 py-3 text-sm font-bold text-charcoal-950 transition-colors hover:border-charcoal-950/40 sm:self-auto"
          >
            More Details
          </button>
        </div>

        <div
          className={`grid overflow-hidden transition-all duration-300 ${open ? "mt-8 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="grid grid-cols-1 gap-8 overflow-hidden sm:grid-cols-3">
            {items.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bronze-500/10 text-bronze-500">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-bold text-charcoal-950">{item.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal-800">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
