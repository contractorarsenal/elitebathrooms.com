import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { getPostBySlug, getPublishedPosts, readTimeMinutes } from "@/data/blog";
import { getServiceBySlug } from "@/data/services";
import { getAreaBySlug } from "@/data/areas";
import { absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedService = post.relatedServiceSlug ? getServiceBySlug(post.relatedServiceSlug) : undefined;
  const relatedArea = post.relatedAreaSlug ? getAreaBySlug(post.relatedAreaSlug) : undefined;
  const otherPosts = getPublishedPosts().filter((p) => p.slug !== post.slug).slice(0, 2);
  const showToc = post.sections.length > 3;

  return (
    <main className="bg-warm-50 pb-14 pt-16 lg:pb-0 lg:pt-20">
      <div className="border-b border-line py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs
            tone="light"
            items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: post.title }]}
          />
          <span className="mt-4 block text-xs font-bold uppercase tracking-[0.14em] text-bronze-600">
            {post.category} · {readTimeMinutes(post)} min read
          </span>
          <h1 className="mt-3 text-3xl font-extrabold leading-[1.08] text-charcoal-950 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{post.excerpt}</p>
        </Container>
      </div>

      <Container className="max-w-3xl py-14 sm:py-16">
        {showToc && (
          <nav aria-label="Table of contents" className="mb-10 rounded-card border border-line bg-warm-100 p-6">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">In This Article</span>
            <ul className="mt-3 space-y-2">
              {post.sections.map((s) => (
                <li key={s.heading}>
                  <a
                    href={`#${s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="text-sm font-semibold text-charcoal-950 hover:text-bronze-600"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <article className="space-y-10">
          {post.sections.map((section) => (
            <div key={section.heading} id={section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
              <h2 className="text-xl font-extrabold text-charcoal-950 sm:text-2xl">{section.heading}</h2>
              <div className="mt-3 space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-ink-muted">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </article>

        {(relatedService || relatedArea) && (
          <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-8">
            {relatedService && (
              <Link
                href={`/services/${relatedService.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-bronze-400 px-4 py-2 text-xs font-bold uppercase tracking-[0.06em] text-bronze-600 hover:bg-bronze-500/10"
              >
                See {relatedService.name}
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            )}
            {relatedArea && (
              <Link
                href={`/areas-we-serve/${relatedArea.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-bold uppercase tracking-[0.06em] text-charcoal-950 hover:border-charcoal-950/40"
              >
                Bathroom Remodeling in {relatedArea.name}
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        )}

        {otherPosts.length > 0 && (
          <div className="mt-14 border-t border-line pt-10">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">Related Articles</span>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-card border border-line bg-warm-100 p-5 hover:border-bronze-400"
                >
                  <h3 className="text-sm font-extrabold text-charcoal-950">{p.title}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.06em] text-bronze-600">
                    Read Article
                    <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>

      <NextStepCTA variant="compact" heading="Ready to talk about your bathroom?" />
    </main>
  );
}
