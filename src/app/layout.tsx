import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

export const metadata: Metadata = {
  title: "HypeMan - AI that hypes YOU up",
  description:
    "Paste your profile. AI finds everything about you online and pitches you like a rockstar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}>
      <body className="bg-black text-white antialiased font-sans">{children}</body>
    </html>
  );
}
