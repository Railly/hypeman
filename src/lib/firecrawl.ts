import FirecrawlApp from "@mendable/firecrawl-js";

function getFirecrawl() {
  return new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY! });
}

export interface SearchResult {
  query: string;
  results: {
    url: string;
    title: string;
    description: string;
    markdown?: string;
  }[];
}

export async function aggregateProfile(
  input: string
): Promise<{ searches: SearchResult[]; rawMarkdown: string }> {
  const name = extractName(input);

  const queries = [
    `${name} github profile`,
    `${name} developer software engineer`,
    `${name} linkedin`,
    `${name} open source contributions`,
    `"${name}" blog OR article OR talk`,
    `"${name}" mentioned OR featured OR interview`,
  ];

  const searchPromises = queries.map(async (query) => {
    try {
      const response = await getFirecrawl().search(query, {
        limit: 3,
        scrapeOptions: {
          formats: ["markdown"],
        },
      });

      console.log(`[Firecrawl] "${query}" response keys:`, Object.keys(response as object));
      console.log(`[Firecrawl] "${query}" raw:`, JSON.stringify(response).slice(0, 500));

      const data = ((response as Record<string, unknown>).web ?? (response as Record<string, unknown>).data ?? []) as { url?: string; title?: string; description?: string; markdown?: string }[];

      return {
        query,
        results: data.map((r) => ({
          url: r.url ?? "",
          title: r.title ?? "",
          description: r.description ?? "",
          markdown: r.markdown ?? "",
        })),
      } satisfies SearchResult;
    } catch (error) {
      console.error(`Firecrawl search failed for "${query}":`, error);
      return { query, results: [] } satisfies SearchResult;
    }
  });

  const searches = await Promise.all(searchPromises);

  const rawMarkdown = searches
    .flatMap((s) =>
      s.results.map(
        (r) =>
          `## Source: ${r.title}\nURL: ${r.url}\n\n${r.markdown?.slice(0, 3000) ?? r.description}`
      )
    )
    .join("\n\n---\n\n");

  return { searches, rawMarkdown };
}

function extractName(input: string): string {
  const githubMatch = input.match(
    /github\.com\/([a-zA-Z0-9_-]+)/
  );
  if (githubMatch) return githubMatch[1];

  const linkedinMatch = input.match(
    /linkedin\.com\/in\/([a-zA-Z0-9_-]+)/
  );
  if (linkedinMatch) return linkedinMatch[1].replace(/-/g, " ");

  const urlMatch = input.match(
    /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9_-]+)\./
  );
  if (urlMatch && input.startsWith("http")) return urlMatch[1];

  return input.trim();
}
