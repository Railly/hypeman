import { aggregateProfile } from "@/lib/firecrawl";
import type { HypeSheet } from "@/lib/synthesize";
import { synthesizeProfile } from "@/lib/synthesize";
import { getCached, setCache } from "@/lib/cache";
import { HypePageClient } from "./client";

interface CachedHype {
  hypeSheet: HypeSheet;
  totalSources: number;
  searchCount: number;
}

export default async function HypePage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; style?: string }>;
}) {
  const params = await searchParams;
  const name = params.name;
  const style = (params.style as "professional" | "hypebeast" | "roast") || "hypebeast";

  if (!name) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-medium text-white font-pixel">HypeMan</h1>
          <p className="text-sm text-neutral-500">Missing name parameter.</p>
          <a href="/" className="text-sm text-neutral-400 hover:text-white transition-colors underline underline-offset-4">
            Go to HypeMan
          </a>
        </div>
      </main>
    );
  }

  const cacheKey = `hype:${name.trim().toLowerCase()}`;
  let cached = getCached<CachedHype>(cacheKey);

  if (!cached) {
    const { searches, rawMarkdown } = await aggregateProfile(name);
    const hypeSheet = await synthesizeProfile(rawMarkdown, name);
    const totalSources = searches.reduce((acc, s) => acc + s.results.length, 0);
    cached = { hypeSheet, totalSources, searchCount: searches.length };
    setCache(cacheKey, cached);
  }

  return (
    <HypePageClient
      hypeSheet={cached.hypeSheet}
      totalSources={cached.totalSources}
      searchCount={cached.searchCount}
      defaultStyle={style}
      personName={name}
    />
  );
}
