import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { ATLAS } from "@/data/chapterAtlas";

/**
 * The running chapters as prints: each is the photograph its chapter page
 * opens with, so the print is the room previewed and the whole print is the
 * door. Used by the community band on the landing and on /new-chapters.
 *
 * A snap strip below sm, the next print past the edge as the affordance;
 * three across from sm.
 */
export default function ChapterPrints({ id }: { id?: string }) {
  return (
    <nav id={id} aria-label="Chapters" className="scroll-mt-36">
      <ul
        role="list"
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 pt-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:gap-7"
      >
        {ATLAS.map((chapter, i) => (
          <li key={chapter.id} className="w-[72vw] max-w-[300px] shrink-0 snap-center sm:w-auto sm:max-w-none">
            <Link
              href={chapter.href}
              className={`group block ${i === 1 ? "sm:translate-y-4" : ""}`}
            >
              {/* Only the print tilts; the line under it stays level. */}
              <span
                className={`block bg-white p-2 shadow-[0_7px_22px_#021C4D1F] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:rotate-0 group-hover:shadow-[0_14px_34px_#021C4D29] group-focus-visible:rotate-0 ${
                  ["-rotate-[2deg]", "rotate-[1.5deg]", "-rotate-[1deg]"][i]
                }`}
              >
                <span className="relative block aspect-[4/5] overflow-hidden bg-cream">
                  <img
                    src={`${chapter.photo}-640.webp`}
                    srcSet={`${chapter.photo}-640.webp 640w, ${chapter.photo}-960.webp 960w`}
                    sizes="(min-width: 1440px) 280px, (min-width: 640px) 30vw, 72vw"
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </span>
                <span className="block px-1.5 pb-1 pt-3 font-serif text-title text-navy">
                  {chapter.city}
                </span>
              </span>
              <span className="mt-4 flex items-start justify-between gap-3 px-1">
                <span className="kicker text-kicker-sm text-navy/65">{chapter.origin}</span>
                <ArrowRight
                  size={16}
                  weight="regular"
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-navy/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-navy"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
