"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const COURSE_APPLICATION_URL =
  "https://airtable.com/appniQ36V5jGH7C7Y/pagJh3wXI8a1VAewQ/form";

/* Bump the suffix whenever a new cohort opens so returning visitors see it again. */
const DISMISS_KEY = "sain:course-popup-dismissed:2026-cohort";

const OPEN_DELAY_MS = 1500;

export default function CoursePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISS_KEY) === "true";
    } catch {
      /* Private mode or blocked storage: fall through and show the popup. */
    }
    if (dismissed) return;

    const timer = window.setTimeout(() => setIsOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      /* Nothing to persist to; the popup simply returns on the next visit. */
    }
  }, []);

  /* Lock scroll, trap focus, and close on Escape while open. */
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen, close]);

  /* Portalled to <body> so no ancestor stacking or overflow context can bury it. */
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-popup-title"
            aria-describedby="course-popup-description"
            tabIndex={-1}
            className="relative max-h-[calc(100dvh-3rem)] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl outline-none"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-5 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-navy-900"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-7 pr-14 sm:p-9 sm:pr-16">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-dutch-orange">
                Applications open
              </p>
              <h2
                id="course-popup-title"
                className="font-display text-2xl font-bold text-navy-900 sm:text-3xl"
              >
                AI Safety, Ethics, and Society courses
              </h2>
              <p
                id="course-popup-description"
                className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base"
              >
                Join one of our free courses in <b>Technical AI Safety</b>{" "}
                or <b>AI Governance</b>. <br />
                Each course runs for 6 weeks with weekly readings and on-site discussion sessions 
                at our Amsterdam chapter. No prior AI Safety experience needed.
                <br /> <br />
                Applications close on September 2.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-6">
                <a
                  href={COURSE_APPLICATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="btn-primary"
                >
                  Apply now
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-navy-900"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
