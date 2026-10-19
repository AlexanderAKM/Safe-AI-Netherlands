/* The organisations SAIN works with, in one strip under the hero: a label on
 * the left, the logos in a row on the right, between two hairlines.
 *
 * Every logo is drawn in the same muted navy so the strip reads as one line
 * of names rather than four brand colours. Each file in
 * public/logos/affiliations is an alpha mask (scripts/affiliation-logos.mjs)
 * painted through `mask-image`, so the colour is a class and darkens to full
 * navy on hover or focus. Heights are set per logo by eye: a square stacked
 * mark (ERO) needs more height than a long wordmark (BlueDot) to carry the
 * same weight. Widths follow from each mask's aspect ratio.
 */

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
];

export default function Affiliations() {
  return (
    <section aria-labelledby="affiliations-heading" className="border-y border-navy/10 bg-white">
      <div className="shell flex flex-col gap-7 py-8 lg:flex-row lg:items-center lg:gap-16 lg:py-9">
        <h2
          id="affiliations-heading"
          className="shrink-0 font-sans text-label text-navy/75 lg:max-w-[190px]"
        >
          Network and institutional affiliations
        </h2>
        <ul
          role="list"
          className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:flex sm:flex-1 sm:flex-wrap sm:justify-between sm:gap-x-10"
        >
          {AFFILIATIONS.map((org) => (
            <li key={org.name} className="flex justify-center sm:block">
              <a
                href={org.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block outline-offset-4"
              >
                <span
                  role="img"
                  aria-label={org.name}
                  className="block bg-navy/55 transition-colors duration-200 group-hover:bg-navy group-focus-visible:bg-navy"
                  style={{
                    height: org.height,
                    width: Math.round(org.height * org.aspect),
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
          ))}
        </ul>
      </div>
    </section>
  );
}
