"use client";

import type { HypeSheet } from "@/lib/synthesize";
import { ProfileResult } from "@/components/profile-result";

interface HypePageClientProps {
  hypeSheet: HypeSheet;
  totalSources: number;
  searchCount: number;
  defaultStyle: "professional" | "hypebeast" | "roast";
  personName: string;
}

export function HypePageClient({
  hypeSheet,
  totalSources,
  searchCount,
  defaultStyle,
  personName,
}: HypePageClientProps) {
  return (
    <main className="min-h-screen flex flex-col items-center p-8 pt-12">
      <div className="max-w-xl w-full">
        <div className="text-center mb-6 space-y-1">
          <a href="/" className="inline-block">
            <h1 className="text-2xl font-medium text-foreground font-pixel hover:opacity-80 transition-opacity">
              HypeMan
            </h1>
          </a>
          <p className="text-xs text-muted">
            Hype sheet for {personName}
          </p>
        </div>

        <ProfileResult
          hypeSheet={hypeSheet}
          totalSources={totalSources}
          searchCount={searchCount}
          defaultStyle={defaultStyle}
          showShareButton
          personName={personName}
        />
      </div>
    </main>
  );
}
