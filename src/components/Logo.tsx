"use client";

import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-4 group ${className}`}>
      <img
        src="/sain-symbol.svg"
        alt=""
        className="w-20 h-20"
        width={80}
        height={80}
      />
      <img
        src="/sain-wordmark.svg"
        alt="SAIN"
        className="h-12"
        height={48}
      />
    </Link>
  );
}
