import Link from "next/link";

const footerLinks = {
  Organization: [
    { name: "About Us", href: "/about" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Research Hub", href: "/research" },
    { name: "Contact", href: "/contact" },
  ],
  Chapters: [
    { name: "SAIN Groningen", href: "/chapters/groningen" },
    { name: "SAIN Amsterdam", href: "/chapters/amsterdam" },
    { name: "SAIN Utrecht", href: "/chapters/utrecht" },
  ],
  Connect: [
    { name: "Substack", href: "https://safeainetherlands.substack.com/", external: true },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/safe-ai-netherlands/", external: true },
    { name: "Instagram", href: "https://www.instagram.com/sainetherlands/", external: true },
    {
      name: "SAIN Groningen (all links)",
      href: "https://linktr.ee/saingroningen",
      external: true,
    },
    {
      name: "SAIN Amsterdam (all links)",
      href: "https://linktr.ee/sainamsterdam",
      external: true,
    },
    {
      name: "SAIN Utrecht (all links)",
      href: "https://linktr.ee/sainutrecht",
      external: true,
    },
  ],
  Documents: [
    { name: "Vision", href: "/about/vision" },
    { name: "Theory of Change", href: "/about/theory-of-change" },
    { name: "Code of Conduct", href: "/about/code-of-conduct" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-5">
              <img
                src="/sain-symbol-light.svg"
                alt=""
                className="w-20 h-20"
                width={80}
                height={80}
              />
              <img
                src="/sain-wordmark-light.svg"
                alt="SAIN"
                className="h-12"
                height={48}
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              The Netherlands&apos; national initiative for AI Safety, uniting
              research, education, and community to ensure AI benefits everyone.
            </p>
            <a
              href="mailto:info@safeainetherlands.org"
              className="text-sm text-dutch-orange hover:text-dutch-orange-light transition-colors"
            >
              info@safeainetherlands.org
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
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <Link href="/about/vision" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Vision
            </Link>
            <Link href="/about/theory-of-change" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Theory of Change
            </Link>
            <Link href="/about/code-of-conduct" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
