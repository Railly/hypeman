import { NextResponse } from "next/server";
import { aggregateProfile } from "@/lib/firecrawl";
import { synthesizeProfile } from "@/lib/synthesize";

export async function POST(request: Request) {
  const { input } = (await request.json()) as { input: string };

  if (!input?.trim()) {
    return NextResponse.json({ error: "Input is required" }, { status: 400 });
  }

  console.log(`[HypeMan] Aggregating profile for: "${input}"`);
  const { searches, rawMarkdown } = await aggregateProfile(input);
  console.log(`[HypeMan] Got ${searches.reduce((a, s) => a + s.results.length, 0)} total results from ${searches.length} searches`);
  console.log(`[HypeMan] Raw markdown length: ${rawMarkdown.length}`);

  const hypeSheet = await synthesizeProfile(rawMarkdown, input);
  console.log(`[HypeMan] Synthesized: ${hypeSheet.name} - ${hypeSheet.achievements.length} achievements`);

  const searchSummary = searches.map((s) => ({
    query: s.query,
    resultCount: s.results.length,
    sources: s.results.map((r) => r.title).filter(Boolean),
  }));

  return NextResponse.json({
    hypeSheet,
    searchSummary,
    totalSources: searches.reduce((acc, s) => acc + s.results.length, 0),
  });
}
