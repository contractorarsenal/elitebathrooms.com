import Image from "next/image";
import { ArrowUpRightIcon } from "../ui/icons";

// Exact WordPress services-hub intro: sticky construction photo (left) +
// copy (right), verbatim from wordpress-archive/html/bathroom-remodel-services.html.
export function ServicesHubIntro() {
  return (
    <section className="bg-warm-50 py-16 sm:py-24">
      <div className="mx-auto max-w-[1410px] px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
              <Image
                src="/images/wordpress/services-hub-intro.jpg"
                alt="Elite Bathrooms crew during a bathroom renovation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
              Professional <span className="text-bronze-500">Bathroom Remodel Services</span> In
              Seattle, WA
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-800">
              <p>
                In the Pacific Northwest, a bathroom renovation is more than just a cosmetic
                upgrade; it is a critical investment in your home&apos;s structural integrity and
                your personal well-being. At <strong className="text-charcoal-950">Elite Bathrooms</strong>,
                we specialize in high-performance{" "}
                <strong className="text-charcoal-950">bathroom remodel services</strong> tailored
                to the unique architectural needs of Seattle and the surrounding Puget Sound area.
                Whether you are updating a mid-century craftsman in Capitol Hill or modernizing a
                high-rise condo in Bellevue, our team understands the complexities of local
                building codes, moisture-mitigation requirements, and the latest design trends.
              </p>
              <p>
                A successful Seattle bathroom renovation requires a balance of aesthetics and
                technical precision. Our approach prioritizes premium waterproofing systems,
                essential for our humid climate and high-efficiency fixtures that meet
                Washington&apos;s strict water conservation standards. We don&apos;t just
                &quot;install&quot;; we engineer spaces that combat mold, increase property value,
                and provide a sanctuary from the gray Seattle winters.
              </p>
              <p>
                By choosing Elite Bathrooms, you are partnering with seasoned professionals who
                offer transparent project management and a commitment to &quot;Elite&quot;
                craftsmanship. We recognize that your home is your most significant asset, which
                is why our refined process eliminates the typical stress of construction. From
                initial permit acquisition to the final tile polish, we ensure every detail
                aligns with our rigorous internal quality benchmarks and your personal vision.
              </p>
              <p>
                Elite Bathrooms proudly serves homeowners in Bellevue, Redmond, Kirkland, Issaquah,
                and the surrounding Puget Sound communities. As a fully licensed, bonded, and
                insured company, we prioritize your protection and peace of mind throughout every
                phase of the project. To ensure the longevity and beauty of your remodel, we
                partner with the region&apos;s premier material suppliers, sourcing high-quality,
                locally available fixtures and finishes specifically suited for the unique
                demands of the Pacific Northwest climate.
              </p>
            </div>
            <a
              href="/get-a-quote"
              className="mt-9 inline-flex items-center gap-4 rounded-full bg-bronze-500 py-1.5 pl-6 pr-1.5 text-base font-bold text-warm-50 transition-colors hover:bg-bronze-600"
            >
              Book A Consultation
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
