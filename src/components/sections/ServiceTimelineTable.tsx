// Exact WordPress "Our Service Timelines" section — copy and table content
// verbatim from wordpress-archive/html/bathroom-remodel-services.html.
const rows = [
  {
    type: "One-Day Bathroom Remodel",
    timeline: "Completed in 24 Hours",
    bestFor:
      "Homeowners looking for fast cosmetic upgrades, guest bathroom refreshes, quick resale improvements, or minimal disruption to daily life.",
  },
  {
    type: "Tub-to-Shower Conversion",
    timeline: "2–3 Days",
    bestFor:
      "Improving accessibility, modernizing outdated bathrooms, creating walk-in shower spaces, and enhancing comfort for aging-in-place living.",
  },
  {
    type: "Shower Remodel",
    timeline: "3–5 Days",
    bestFor:
      "Upgrading to frameless glass showers, custom tile designs, luxury shower systems, and improving overall bathroom functionality and aesthetics.",
  },
  {
    type: "Bathtub Remodel",
    timeline: "2–5 Days",
    bestFor:
      "Replacing outdated tubs, installing freestanding bathtubs, adding spa-like comfort, or improving family-friendly bathroom functionality.",
  },
  {
    type: "Full Custom Bathroom Remodel",
    timeline: "2–4+ Weeks",
    bestFor:
      "Complete bathroom transformations, luxury master suite redesigns, layout changes, custom cabinetry, premium finishes, and full plumbing or electrical upgrades.",
  },
];

export function ServiceTimelineTable() {
  return (
    <section className="bg-warm-50 pb-16 sm:pb-24">
      <div className="mx-auto max-w-[1410px] px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[360px_1fr]">
          <div>
            <div className="mb-8 h-px w-[360px] max-w-[40vw] bg-line" />
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-charcoal-950">
              <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
              Our Service Timelines
            </span>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
              The Elite Bathrooms <span className="text-bronze-500">Standards Of Execution</span>
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-charcoal-800">
              <p>
                Trust is earned through transparency. In an industry often plagued by missed
                deadlines and fluctuating quotes, Elite Bathrooms operates with a
                &quot;no-surprises&quot; philosophy. For every bathroom renovation project, we
                provide a detailed project roadmap that outlines exactly what will happen from
                demolition to the final walkthrough.
              </p>
              <p>
                Our expertise extends to the technical selection of materials. We advise our
                clients on which surfaces hold up best to local water conditions and which
                porcelain grades or engineered quartz are superior for long-term durability. This
                level of consultative expertise is what differentiates a &quot;general
                service&quot; from an{" "}
                <strong className="text-charcoal-950">Elite bathroom remodel service</strong>.
              </p>
              <p>
                Furthermore, we recognize the logistical hurdles of renovating in an urban
                environment. Whether it&apos;s managing parking permits for our crews or ensuring
                strict dust mitigation, our operational team handles the friction points so you
                don&apos;t have to.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-[20px] border border-line">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="bg-charcoal-950 text-warm-50">
                  <th className="px-6 py-5 text-sm font-bold">Bathroom Renovation Type</th>
                  <th className="px-6 py-5 text-sm font-bold text-[#c8cf9f]">Typical Timeline</th>
                  <th className="px-6 py-5 text-sm font-bold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.type} className="border-t border-line bg-white">
                    <td className="px-6 py-5 text-sm font-bold text-charcoal-950">{row.type}</td>
                    <td className="bg-[#d6dcb4] px-6 py-5 text-sm font-bold text-charcoal-950">
                      {row.timeline}
                    </td>
                    <td className="px-6 py-5 text-sm leading-relaxed text-charcoal-800">
                      {row.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
