"use client";

import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative w-9 h-9">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="40" height="40" rx="8" className="fill-dutch-orange" />
          <path
            d="M10 28V24.5L14.5 20L10 15.5V12H14L18.5 16.5L23 12H27V15.5L22.5 20L27 24.5V28H23L18.5 23.5L14 28H10Z"
            fill="white"
            fillOpacity="0.15"
          />
          <text
            x="20"
            y="26"
            textAnchor="middle"
            fill="white"
            fontFamily="Plus Jakarta Sans, Inter, sans-serif"
            fontWeight="800"
            fontSize="18"
          >
            S
          </text>
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display font-extrabold text-lg tracking-tight">
          SAIN
        </span>
        <span className="text-[10px] font-medium tracking-widest uppercase text-slate-500 mt-0.5">
          Safe AI Netherlands
        </span>
      </div>
    </Link>
  );
}
