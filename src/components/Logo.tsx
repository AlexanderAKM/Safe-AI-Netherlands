"use client";

import Link from "next/link";

export default function Logo({
  className = "",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <Link href="/" className={`flex items-center gap-4 group ${className}`}>
      <img
        src={inverted ? "/sain-symbol-light.svg" : "/sain-symbol.svg"}
        alt=""
        className="w-20 h-20"
        width={80}
        height={80}
      />
      <img
        src={inverted ? "/sain-wordmark-light.svg" : "/sain-wordmark.svg"}
        alt="SAIN"
        className="h-12"
        height={48}
      />
    </Link>
  );
}
