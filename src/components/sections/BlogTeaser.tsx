import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { ArrowRightIcon } from "../ui/icons";
import { getPublishedPosts } from "@/data/blog";

export function BlogTeaser() {
  const [featured, ...rest] = getPublishedPosts();
  if (!featured) return null;

  return (
    <section className="bg-warm-100 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Resources" title="Planning a bathroom remodel?" />
          <Reveal delay={200}>
            <Link
              href="/blog"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold uppercase tracking-[0.06em] text-bronze-600 hover:text-bronze-500"
            >
              All Articles
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr,1fr] lg:gap-14">
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-bronze-600">
                {featured.category}
              </span>
              <h3 className="mt-2 text-2xl font-extrabold leading-tight text-charcoal-950 sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-ink-muted">
                {featured.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-bronze-600">
                Read Article
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>

          <Reveal delay={100} className="flex flex-col divide-y divide-line border-t border-line lg:border-t-0 lg:divide-y-0 lg:gap-5">
            {rest.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-center justify-between gap-4 py-4 first:pt-0 lg:border-b lg:border-line lg:py-0 lg:pb-5 lg:last:border-b-0 lg:last:pb-0"
              >
                <span className="text-sm font-bold leading-snug text-charcoal-950 group-hover:text-bronze-600">
                  {post.title}
                </span>
                <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-bronze-500 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
