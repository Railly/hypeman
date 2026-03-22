import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

export const metadata: Metadata = {
  title: "HypeMan - AI that hypes YOU up",
  description:
    "Paste your profile. AI finds everything about you online and pitches you like a rockstar.",
  metadataBase: new URL("https://hypeman-beta.vercel.app"),
  openGraph: {
    title: "HypeMan - AI that hypes YOU up",
    description:
      "Paste your profile. AI finds everything about you online and pitches you like a rockstar.",
    siteName: "HypeMan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HypeMan - AI that hypes YOU up",
    description:
      "Paste your profile. AI finds everything about you online and pitches you like a rockstar.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}>
      <head>
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      </head>
      <body className="bg-black text-white antialiased font-sans">{children}</body>
    </html>
  );
}
