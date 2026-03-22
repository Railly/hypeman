"use client";

import { useState, useEffect, useRef } from "react";
import type { HypeSheet } from "@/lib/synthesize";
import { ProfileResult } from "@/components/profile-result";
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
      const signRes = await fetch("/api/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      if (!signRes.ok) throw new Error("Failed to sign");
      const { signature, timestamp } = (await signRes.json()) as {
        signature: string;
        timestamp: string;
      };

      const res = await fetch("/api/hype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, signature, timestamp }),
      });

      if (res.status === 429) throw new Error("Rate limit exceeded. Try again in a minute.");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = (await res.json()) as HypeResponse;
      setResult(data);
      setAppState("transitioning");
      setTimeout(() => setAppState("result"), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
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
          <ProfileResult
            hypeSheet={result.hypeSheet}
            totalSources={result.totalSources}
            searchCount={result.searchSummary.length}
            defaultStyle={hypeStyle}
            showShareButton
            personName={input}
          />
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
