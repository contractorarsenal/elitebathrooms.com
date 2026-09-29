import Image from "next/image";
import Link from "next/link";
import { GoogleReviews } from "../sections/GoogleReviews";
import { OneDayPromoWp } from "../sections/OneDayPromoWp";
import { ThumbtackReviews } from "../sections/ThumbtackReviews";
import { WarrantyStrip } from "../sections/WarrantyStrip";
import { ArrowRightIcon } from "../ui/icons";
import { projects, type Project } from "@/data/projects";

// One shared, exact-WordPress-matching template for every project detail
// page (/projects/[slug]): real project photo as the hero background (not
// the shared bg-fallback interior pages use), an After/Before/All Projects
// tab bar, and a Previous-project link — verbatim structure from
// wordpress-archive/html/projects__*.html. Real photos and the safe,
// non-fabricated description come from src/data/projects.ts.
export function ProjectDetailTemplate({ project }: { project: Project }) {
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];

  return (
    <main>
      <section className="relative flex min-h-[320px] items-end overflow-hidden bg-charcoal-950 sm:min-h-[420px] lg:min-h-[460px]">
        <Image src={project.image} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-charcoal-950/60" />
        <div className="relative z-10 mx-auto w-full max-w-[1410px] px-4 pb-16">
          <h1 className="max-w-3xl text-[2rem] font-extrabold leading-[1.1] text-warm-50 sm:text-4xl lg:text-[2.75rem]">
            {project.title}
          </h1>
        </div>
      </section>

      <nav className="border-b border-line bg-warm-50">
        <div className="mx-auto flex max-w-[1410px] items-center gap-8 overflow-x-auto px-4 py-5 text-sm font-bold uppercase tracking-[0.06em]">
          <span className="whitespace-nowrap text-charcoal-950">After Remodeling</span>
          {project.before && <span className="whitespace-nowrap text-charcoal-800">Before Remodeling</span>}
          <Link href="/projects" className="whitespace-nowrap text-charcoal-800 hover:text-bronze-500">
            All Projects
          </Link>
        </div>
      </nav>

      <section className="bg-warm-50 py-16 sm:py-24">
        <div className="mx-auto max-w-[1410px] px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[360px_1fr]">
            <div>
              <div className="mb-8 h-px w-[360px] max-w-[40vw] bg-line" />
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-charcoal-950">
                <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
                {project.type}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
                <span className="text-bronze-500">After</span> Remodeling
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal-800">{project.description}</p>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] sm:col-span-2 sm:row-span-2 sm:aspect-square">
              <Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 100vw, 66vw" className="object-cover" />
            </div>
            {project.gallery.map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                <Image src={src} alt={project.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {project.before && (
        <section className="bg-warm-50 pb-16 sm:pb-24">
          <div className="mx-auto max-w-[1410px] px-4">
            <div className="mb-8 h-px w-[360px] max-w-[40vw] bg-line" />
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-charcoal-950">
              <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
              {project.type}
            </span>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
              <span className="text-bronze-500">Before</span> Remodeling
            </h2>
            <div className="relative mt-10 aspect-[16/9] max-w-3xl overflow-hidden rounded-[20px]">
              <Image src={project.before} alt={`${project.title} before renovation`} fill sizes="(max-width: 1024px) 100vw, 768px" className="object-cover" />
            </div>
          </div>
        </section>
      )}

      <div className="border-t border-line bg-warm-50 py-8">
        <div className="mx-auto max-w-[1410px] px-4">
          <Link href={`/projects/${prev.slug}`} className="group inline-flex items-center gap-3 text-sm">
            <ArrowRightIcon className="h-4 w-4 rotate-180 text-charcoal-950 transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.08em] text-charcoal-800">Previous</span>
              <span className="block font-bold text-bronze-500">{prev.title}</span>
            </span>
          </Link>
        </div>
      </div>

      <GoogleReviews />
      <OneDayPromoWp />
      <ThumbtackReviews />
      <WarrantyStrip />
    </main>
  );
}
