import Image from "next/image";

// Exact WordPress "How We Work" section, including the giant "ELITE"
// watermark heading and the 4 real process-step photos
// (process-step-01..04.jpg). Titles/descriptions verbatim from home.html.
const steps = [
  {
    n: "01",
    title: "Initial Consultation",
    body: "We start by learning about your goals, style preferences, priorities, and the type of bathroom you want to create.",
    image: "process-step-01.jpg",
  },
  {
    n: "02",
    title: "Design & Planning",
    body: "We turn ideas into a tailored design that reflects your lifestyle, while shaping a bathroom that feels refined and functional.",
    image: "process-step-02.jpg",
  },
  {
    n: "03",
    title: "Installation",
    body: "We manage installation with precision, clear communication, and a clean, organized approach throughout the project.",
    image: "process-step-03.jpg",
  },
  {
    n: "04",
    title: "Project Handover",
    body: "Before completion, we review the finished work carefully, address final details, and make sure your new bathroom is ready to enjoy.",
    image: "process-step-04.jpg",
  },
];

export function HowWeWork() {
  return (
    <section className="relative overflow-hidden bg-warm-50 pt-16 sm:pt-24">
      {/*
        Measured from live DOM (forced final state): "elite" watermark text
        font-size 420px/weight 400/color rgba(159,159,164,0.075), and the
        real home-floating-3D.png (801x600 natural) positioned to its right,
        overlapping down into the heading row below — this is the actual
        intended design, not a substituted/invented graphic. See
        docs/migration/homepage-parity.md.
      */}
      <div className="relative mx-auto max-w-[1410px] px-4">
        <span
          aria-hidden="true"
          className="pointer-events-none block select-none whitespace-nowrap text-[10rem] font-normal uppercase leading-none text-charcoal-950/[0.06] sm:text-[16rem] lg:text-[26.25rem]"
        >
          elite
        </span>
        <div className="pointer-events-none absolute right-0 top-[-40px] hidden w-[44%] max-w-[560px] md:block">
          <Image
            src="/images/wordpress/home-floating-3D.png"
            alt=""
            width={801}
            height={600}
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="relative mx-auto -mt-8 max-w-[1410px] px-4 sm:-mt-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-charcoal-950">
              <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
              How We Work
            </span>
            <h2 className="mt-6 font-heading text-3xl font-extrabold leading-tight text-charcoal-950 sm:text-4xl lg:text-[2.5rem]">
              Step-By-Step <span className="text-bronze-500">Bathroom Renovation Process</span> For
              Exceptional Results.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-charcoal-800 lg:pt-3">
            A successful remodel starts with a process you can understand and trust. As a
            top-rated bathroom renovation company, Elite Bathrooms follows a clear system that
            keeps each project organized from the first conversation to the final walkthrough. We
            begin with your goals, turn them into a detailed plan, coordinate the work carefully,
            and keep communication open at every stage. This approach helps reduce uncertainty,
            maintain quality, and make it easier to design the bathroom around both your vision
            and the practical needs of your home.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 pb-20 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.n} className="relative">
              <div className="relative aspect-[450/232] w-full overflow-hidden rounded-2xl">
                <Image
                  src={`/images/wordpress/${step.image}`}
                  alt={step.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 font-heading text-lg font-extrabold text-charcoal-950">
                <span className="text-bronze-500">{step.n}</span>. {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-800">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
