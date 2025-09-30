import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Claudable Studio",
  description:
    "Modern enterprise web development studio delivering custom applications, integrations, and lifecycle consulting.",
  openGraph: {
    title: "Claudable Studio — Modern Enterprise Web Development",
    description:
      "We craft strategic digital platforms, streamline operations, and deliver measurable business impact.",
    url: "https://claudable.dev",
    siteName: "Claudable Studio",
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://claudable.dev"),
  keywords: [
    "Next.js consultancy",
    "enterprise web development",
    "system integration",
    "digital product studio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${plusJakarta.variable} bg-background text-foreground antialiased`}
      >
        <Providers>
          <div className="relative min-h-screen bg-[radial-gradient(circle_at_top,_rgba(120,132,232,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),_transparent_60%)]">
            <div className="pointer-events-none fixed inset-0 z-[-1] bg-gradient-to-br from-primary/10 via-transparent to-accent/5 blur-3xl" />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
