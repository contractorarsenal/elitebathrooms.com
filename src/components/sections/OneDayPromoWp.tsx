import Image from "next/image";
import { ArrowUpRightIcon } from "../ui/icons";

// Exact WordPress "1 DAY" promo section, copy verbatim from home.html.
// Measured from live DOM: "1 DAY" is solid bronze-500 (#B98A64), full
// opacity, weight 800, font-size 208px at 1440 — not a faded watermark.
// The faint architectural blueprint graphic bottom-left is the real
// wp-content/uploads/2025/06/footer-demo1.png asset.
export function OneDayPromoWp() {
  return (
    <section className="relative overflow-hidden bg-warm-50 pb-20 pt-4">
      <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[560px] opacity-70">
        <Image src="/images/wordpress/footer-demo1.png" alt="" fill className="object-contain object-left-bottom" aria-hidden="true" />
      </div>

      <div className="relative mx-auto max-w-[1410px] overflow-hidden px-4">
        <span className="block select-none whitespace-nowrap text-[4rem] font-extrabold leading-none text-bronze-500 sm:text-[8rem] lg:text-[13rem]">
          1 DAY
        </span>
      </div>

      <div className="relative mx-auto -mt-4 max-w-[1410px] px-4 sm:-mt-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
            Take Advantage of Our <span className="text-bronze-500">One-Day</span> Bathroom
            Conversion
          </h2>
          <div>
            <div className="max-w-xl space-y-4 text-base leading-relaxed text-charcoal-800">
              <p>
                Upgrade your bathroom faster than you ever thought possible with our streamlined{" "}
                <strong className="font-bold text-charcoal-950">one-day bathroom conversion</strong>{" "}
                services. Whether you&apos;re planning a tub-to-shower or shower-to-tub conversion,
                our team delivers efficient solutions designed to minimize disruption while
                maximizing comfort, style, and functionality.
              </p>
              <p>
                If you&apos;re ready to improve your bathroom without the stress of a long
                renovation process, now is the perfect time to get started. Contact our team today
                to schedule your free consultation and discover how simple and convenient your
                bathroom transformation can be!
              </p>
            </div>
            <a
              href="/get-a-quote"
              className="mt-9 inline-flex items-center gap-4 rounded-full bg-bronze-500 py-1.5 pl-6 pr-1.5 font-heading text-base font-bold text-warm-50 transition-colors hover:bg-bronze-600"
            >
              Get Started
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-50 text-bronze-500">
                <ArrowUpRightIcon className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
