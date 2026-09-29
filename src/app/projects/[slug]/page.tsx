import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailTemplate } from "@/components/projects/ProjectDetailTemplate";
import { getProjectBySlug, projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: `${project.title}: a completed ${project.type.toLowerCase()} by Elite Bathrooms.`,
    alternates: { canonical: absoluteUrl(`/projects/${project.slug}`) },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetailTemplate project={project} />;
}
