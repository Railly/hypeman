import { NextResponse } from "next/server";
import { aggregateProfile } from "@/lib/firecrawl";
import { synthesizeProfile } from "@/lib/synthesize";
import { rateLimit } from "@/lib/rate-limit";
import { verifySignature } from "@/lib/hmac";
import { getCached, setCache } from "@/lib/cache";

const TIMESTAMP_MAX_AGE = 30_000;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { ok, remaining } = rateLimit(ip);
  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute." },
      { status: 429, headers: { "X-RateLimit-Remaining": "0" } }
    );
  }

  const { input, signature, timestamp } = (await request.json()) as {
    input: string;
    signature?: string;
    timestamp?: string;
  };

  if (!input?.trim()) {
    return NextResponse.json({ error: "Input is required" }, { status: 400 });
  }

  if (!signature || !timestamp) {
    return NextResponse.json({ error: "Missing signature" }, { status: 403 });
  }

  const age = Date.now() - Number(timestamp);
  if (Number.isNaN(age) || age > TIMESTAMP_MAX_AGE || age < 0) {
    return NextResponse.json({ error: "Expired request" }, { status: 403 });
  }

  const valid = await verifySignature(`${timestamp}:${input}`, signature);
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const cacheKey = `hype:${input.trim().toLowerCase()}`;
  type HypeResult = { hypeSheet: ReturnType<typeof synthesizeProfile> extends Promise<infer T> ? T : never; searchSummary: { query: string; resultCount: number; sources: string[] }[]; totalSources: number };
  const cached = getCached<HypeResult>(cacheKey);
  if (cached) {
    console.log(`[HypeMan] Cache hit for: "${input}"`);
    return NextResponse.json(cached, {
      headers: { "X-RateLimit-Remaining": remaining.toString(), "X-Cache": "HIT" },
    });
  }

  console.log(`[HypeMan] Aggregating profile for: "${input}" (remaining: ${remaining})`);
  const { searches, rawMarkdown } = await aggregateProfile(input);
  const hypeSheet = await synthesizeProfile(rawMarkdown, input);

  const searchSummary = searches.map((s) => ({
    query: s.query,
    resultCount: s.results.length,
    sources: s.results.map((r) => r.title).filter(Boolean),
  }));

  const result = { hypeSheet, searchSummary, totalSources: searches.reduce((acc, s) => acc + s.results.length, 0) };
  setCache(cacheKey, result);

  return NextResponse.json(result, {
    headers: { "X-RateLimit-Remaining": remaining.toString(), "X-Cache": "MISS" },
  });
}
