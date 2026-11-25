import type { ReactNode } from "react";

/* "Apply" at the foot of a project card, on the Project Hub and the
   opportunities board alike. While the card is hovered or has the focus
   (its `group`), a line draws in under the word from the left, as under a
   supervisor's name on the Project Hub; without motion it simply appears. */
export default function CardApplyLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative">
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-navy ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100"
      />
    </span>
  );
}
