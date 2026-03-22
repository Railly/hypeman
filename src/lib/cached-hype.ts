import { unstable_cache } from "next/cache";
import { aggregateProfile } from "@/lib/firecrawl";
import type { HypeSheet } from "@/lib/synthesize";
import { synthesizeProfile } from "@/lib/synthesize";

interface HypeResult {
  hypeSheet: HypeSheet;
  searchSummary: { query: string; resultCount: number; sources: string[] }[];
  totalSources: number;
}

async function fetchHype(input: string): Promise<HypeResult> {
  console.log(`[HypeMan] Cache MISS — aggregating: "${input}"`);
  const { searches, rawMarkdown } = await aggregateProfile(input);
  const hypeSheet = await synthesizeProfile(rawMarkdown, input);

  const searchSummary = searches.map((s) => ({
    query: s.query,
    resultCount: s.results.length,
    sources: s.results.map((r) => r.title).filter(Boolean),
  }));

  return {
    hypeSheet,
    searchSummary,
    totalSources: searches.reduce((acc, s) => acc + s.results.length, 0),
  };
}

export function getCachedHype(input: string) {
  const key = input.trim().toLowerCase();
  return unstable_cache(
    () => fetchHype(input),
    [`hype`, key],
    { revalidate: 86400, tags: [`hype:${key}`] }
  )();
}
