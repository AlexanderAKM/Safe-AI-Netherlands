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
    "The Netherlands' national initiative for AI Safety — uniting research, education, and community to ensure AI benefits everyone.",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
