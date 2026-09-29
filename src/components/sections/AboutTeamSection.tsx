import Image from "next/image";
import { WpSectionHeading } from "../ui/WpSectionHeading";

// Exact WordPress "Meet Our Team" section: 5 real studio portraits (1 large
// + 4 small), verbatim from wordpress-archive/html/bathroom-remodel-company-seattle.html
// (about-us-05..09.jpg). No names/titles are shown on the live page either.
const photos = ["team-member-06.jpg", "team-member-07.jpg", "team-member-08.jpg", "team-member-09.jpg"];

export function AboutTeamSection() {
  return (
    <section className="bg-warm-50 pb-16 sm:pb-24">
      <div className="mx-auto max-w-[1410px] px-4">
        <WpSectionHeading
          eyebrow="Our Team"
          title={
            <>
              Meet <span className="text-bronze-500">Our Team</span> Of Expert Bathroom
              Remodelers
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] sm:row-span-2">
            <Image
              src="/images/wordpress/team/team-member-05.jpg"
              alt="Elite Bathrooms team member"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            {photos.map((p) => (
              <div key={p} className="relative aspect-square overflow-hidden rounded-[24px]">
                <Image src={`/images/wordpress/team/${p}`} alt="Elite Bathrooms team member" fill sizes="25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
