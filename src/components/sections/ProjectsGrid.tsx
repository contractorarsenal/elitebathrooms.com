import Image from "next/image";
import Link from "next/link";
import { WpSectionHeading } from "../ui/WpSectionHeading";
import { Reveal } from "../ui/Reveal";
import { projects } from "@/data/projects";

// Exact WordPress "Check our Custom Bathroom Remodel Projects" section —
// Elementor's portfolio widget (elementor-element-25ec48b), NOT a masonry
// widget: a plain grid (data-settings columns:3, columns_tablet:2,
// columns_mobile:1, row_gap:25) of 9 items, each the real project photo in
// its native 683x1024 (2:3) portrait crop with a dark hover overlay
// revealing the title — verbatim from wordpress-archive/html/projects.html
// and wordpress-archive/css/litespeed-combined/7529d57c2e464593401009b9ff5f1cee.css
// (.elementor-portfolio-item__overlay: opacity 0 -> 1 on
// hover/focus-within, background #25272EAB, 15px rounded corners; title
// white, 18px).
//
// On the live WordPress page only 5 of these 9 items ever render into view
// (wordpress-archive/screenshots/desktop/projects.png shows 2 rows of
// 3+2, then a large blank gap where the lazy-loaded remaining items never
// appeared) — a lazy-load/JS bug in the captured page, not the intended
// design. The intended design is this plain 3-column grid populated with
// all 9 real project photos; that is what's reproduced here.
export function ProjectsGrid() {
  return (
    <section className="bg-warm-50 pb-16 sm:pb-24">
      <div className="mx-auto max-w-[1410px] px-4">
        <WpSectionHeading
          eyebrow="Our Project Portfolio"
          title={
            <>
              Check Our Custom <span className="text-bronze-500">Bathroom Remodel</span> Projects
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-[25px] sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 90}>
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block aspect-[2/3] overflow-hidden rounded-[15px]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#25272EAB] p-[15px] text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                  <h3 className="text-lg leading-none font-bold text-white">{project.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
