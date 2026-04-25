"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navigation = [
  { name: "Get Involved", href: "/get-involved" },
  { name: "About Us", href: "/about" },
  {
    name: "Chapters",
    href: "#",
    children: [
      { name: "SAIN Groningen", href: "/chapters/groningen" },
      { name: "SAIN Amsterdam", href: "/chapters/amsterdam" },
      { name: "SAIN Utrecht", href: "/chapters/utrecht" },
      { divider: true },
      { name: "Start a Chapter", href: "/get-involved#start-chapter" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setChaptersOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "#") return pathname.startsWith("/chapters");
    return pathname === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <nav className="section-container flex items-center justify-between h-28 md:h-32">
        <Logo
          className={scrolled ? "text-navy-900" : "text-navy-900"}
        />

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.name} className="relative">
                <button
                  onClick={() => setChaptersOpen(!chaptersOpen)}
                  onBlur={() => setTimeout(() => setChaptersOpen(false), 150)}
                  className={`px-4 py-2 text-base font-medium rounded-lg transition-colors flex items-center gap-1 ${
                    isActive(item.href)
                      ? "text-dutch-orange"
                      : "text-slate-600 hover:text-navy-900 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                  <svg
                    className={`w-4 h-4 transition-transform ${chaptersOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {chaptersOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-fade-in">
                    {item.children.map((child, i) =>
                      "divider" in child ? (
                        <div key={i} className="border-t border-slate-100 my-1" />
                      ) : (
                        <Link
                          key={child.name}
                          href={child.href!}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:text-dutch-orange hover:bg-slate-50 transition-colors"
                        >
                          {child.name}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "text-dutch-orange"
                    : "text-slate-600 hover:text-navy-900 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-navy-900 hover:bg-slate-50"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg animate-fade-in">
          <div className="section-container py-4 space-y-1">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name}>
                  <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {item.name}
                  </div>
                  {item.children.map((child, i) =>
                    "divider" in child ? null : (
                      <Link
                        key={child.name || i}
                        href={child.href!}
                        className="block px-4 py-2.5 text-sm text-slate-600 hover:text-dutch-orange rounded-lg"
                      >
                        {child.name}
                      </Link>
                    )
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg ${
                    isActive(item.href) ? "text-dutch-orange" : "text-slate-600"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
