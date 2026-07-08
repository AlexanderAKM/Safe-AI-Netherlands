import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const INFO_EMAIL = "info@safeainetherlands.org";

export const metadata: Metadata = {
  title: "Join SAIN",
  description:
    "Interested in volunteering with Safe AI Netherlands? There is always an open application — get in touch.",
};

export default function OpenPositionsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-white pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #021c4d 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="section-container relative z-10">
          <FadeIn>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-dutch-orange">
              Join SAIN
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl mb-6 max-w-3xl text-navy-900">
              There is always an open application
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-500">
              SAIN is a volunteer organisation. Our chapters in Amsterdam,
              Utrecht, and Groningen are powered by people who care about the
              development and integration of AI going well in the Netherlands
              and abroad. We do not always list specific roles, but if you are
              genuinely interested in contributing, we would love to hear from
              you.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${INFO_EMAIL}?subject=Joining SAIN`}
                className="btn-primary"
              >
                Email {INFO_EMAIL}
              </a>
              <Link href="/get-involved" className="btn-outline">
                Browse ways to get involved
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-slate-50 section-padding">
        <div className="section-container">
          <FadeIn>
            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 md:p-10">
              <h2 className="heading-md mb-4 text-navy-900">How to apply</h2>
              <p className="mb-6 text-slate-600 leading-relaxed">
                Send us an email with a short introduction, your CV, and a brief
                motivation letter. Tell us which chapter you are interested in
                (Amsterdam, Utrecht, or Groningen) and what draws you to SAIN.
                We will get back to you as soon as we can.
              </p>
              <a
                href={`mailto:${INFO_EMAIL}?subject=Joining SAIN`}
                className="btn-primary"
              >
                Get in touch
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
