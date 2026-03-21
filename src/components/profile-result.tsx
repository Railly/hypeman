"use client";

import { useState } from "react";
import type { HypeSheet } from "@/lib/synthesize";
import { VoiceWidget } from "@/components/voice-widget";
import { ElevenlabsLogo } from "@/components/logos/elevenlabs";
import { FirecrawlLogo } from "@/components/logos/firecrawl";

type HypeStyle = "professional" | "hypebeast" | "roast";

const STYLES: { key: HypeStyle; label: string }[] = [
  { key: "hypebeast", label: "Hype Beast" },
  { key: "professional", label: "Professional" },
  { key: "roast", label: "Roast" },
];

const SOCIAL_ICONS: Record<string, { path: string; stroke?: boolean }> = {
  github: { path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
  twitter: { path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  linkedin: { path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  website: { path: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9zM3 12h18", stroke: true },
  instagram: { path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  v0: { path: "M7.5 3L12 21L16.5 3", stroke: true },
};

function SocialLink({ platform, url }: { platform: string; url: string }) {
  const icon = SOCIAL_ICONS[platform.toLowerCase()] || SOCIAL_ICONS.website;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-1.5 text-neutral-600 hover:text-white transition-colors duration-150"
      title={platform}
    >
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill={icon.stroke ? "none" : "currentColor"}
        stroke={icon.stroke ? "currentColor" : "none"}
        strokeWidth={icon.stroke ? 2 : 0}
      >
        <path d={icon.path} />
      </svg>
    </a>
  );
}

function ProfileSection({
  title,
  children,
  delay,
}: {
  title: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <div
      className="p-5"
      style={{ animation: `fade-up 0.4s ease-out ${delay}ms both` }}
    >
      <h3 className="text-[10px] font-medium text-neutral-600 uppercase tracking-widest mb-2.5">
        {title}
      </h3>
      {children}
    </div>
  );
}

function PoweredBy({ opacity = "opacity-40" }: { opacity?: string }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-[10px] text-neutral-700 uppercase tracking-widest">Powered by</span>
      <div className="flex items-center gap-3">
        <FirecrawlLogo variant="wordmark" mode="dark" className={`h-[18px] w-auto ${opacity}`} />
        <span className="text-neutral-800">+</span>
        <ElevenlabsLogo variant="wordmark" mode="dark" className={`h-3 w-auto ${opacity}`} />
      </div>
    </div>
  );
}

interface ProfileResultProps {
  hypeSheet: HypeSheet;
  totalSources: number;
  searchCount: number;
  defaultStyle?: HypeStyle;
  showShareButton?: boolean;
  personName?: string;
}

export function ProfileResult({
  hypeSheet,
  totalSources,
  searchCount,
  defaultStyle = "hypebeast",
  showShareButton = false,
  personName,
}: ProfileResultProps) {
  const [hypeStyle, setHypeStyle] = useState<HypeStyle>(defaultStyle);
  const [copied, setCopied] = useState(false);

  function handleShare() {
    const name = personName || hypeSheet.name;
    const url = `${window.location.origin}/hype?name=${encodeURIComponent(name)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div
        className="border border-neutral-800 rounded-lg divide-y divide-neutral-800 overflow-hidden"
        style={{ animation: "scale-in 0.4s ease-out both" }}
      >
        <div
          className="p-5"
          style={{ animation: "fade-up 0.4s ease-out 50ms both" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-medium text-white font-pixel">{hypeSheet.name}</h2>
              <p className="text-sm text-neutral-400 mt-0.5">{hypeSheet.tagline}</p>
              <p className="text-xs text-neutral-600 mt-0.5">{hypeSheet.role}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {hypeSheet.socialLinks.length > 0 && (
                <div className="flex gap-0.5">
                  {hypeSheet.socialLinks.map((link) => (
                    <SocialLink key={link.platform} platform={link.platform} url={link.url} />
                  ))}
                </div>
              )}
              {showShareButton && (
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-1.5 text-neutral-600 hover:text-white transition-colors duration-150"
                  title={copied ? "Copied!" : "Copy share link"}
                >
                  {copied ? (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {hypeSheet.achievements.length > 0 && (
          <ProfileSection title="Achievements" delay={150}>
            <ul className="space-y-1.5">
              {hypeSheet.achievements.map((a, i) => (
                <li
                  key={i}
                  className="text-sm text-neutral-300 flex items-start gap-2"
                  style={{ animation: `fade-up 0.3s ease-out ${200 + i * 40}ms both` }}
                >
                  <span className="text-neutral-600 mt-1 shrink-0 text-[8px]">&#9679;</span>
                  {a}
                </li>
              ))}
            </ul>
          </ProfileSection>
        )}

        {hypeSheet.projects.length > 0 && (
          <ProfileSection title="Projects" delay={300}>
            <div className="space-y-2">
              {hypeSheet.projects.map((p, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between gap-3"
                  style={{ animation: `fade-up 0.3s ease-out ${350 + i * 40}ms both` }}
                >
                  <div className="min-w-0">
                    <span className="text-sm text-white font-medium">{p.name}</span>
                    <span className="text-sm text-neutral-500"> &mdash; {p.description}</span>
                  </div>
                  {p.stats && (
                    <span className="text-xs text-neutral-600 shrink-0 font-mono">
                      {p.stats}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </ProfileSection>
        )}

        {hypeSheet.surprisingFacts.length > 0 && (
          <ProfileSection title="Did you know" delay={450}>
            <ul className="space-y-1.5">
              {hypeSheet.surprisingFacts.map((f, i) => (
                <li
                  key={i}
                  className="text-sm text-neutral-500"
                  style={{ animation: `fade-up 0.3s ease-out ${500 + i * 40}ms both` }}
                >
                  {f}
                </li>
              ))}
            </ul>
          </ProfileSection>
        )}
      </div>

      <div
        className="flex flex-col items-center gap-3"
        style={{ animation: "fade-up 0.4s ease-out 550ms both" }}
      >
        <div className="flex gap-1.5">
          {STYLES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setHypeStyle(key)}
              className={`px-2.5 py-1 text-xs rounded transition-all duration-150 ${
                hypeStyle === key
                  ? "bg-white text-black"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <VoiceWidget hypeSheet={hypeSheet} hypeStyle={hypeStyle} />
      </div>

      <div style={{ animation: "fade-in 0.4s ease-out 700ms both" }}>
        <PoweredBy />
      </div>

      <p
        className="text-[10px] text-neutral-700 text-center font-mono"
        style={{ animation: "fade-in 0.4s ease-out 750ms both" }}
      >
        {totalSources} sources / {searchCount} searches
      </p>
    </div>
  );
}
