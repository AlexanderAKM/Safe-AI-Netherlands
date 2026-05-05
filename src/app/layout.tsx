import type { Metadata } from "next";
import { League_Spartan, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://safeainetherlands.org"),
  alternates: {
    canonical: "/",
  },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon", sizes: "32x32", type: "image/png" },
      { url: "/sain-symbol.svg", type: "image/svg+xml" },
      { url: "/sain-symbol.svg", sizes: "any" },
    ],
    shortcut: ["/icon"],
    apple: [{ url: "/icon", sizes: "180x180", type: "image/png" }],
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
    <html lang="en" className={`scroll-smooth ${poppins.variable} ${leagueSpartan.variable}`}>
      <head>
        <link rel="prefetch" href="/about" />
        <link rel="prefetch" href="/get-involved" />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
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
