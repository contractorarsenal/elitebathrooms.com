import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

// TODO: replace with the client's reviewed/legal-approved cookie policy text.
export default function CookiePolicyPage() {
  return (
    <main className="bg-warm-50 pb-20 pt-28 lg:pt-32">
      <Container className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-charcoal-950 sm:text-4xl">Cookie Policy</h1>
        <p className="mt-4 text-sm text-ink-muted">
          This page is a placeholder pending legal review. Contact {siteConfig.email} with
          questions about cookies used on this site.
        </p>
      </Container>
    </main>
  );
}
