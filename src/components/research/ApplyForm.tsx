"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { useLiveTracker } from "@/components/research/useLiveTracker";
import { RESEARCH_INTEREST_FORM_URL } from "@/data/research";

/* The application form, and the project the reader came from.

   "Apply for this project" on a project (ProjectTracker) links here with
   ?project=<its Airtable record ID>. The ID is passed on to the form as a URL
   parameter of the same name, so once the form uses `project` as the default
   of its project question, the form opens with it chosen (in Fillout: Settings,
   URL parameters, add `project`, then set it as that question's Default
   value). Either way the page names the project above the form, so the reader
   knows what to pick.

   The page is static, so the parameter is read in the browser, and the frame
   reloads once with it. */

const RECORD_ID = /^rec[A-Za-z0-9]{14}$/;

export default function ApplyForm({ linkClass }: { linkClass: string }) {
  const [projectId, setProjectId] = useState<string>();
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("project") ?? "";
    if (RECORD_ID.test(id)) setProjectId(id);
  }, []);
  const { tracker } = useLiveTracker();
  const project = projectId ? tracker.projects.find((item) => item.id === projectId) : undefined;
  const formUrl = projectId ? `${RESEARCH_INTEREST_FORM_URL}?project=${projectId}` : RESEARCH_INTEREST_FORM_URL;

  return (
    <>
      {project && (
        <div className="mb-6 border-l-2 border-orange bg-cream px-5 py-4 md:px-6">
          <p className="font-sans text-footnote text-navy/60">Applying for</p>
          <p className="mt-1 font-serif text-title-sm text-navy">{project.title}</p>
          {project.supervisor && <p className="mt-1 text-caption text-navy/65">{project.supervisor}</p>}
          <p className="mt-3 max-w-copy font-sans text-footnote leading-[19px] text-navy/70">
            Make sure it is selected when the form asks which projects you would like to join. You can
            add up to two more.
          </p>
        </div>
      )}
      <div className="border border-navy/12">
        <iframe
          src={formUrl}
          title="SAIN Project Hub application form"
          className="block h-[calc(100dvh-140px)] min-h-[640px] w-full bg-white"
        />
      </div>
      <p className="mt-4 font-sans text-footnote text-navy/60">
        Form not showing?{" "}
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-baseline gap-1 ${linkClass}`}
        >
          Open it in a new tab
          <ArrowUpRight size={13} weight="regular" aria-hidden="true" className="translate-y-[1px]" />
        </a>
      </p>
    </>
  );
}
