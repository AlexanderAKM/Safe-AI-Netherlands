import Link from "next/link";

const footerLinks = {
  Organization: [
    { name: "About", href: "/about" },
    { name: "Research Hub", href: "/research" },
    { name: "Team", href: "/team" },
    { name: "Get Involved", href: "/get-involved" },
  ],
  Chapters: [
    { name: "SAIN Groningen", href: "/chapters/groningen" },
    { name: "SAIN Amsterdam", href: "/chapters/amsterdam" },
    { name: "SAIN Delft", href: "/chapters/delft" },
    { name: "SAIN Utrecht", href: "/chapters/utrecht" },
  ],
  Connect: [
    { name: "Substack", href: "https://aisig.substack.com/", external: true },
    { name: "LinkedIn", href: "https://linkedin.com/company/safe-ai-netherlands", external: true },
    { name: "Instagram", href: "https://instagram.com/sain_nl", external: true },
    { name: "WhatsApp Community", href: "https://chat.whatsapp.com/IugZtosMu0NES3erIFnFNE", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect width="40" height="40" rx="8" className="fill-dutch-orange" />
                  <text
                    x="20" y="26" textAnchor="middle" fill="white"
                    fontFamily="Plus Jakarta Sans, Inter, sans-serif" fontWeight="800" fontSize="18"
                  >S</text>
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-extrabold text-lg tracking-tight text-white">
                  SAIN
                </span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400 mt-0.5">
                  Safe AI Netherlands
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              The Netherlands&apos; national initiative for AI Safety &mdash; uniting
              research, education, and community to ensure AI benefits everyone.
            </p>
            <a
              href="mailto:info@sain.org"
              className="text-sm text-dutch-orange hover:text-dutch-orange-light transition-colors"
            >
              info@sain.org
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display font-semibold text-sm text-white mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    {"external" in link ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-400 hover:text-dutch-orange transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-dutch-orange transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Safe AI Netherlands (SAIN). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
