"use client";

import FadeIn from "@/components/FadeIn";

const contacts = [
  {
    category: "General",
    people: [
      {
        name: "General Inquiries",
        role: "SAIN National",
        email: "info@sain.org",
      },
      {
        name: "Donations & Funding",
        role: "SAIN National",
        email: "donate@sain.org",
      },
      {
        name: "Research Hub",
        role: "SAIN National",
        email: "research@sain.org",
      },
    ],
  },
  {
    category: "National Leadership",
    people: [
      {
        name: "Alexander Müller",
        role: "Director SAIN",
        email: "alexander@sain.org",
        linkedin: "https://alexanderakm.github.io/",
      },
    ],
  },
  {
    category: "Chapter Contacts",
    people: [
      {
        name: "Thomas Brcic",
        role: "Co-Director SAIN Groningen",
        email: "groningen@sain.org",
        linkedin: "https://www.linkedin.com/in/thomas-brcic-1b2737212/",
      },
      {
        name: "Ana Paula Castillo Rodriguez & Andreea Chivu",
        role: "Co-Directors SAIN Amsterdam",
        email: "amsterdam@sain.org",
      },
      {
        name: "Riccardo Campanella",
        role: "Director SAIN Utrecht",
        email: "utrecht@sain.org",
        linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
      },
    ],
  },
];

const socials = [
  {
    name: "Substack",
    href: "https://aisig.substack.com/",
    description: "Weekly articles on AI Safety",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/safe-ai-netherlands/",
    description: "Follow us for updates",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #021c4d 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="section-container relative z-10">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-4">
              Contact
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-navy-900 max-w-3xl mb-6">
              Get in touch
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              Whether you want to join a chapter, start one in your city,
              collaborate on research, or support our work — we&apos;d love to
              hear from you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto space-y-12">
            {contacts.map((group, gi) => (
              <FadeIn key={group.category} delay={gi * 0.1}>
                <div>
                  <h2 className="font-display font-semibold text-lg text-navy-900 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-dutch-orange" />
                    {group.category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.people.map((person) => (
                      <div key={person.email} className="card p-6">
                        <h3 className="font-display font-semibold text-navy-900 mb-1">
                          {person.name}
                        </h3>
                        <p className="text-sm text-slate-400 mb-4">
                          {person.role}
                        </p>
                        <a
                          href={`mailto:${person.email}`}
                          className="text-sm font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors flex items-center gap-1"
                        >
                          {person.email}
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </a>
                        {"linkedin" in person && person.linkedin && (
                          <a
                            href={person.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 text-xs text-slate-400 hover:text-navy-900 transition-colors block"
                          >
                            View profile &rarr;
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Socials & Communities */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Stay Connected
              </p>
              <h2 className="heading-lg text-navy-900">
                Find us online
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {socials.map((social, i) => (
              <FadeIn key={social.name} delay={i * 0.1}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-6 text-center group"
                >
                  <h3 className="font-display font-semibold text-navy-900 group-hover:text-dutch-orange transition-colors mb-1">
                    {social.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {social.description}
                  </p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-lg mx-auto text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Postal Address
              </p>
              <h2 className="heading-md text-navy-900 mb-4">
                Stichting Safe AI Netherlands
              </h2>
              <p className="text-slate-500">
                Hereplein 4<br />
                9711 GA Groningen<br />
                The Netherlands
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
