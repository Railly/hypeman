"use client";

import { useState, useEffect, useRef } from "react";
import type { HypeSheet } from "@/lib/synthesize";
import { VoiceWidget } from "@/components/voice-widget";
import { ElevenlabsLogo } from "@/components/logos/elevenlabs";
import { FirecrawlLogo } from "@/components/logos/firecrawl";

interface HypeResponse {
  hypeSheet: HypeSheet;
  searchSummary: { query: string; resultCount: number; sources: string[] }[];
  totalSources: number;
}

type HypeStyle = "professional" | "hypebeast" | "roast";

const STYLES: { key: HypeStyle; label: string }[] = [
  { key: "hypebeast", label: "Hype Beast" },
  { key: "professional", label: "Professional" },
  { key: "roast", label: "Roast" },
];

const SEARCH_STEPS = [
  { label: "Scanning GitHub", query: "github profile" },
  { label: "Checking LinkedIn", query: "linkedin presence" },
  { label: "Finding OSS work", query: "open source" },
  { label: "Searching articles", query: "blog posts" },
  { label: "Finding mentions", query: "features & mentions" },
  { label: "Synthesizing", query: "building hype sheet" },
];

function SearchProgress() {
  const [step, setStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep((s) => (s < SEARCH_STEPS.length - 1 ? s + 1 : s));
    }, 2800);
    const tickInterval = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
    return () => {
      clearInterval(stepInterval);
      clearInterval(tickInterval);
    };
  }, []);

  return (
    <div
      className="space-y-6"
      style={{ animation: "fade-up 0.3s ease-out both" }}
    >
      <div className="border border-neutral-800 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-mono">
            Searching {SEARCH_STEPS.length} sources
          </span>
          <span className="text-xs text-neutral-600 font-mono tabular-nums">
            {elapsed}s
          </span>
        </div>

        <div className="divide-y divide-neutral-900">
          {SEARCH_STEPS.map((s, i) => {
            const isDone = i < step;
            const isCurrent = i === step;
            const isPending = i > step;

            return (
              <div
                key={s.label}
                className="px-4 py-2.5 flex items-center justify-between transition-all duration-500"
                style={{
                  opacity: isPending ? 0.25 : 1,
                  animation: isCurrent ? "fade-in 0.3s ease-out both" : undefined,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 flex items-center justify-center">
                    {isDone ? (
                      <svg className="w-3.5 h-3.5 text-white" style={{ animation: "scale-in 0.2s ease-out both" }} viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                    ) : isCurrent ? (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" style={{ animation: "pulse-ring 1.5s ease-out infinite" }} />
                    ) : (
                      <div className="w-1 h-1 rounded-full bg-neutral-700" />
                    )}
                  </div>
                  <span className={`text-sm ${isDone ? "text-neutral-400" : isCurrent ? "text-white" : "text-neutral-700"}`}>
                    {s.label}
                  </span>
                </div>
                {isDone && (
                  <span className="text-[10px] text-neutral-600 font-mono" style={{ animation: "fade-in 0.2s ease-out both" }}>
                    done
                  </span>
                )}
                {isCurrent && (
                  <div
                    className="h-1 w-12 rounded-full overflow-hidden bg-neutral-800"
                    style={{ animation: "fade-in 0.2s ease-out both" }}
                  >
                    <div
                      className="h-full bg-neutral-400 rounded-full"
                      style={{
                        animation: "progress-fill 2.5s ease-out both",
                        width: "85%",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="h-px bg-neutral-800">
          <div
            className="h-px bg-white/40 transition-all duration-700 ease-out"
            style={{ width: `${((step + 1) / SEARCH_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div
          className="h-5 rounded bg-neutral-900"
          style={{
            backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s ease-in-out infinite",
          }}
        />
        <div
          className="h-5 rounded bg-neutral-900 w-3/4"
          style={{
            backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s ease-in-out infinite 0.1s",
          }}
        />
        <div
          className="h-5 rounded bg-neutral-900 w-1/2"
          style={{
            backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s ease-in-out infinite 0.2s",
          }}
        />
      </div>
    </div>
  );
}

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

type AppState = "idle" | "loading" | "transitioning" | "result";

export default function Home() {
  const [input, setInput] = useState("");
  const [appState, setAppState] = useState<AppState>("idle");
  const [result, setResult] = useState<HypeResponse | null>(null);
  const [error, setError] = useState("");
  const [hypeStyle, setHypeStyle] = useState<HypeStyle>("hypebeast");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setAppState("loading");
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/hype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) throw new Error("Failed to fetch");
      const data = (await res.json()) as HypeResponse;
      setResult(data);
      setAppState("transitioning");
      setTimeout(() => setAppState("result"), 100);
    } catch {
      setError("Something went wrong. Try again.");
      setAppState("idle");
    }
  }

  const isIdle = appState === "idle";
  const isLoading = appState === "loading";
  const showResult = appState === "transitioning" || appState === "result";

  return (
    <main className={`min-h-screen flex flex-col items-center p-8 transition-all duration-700 ${isIdle ? "justify-center" : "justify-start pt-12"}`}>
      <div className="max-w-xl w-full">
        <div
          className={`transition-all duration-500 ease-out ${isIdle ? "mb-8" : "mb-6"}`}
          style={{
            transform: isIdle ? "translateY(0)" : "translateY(0) scale(0.9)",
            transformOrigin: "center top",
          }}
        >
          <div className={`text-center transition-all duration-500 ${isIdle ? "space-y-3" : "space-y-1"}`}>
            <h1 className={`font-medium tracking-tight text-white font-pixel transition-all duration-500 ${isIdle ? "text-5xl" : "text-2xl"}`}>
              HypeMan
            </h1>
            <p className={`text-neutral-500 transition-all duration-500 ${isIdle ? "text-base opacity-100 max-h-8" : "text-xs opacity-0 max-h-0 overflow-hidden"}`}>
              Scrapes your digital footprint. Pitches you like a rockstar.
            </p>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`transition-all duration-500 ${showResult ? "opacity-0 max-h-0 overflow-hidden" : "opacity-100"}`}
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Name, GitHub, or LinkedIn URL..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 relative overflow-hidden"
            >
              <span className={`transition-all duration-200 ${isLoading ? "opacity-0" : "opacity-100"}`}>
                Hype Me
              </span>
              {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-neutral-400 border-t-black rounded-full animate-spin" />
                </span>
              )}
            </button>
          </div>

          {isIdle && (
            <div
              className="flex gap-1.5 justify-center pt-3"
              style={{ animation: "fade-in 0.3s ease-out both" }}
            >
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
          )}
        </form>

        {isLoading && (
          <div className="mt-6">
            <SearchProgress />
          </div>
        )}

        {error && (
          <p
            className="text-red-500 text-center text-sm mt-6"
            style={{ animation: "fade-up 0.3s ease-out both" }}
          >
            {error}
          </p>
        )}

        {showResult && result && (
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
                    <h2 className="text-xl font-medium text-white font-pixel">{result.hypeSheet.name}</h2>
                    <p className="text-sm text-neutral-400 mt-0.5">{result.hypeSheet.tagline}</p>
                    <p className="text-xs text-neutral-600 mt-0.5">{result.hypeSheet.role}</p>
                  </div>
                  {result.hypeSheet.socialLinks.length > 0 && (
                    <div className="flex gap-0.5 shrink-0">
                      {result.hypeSheet.socialLinks.map((link) => (
                        <SocialLink key={link.platform} platform={link.platform} url={link.url} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {result.hypeSheet.achievements.length > 0 && (
                <ProfileSection title="Achievements" delay={150}>
                  <ul className="space-y-1.5">
                    {result.hypeSheet.achievements.map((a, i) => (
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

              {result.hypeSheet.projects.length > 0 && (
                <ProfileSection title="Projects" delay={300}>
                  <div className="space-y-2">
                    {result.hypeSheet.projects.map((p, i) => (
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

              {result.hypeSheet.surprisingFacts.length > 0 && (
                <ProfileSection title="Did you know" delay={450}>
                  <ul className="space-y-1.5">
                    {result.hypeSheet.surprisingFacts.map((f, i) => (
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
              <VoiceWidget hypeSheet={result.hypeSheet} hypeStyle={hypeStyle} />
            </div>

            <div style={{ animation: "fade-in 0.4s ease-out 700ms both" }}>
              <PoweredBy />
            </div>

            <p
              className="text-[10px] text-neutral-700 text-center font-mono"
              style={{ animation: "fade-in 0.4s ease-out 750ms both" }}
            >
              {result.totalSources} sources / {result.searchSummary.length} searches
            </p>
          </div>
        )}

        {isIdle && (
          <div className="mt-8" style={{ animation: "fade-in 0.5s ease-out 0.2s both" }}>
            <PoweredBy opacity="opacity-30" />
          </div>
        )}
      </div>
    </main>
  );
}
