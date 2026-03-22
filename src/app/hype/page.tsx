import { getCachedHype } from "@/lib/cached-hype";
import { HypePageClient } from "./client";

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

  const { hypeSheet, totalSources, searchSummary } = await getCachedHype(name);

  return (
    <HypePageClient
      hypeSheet={hypeSheet}
      totalSources={totalSources}
      searchCount={searchSummary.length}
      defaultStyle={style}
      personName={name}
    />
  );
}
