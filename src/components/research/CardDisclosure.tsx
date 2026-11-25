"use client";

import { useId, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRightIcon, CaretDownIcon } from "@phosphor-icons/react/dist/ssr";

/* How a project card opens, for the hand-kept cards (ProjectBrowser) and the
   tracker's (ProjectTracker) alike, the way the open-positions rows do: the
   title is the toggle and a caret sits opposite it.

   The toggle's hit area is stretched over the top of the card: the nearest
   element around it with `relative`, which holds the title, tags, supervisor
   and summary but not the details, so selecting text or following a link
   there never closes it. A link inside the top part sits above the stretched
   area with `relative z-10`.

   The details slide open by animating the row of a one-row grid from 0fr to
   1fr, which reaches the content's real height without measuring it. They
   stay mounted while closed, hidden (visibility) once folded so nothing
   inside can be tabbed to or read out. `showing` outlives `open` until the
   closing slide ends, so a grid of cards keeps its rows still while a card
   folds back up (ProjectBrowser's useRestRowHeights reads data-details and
   data-showing for that). */

export type CardDisclosure = {
  open: boolean;
  showing: boolean;
  /* The id of the details, which the toggle names in aria-controls. */
  detailsId: string;
  toggle: () => void;
  /* Called when the details' slide ends. */
  settle: () => void;
};

/* `id` names the details; left out, React makes one up. */
export function useCardDisclosure(id?: string): CardDisclosure {
  const [open, setOpen] = useState(false);
  const [showing, setShowing] = useState(false);
  const generated = useId();
  return {
    open,
    showing,
    detailsId: id ?? generated,
    toggle: () => {
      if (!open) setShowing(true);
      setOpen(!open);
    },
    settle: () => {
      if (!open) setShowing(false);
    },
  };
}

/* The card's title as the toggle. */
export function CardToggle({ disclosure, children }: { disclosure: CardDisclosure; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={disclosure.toggle}
      aria-expanded={disclosure.open}
      aria-controls={disclosure.detailsId}
      className="cursor-pointer text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-navy focus-visible:after:[outline-style:solid]"
    >
      {children}
    </button>
  );
}

/* The caret opposite the title, turned up while the card is open. */
export function CardCaret({ open }: { open: boolean }) {
  return (
    <CaretDownIcon
      size={14}
      weight="bold"
      aria-hidden="true"
      className={`mt-1.5 shrink-0 text-navy/50 transition-transform duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
        open ? "rotate-180" : ""
      }`}
    />
  );
}

/* The details, under a hairline at the card's foot. */
export function CardDetails({ disclosure, children }: { disclosure: CardDisclosure; children: ReactNode }) {
  const { open, showing, detailsId, settle } = disclosure;
  return (
    <div
      id={detailsId}
      data-details
      onTransitionEnd={(event) => {
        if (event.target === event.currentTarget) settle();
      }}
      data-showing={showing || undefined}
      className={`grid transition-[grid-template-rows,opacity] duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      } ${showing ? "" : "invisible"}`}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="mx-5 flex flex-col gap-3 border-t border-navy/10 pb-5 pt-4 md:mx-6 md:pb-6">{children}</div>
      </div>
    </div>
  );
}

/* A link in the details (an agenda, a website), which opens in a new tab and
   says so to a screen reader. Reads common.a11y. */
export function DetailsLink({ href, children }: { href: string; children: ReactNode }) {
  const tA11y = useTranslations("common.a11y");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
    >
      {children}
      <ArrowUpRightIcon size={14} aria-hidden="true" />
      <span className="sr-only"> {tA11y("opensInNewTab")}</span>
    </a>
  );
}
