import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://safeainetherlands.org"),
  title: {
    default: "Safe AI Netherlands",
    template: "%s | SAIN",
  },
  description:
    "The Netherlands' national initiative for AI Safety, uniting research, education, and community to ensure AI benefits everyone.",
  keywords: [
    "AI Safety",
    "Netherlands",
    "SAIN",
    "AI research",
    "AI governance",
    "AI alignment",
    "AI ethics",
  ],
  verification: {
    google: "k0Z89-ZBoJwJsgttXh8i0RILGDy72FQR9N2ynoyFgYg",
  },
  icons: {
    icon: [
      { url: "/sain-symbol.svg", type: "image/svg+xml" },
      { url: "/sain-symbol.svg", sizes: "any" },
    ],
    shortcut: "/sain-symbol.svg",
    apple: "/sain-symbol.svg",
  },
  openGraph: {
    title: "Safe AI Netherlands",
    description:
      "The Netherlands' national initiative for AI Safety, uniting research, education, and community to ensure AI benefits everyone.",
    url: "https://safeainetherlands.org",
    siteName: "Safe AI Netherlands",
    images: [
      {
        url: "/sain-symbol.svg",
        width: 512,
        height: 512,
        alt: "Safe AI Netherlands logo",
      },
    ],
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Safe AI Netherlands",
  alternateName: "SAIN",
  url: "https://safeainetherlands.org",
  logo: "https://safeainetherlands.org/sain-symbol.svg",
  sameAs: [
    "https://www.linkedin.com/company/safe-ai-netherlands/",
    "https://www.instagram.com/sainetherlands/",
    "https://safeainetherlands.substack.com/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
