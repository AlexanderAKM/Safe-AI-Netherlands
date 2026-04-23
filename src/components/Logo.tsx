"use client";

import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-4 group ${className}`}>
      <img
        src="/sain-symbol.svg"
        alt=""
        className="w-16 h-16"
        width={64}
        height={64}
      />
      <img
        src="/sain-wordmark.svg"
        alt="SAIN"
        className="h-10"
        height={40}
      />
    </Link>
  );
}
