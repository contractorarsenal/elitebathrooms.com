import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublishedPosts, getDraftPosts, readTimeMinutes } from "@/data/blog";
import { absoluteUrl } from "@/lib/seo";
import { breadcrumbSchema, blogCollectionSchema } from "@/lib/schema";

const description =
  "Straight answers about bathroom remodeling, waterproofing, and planning a project, from Elite Bathrooms, the Greater Seattle Area's bathroom-only specialists.";

export const metadata: Metadata = {
  title: "Bathroom Remodeling Resources",
  description,
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: { type: "website", url: absoluteUrl("/blog"), title: "Bathroom Remodeling Resources", description },
};

export default function BlogPage() {
  const posts = getPublishedPosts();
  const [featured, ...rest] = posts;
  const upcoming = getDraftPosts();
  const crumbs = [{ name: "Home", href: "/" }, { name: "Blog" }];

  return (
    <main>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={blogCollectionSchema(posts.map((p) => absoluteUrl(`/blog/${p.slug}`)))} />
      <PageHero
        crumbs={crumbs}
        title="Bathroom Remodeling Resources"
        description="Straight answers about planning, waterproofing, and what different projects actually involve."
        imageSrc="/images/process/elite-process-planning.jpg"
        imageLabel="/images/process/elite-process-planning.jpg"
        imageAlt="Bathroom remodeling plans and material selections"
      />

      <section className="bg-warm-50 py-20 sm:py-28">
        <Container>
          {featured && (
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid gap-6 overflow-hidden rounded-panel border border-line bg-warm-100 p-7 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center"
              >
                {featured.image && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card lg:col-start-2 lg:row-span-2">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-bronze-600">
                    {featured.category}
                  </span>
                  <span className="ml-2 text-[11px] font-semibold text-ink-muted">
                    {readTimeMinutes(featured)} min read
                  </span>
                </div>
                <div className="lg:col-start-1 lg:row-start-2">
                  <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight text-charcoal-950 sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
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
                  {post.image && (
                    <div className="relative -mx-6 -mt-6 aspect-[16/10] overflow-hidden rounded-t-card">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
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
