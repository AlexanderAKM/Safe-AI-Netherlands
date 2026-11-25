/* The filter controls the Project Hub's lists share: the chip, the count
   beside an answer, and the joined control. They live here, apart from
   ProjectBrowser, so a page that only needs the controls (the opportunities
   board) does not load the hand-kept project list with them. */

export function chipClass(active: boolean) {
  return `inline-flex min-h-[38px] shrink-0 items-center gap-2 border px-3 text-[14px] leading-5 transition-colors duration-150 ${
    active
      ? "border-navy bg-navy text-white"
      : "border-navy/18 bg-white text-navy/80 hover:border-navy/45 hover:text-navy"
  }`;
}

export function Count({ n, active }: { n: number; active: boolean }) {
  return (
    <span className={`text-[12px] tabular-nums ${active ? "text-white/70" : "text-navy/45"}`}>{n}</span>
  );
}

/* A joined control: one question, its answers side by side, any number of
   them on. The hairlines between the cells are the navy ground showing
   through a 1px gap, so they hold whether the cells sit in a row or, on a
   phone, a two-by-two grid. */
export function Segmented({
  label,
  groupLabel,
  options,
}: {
  label: string;
  groupLabel: string;
  options: { value: string; label: string; n: number; on: boolean; onClick: () => void }[];
}) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 font-sans text-footnote text-navy/60">{label}</p>
      <div
        role="group"
        aria-label={groupLabel}
        className="grid w-full grid-cols-2 gap-px border border-navy/18 bg-navy/18 sm:inline-flex sm:w-auto"
      >
        {options.map((option) => {
          const on = option.on;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={on}
              onClick={option.onClick}
              className={`inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap px-3.5 text-[14px] transition-colors duration-150 ${
                on
                  ? /* The ring paints over the light frame, so the chosen
                       cell fills the control's full height instead of
                       sitting 1px inside it like a shorter button. */
                    "relative bg-navy text-white ring-1 ring-navy"
                  : "bg-white text-navy/80 hover:bg-[#f2f3f6] hover:text-navy"
              }`}
            >
              {option.label}
              <Count n={option.n} active={on} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* A filter's answers as chips. The first chip is the filter's "all", which
   clears the rest; a chip that would leave nothing is faded, not hidden. They
   wrap from md; on a phone the row scrolls sideways instead, fading at its
   right edge to say "more this way", so the filters do not push the list off
   the first screen. */
export type FilterOption = { value: string; label: string; n: number; on: boolean; onClick: () => void };

export function ChipGroup({ label, options }: { label: string; options: FilterOption[] }) {
  return (
    <div>
      <p className="mb-1.5 font-sans text-footnote text-navy/60">{label}</p>
      <div
        role="group"
        aria-label={label}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 [mask-image:linear-gradient(to_right,black_82%,transparent)] [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:[mask-image:none] [&::-webkit-scrollbar]:hidden"
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={option.on}
            onClick={option.onClick}
            className={`${chipClass(option.on)} ${option.n === 0 && !option.on ? "opacity-45" : ""}`}
          >
            {option.label}
            <Count n={option.n} active={option.on} />
          </button>
        ))}
      </div>
    </div>
  );
}
