import Image from "next/image";

// Exact WordPress projects-hub intro, verbatim from
// wordpress-archive/html/projects.html.
export function ProjectsHubIntro() {
  return (
    <section className="bg-warm-50 py-16 sm:py-24">
      <div className="mx-auto max-w-[1410px] px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
              <Image
                src="/images/wordpress/projects-hub-intro.jpg"
                alt="Elite Bathrooms crew reviewing a project"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
              Modern <span className="text-bronze-500">Bathroom Renovation Projects</span> In
              Seattle, WA
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-800">
              <p>
                Our projects of bathroom renovation in Seattle, WA are designed to combine modern
                style, functionality, and long-term durability. From custom walk-in showers and
                frameless glass installations to freestanding bathtubs and luxury vanities, every
                remodel is tailored to fit the homeowner&apos;s lifestyle and the unique layout of
                the space.
              </p>
              <p>
                We focus on creating bathrooms that not only look beautiful but also improve
                comfort and everyday usability. Many of our renovation projects include modern
                tile work, upgraded lighting, waterproof shower systems, floating vanities, and
                space-saving layouts that help bathrooms feel brighter, cleaner, and more open.
              </p>
              <p>
                Every project is completed with attention to detail and professional installation
                standards, including proper waterproofing, drainage, ventilation, and finish
                work. Whether the goal is a luxury spa-inspired bathroom, an aging-in-place
                upgrade, or a practical family-friendly remodel, our team delivers solutions built
                for long-term performance and value.
              </p>
              <p>
                Our Seattle bathroom renovation projects showcase how thoughtful design and
                quality craftsmanship can transform outdated spaces into modern, functional
                bathrooms homeowners enjoy using every day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
