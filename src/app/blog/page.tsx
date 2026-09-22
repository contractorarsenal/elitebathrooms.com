import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { getPublishedPosts, getDraftPosts, readTimeMinutes } from "@/data/blog";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bathroom Remodeling Resources",
  description:
    "Straight answers about bathroom remodeling, waterproofing, and planning a project — from Elite Bathrooms, Tacoma's bathroom-only specialists.",
  alternates: { canonical: absoluteUrl("/blog") },
};

export default function BlogPage() {
  const posts = getPublishedPosts();
  const [featured, ...rest] = posts;
  const upcoming = getDraftPosts();

  return (
    <main>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Blog" }]}
        title="Bathroom Remodeling Resources"
        description="Straight answers about planning, waterproofing, and what different projects actually involve."
        imageLabel="/images/elite-process-planning.jpg"
        imageAlt="Bathroom remodeling plans and material selections"
      />

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container>
          {featured && (
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid gap-6 overflow-hidden rounded-panel border border-line bg-warm-100 p-7 sm:p-10 lg:grid-cols-[1fr,1.4fr] lg:items-center"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-bronze-600">
                    {featured.category}
                  </span>
                  <span className="ml-2 text-[11px] font-semibold text-ink-muted">
                    {readTimeMinutes(featured)} min read
                  </span>
                </div>
                <div className="lg:col-start-1 lg:row-start-2">
                  <h2 className="text-2xl font-extrabold leading-tight text-charcoal-950 sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
                    {featured.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-bronze-600">
                    Read Article
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-card border border-line bg-warm-100 p-6 transition-colors hover:border-bronze-400"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-bronze-600">
                      {post.category}
                    </span>
                    <span className="ml-2 text-[11px] font-semibold text-ink-muted">
                      {readTimeMinutes(post)} min read
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold leading-tight text-charcoal-950">{post.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-xs font-bold uppercase tracking-[0.08em] text-bronze-600">
                    Read Article
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {upcoming.length > 0 && (
            <Reveal className="mt-16 border-t border-line pt-10">
              <h2 className="text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">
                Coming Soon
              </h2>
              <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {upcoming.map((post) => (
                  <li key={post.slug} className="text-sm text-ink-muted">
                    {post.title}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </Container>
      </section>

      <NextStepCTA variant="compact" heading="Have a question we didn't cover?" />
    </main>
  );
}
