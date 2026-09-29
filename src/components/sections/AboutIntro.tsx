import Image from "next/image";
import { ArrowUpRightIcon } from "../ui/icons";

// Exact WordPress About-page intro, verbatim from
// wordpress-archive/html/bathroom-remodel-company-seattle.html.
export function AboutIntro() {
  return (
    <section className="bg-warm-50 py-16 sm:py-24">
      <div className="mx-auto max-w-[1410px] px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
              <Image
                src="/images/team/elite-crew-planning.jpg"
                alt="Elite Bathrooms team reviewing a project"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
              <span className="text-bronze-500">Bathroom Remodeling Company</span> Focused On
              Quality, Comfort, And Lasting Results
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-800">
              <p>
                <strong className="text-charcoal-950">Elite Bathrooms</strong> is a trusted{" "}
                <strong className="text-charcoal-950">bathroom remodeling company</strong>{" "}
                specializing in premium bathroom remodeling solutions designed with both
                aesthetics and practicality in mind. From complete bathroom renovations to
                focused upgrades like bathtub remodels, shower remodels, and bathroom
                conversions, our work is built around thoughtful planning and skilled
                craftsmanship. Every detail matters, from layout decisions and waterproofing
                systems to finish quality and everyday usability.
              </p>
              <p>
                We understand that no two homes are the same. Some homeowners want to modernize
                an outdated bathroom while keeping the existing layout efficient. Others are
                looking for a complete transformation with improved storage, upgraded materials,
                and a more open, functional design. Our role as a bathroom remodeling contractor
                is to guide the project from the first consultation through the final
                installation while helping homeowners make informed decisions that fit their
                goals, style, and budget.
              </p>
              <p>
                Our process combines technical expertise with practical design thinking. We
                focus on proper planning, moisture protection, ventilation, efficient layouts,
                and durable materials that support long-term performance. A premium bathroom
                remodel should not only look impressive on day one, but also continue performing
                well years later.
              </p>
              <p>
                At Elite Bathrooms, we believe homeowners deserve clear communication, organized
                project management, and renovation work completed with professionalism and care.
                As a trusted{" "}
                <strong className="text-charcoal-950">bathroom remodeling contractor</strong>,
                that commitment is reflected in every stage of the process, from the first
                design discussion to the final walkthrough.
              </p>
              <p>
                Whether you are planning a modern shower remodel, a functional bathroom
                conversion, or a complete luxury bathroom renovation, our goal is always the
                same: to create a finished space that feels timeless, practical, and built to
                support everyday living.
              </p>
            </div>
            <a
              href="/get-a-quote"
              className="mt-9 inline-flex items-center gap-4 rounded-full bg-bronze-500 py-1.5 pl-6 pr-1.5 text-base font-bold text-warm-50 transition-colors hover:bg-bronze-600"
            >
              Work With Us
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
