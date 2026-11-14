"use client";

/* The organisations SAIN works with, in one strip under the hero: a label on
 * the left, the logos in a row on the right, between two hairlines.
 *
 * Every logo is drawn in the same muted navy so the strip reads as one line
 * of names rather than five brand colours. Each file in
 * public/logos/affiliations is an alpha mask (scripts/affiliation-logos.mjs)
 * painted through `mask-image`, so the colour is a class and darkens to full
 * navy on hover or focus. Heights are set per logo by eye: a square stacked
 * mark (ERO) needs more height than a long wordmark (BlueDot) to carry the
 * same weight. Widths follow from each mask's aspect ratio.
 *
 * The logos always sit on one line. When the line fits, they spread across
 * it; when it doesn't, it rolls as a loop: the list is drawn twice and the
 * track slides by one copy, so the second copy lands where the first began.
 * The roll pauses on hover and keyboard focus. Under reduced motion the line
 * scrolls sideways by hand instead.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const AFFILIATIONS = [
  {
    name: "ELLIS Unit Amsterdam",
    href: "https://ivi.fnwi.uva.nl/ellis/",
    mask: "/logos/affiliations/ellis.png",
    aspect: 4.213,
    height: 34,
  },
  {
    name: "Existential Risk Observatory",
    href: "https://www.existentialriskobservatory.org/",
    mask: "/logos/affiliations/ero.png",
    aspect: 0.981,
    height: 50,
  },
  {
    name: "BlueDot Impact",
    href: "https://bluedot.org/",
    mask: "/logos/affiliations/bluedot.png",
    aspect: 7.525,
    height: 25,
  },
  {
    name: "High Impact Professionals",
    href: "https://www.highimpactprofessionals.org/",
    mask: "/logos/affiliations/hip.png",
    aspect: 4.806,
    height: 28,
  },
  {
    name: "Aithos Research Foundation",
    href: "https://aithos.org/",
    mask: "/logos/affiliations/aithos.png",
    aspect: 3.288,
    height: 38,
  },
];

const widthOf = (org: (typeof AFFILIATIONS)[number]) => Math.round(org.height * org.aspect);

// Space between logos, in px: the least the spread line allows, and the fixed
// step of the rolling one.
const GAP = 48;
// The line at its tightest. Any narrower and it rolls.
const ROW_WIDTH =
  AFFILIATIONS.reduce((sum, org) => sum + widthOf(org), 0) + GAP * (AFFILIATIONS.length - 1);
// Rolling speed in px per second: slow enough to read each name in passing.
const SPEED = 40;

function Logos({ copy }: { copy?: boolean }) {
  return AFFILIATIONS.map((org) => (
    <li key={org.name} className="shrink-0">
      <a
        href={org.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={copy ? -1 : undefined}
        className="group block outline-offset-4"
      >
        <span
          role="img"
          aria-label={org.name}
          className="block bg-navy/55 transition-colors duration-200 group-hover:bg-navy group-focus-visible:bg-navy"
          style={{
            height: org.height,
            width: widthOf(org),
            maskImage: `url(${org.mask})`,
            WebkitMaskImage: `url(${org.mask})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </li>
  ));
}

export default function Affiliations() {
  const viewport = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const measure = () => setFits(el.clientWidth >= ROW_WIDTH);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const rolling = !fits && !reduce;

  return (
    <section aria-labelledby="affiliations-heading" className="border-y border-navy/10 bg-white">
      <div className="shell flex flex-col gap-7 py-8 lg:flex-row lg:items-center lg:gap-16 lg:py-9">
        <h2
          id="affiliations-heading"
          className="shrink-0 font-sans text-label text-navy/75 lg:max-w-[190px]"
        >
          Network and institutional affiliations
        </h2>
        <div
          ref={viewport}
          className={`min-w-0 flex-1 ${
            fits ? "overflow-hidden" : rolling ? "affiliations-viewport overflow-hidden" : "overflow-x-auto"
          }`}
        >
          {rolling ? (
            <div
              className="affiliations-track flex w-max"
              style={{ animationDuration: `${(ROW_WIDTH + GAP) / SPEED}s` }}
            >
              <ul role="list" className="flex items-center" style={{ gap: GAP, paddingRight: GAP }}>
                <Logos />
              </ul>
              <ul aria-hidden="true" className="flex items-center" style={{ gap: GAP, paddingRight: GAP }}>
                <Logos copy />
              </ul>
            </div>
          ) : (
            <ul
              role="list"
              className={`flex items-center ${fits ? "justify-between" : "w-max"}`}
              style={{ gap: GAP }}
            >
              <Logos />
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
