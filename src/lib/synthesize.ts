import Anthropic from "@anthropic-ai/sdk";

function getAnthropic() {
  return new Anthropic({
    apiKey: process.env.AI_GATEWAY_API_KEY!,
    baseURL: "https://ai-gateway.vercel.sh",
  });
}

export interface HypeSheet {
  name: string;
  tagline: string;
  role: string;
  achievements: string[];
  projects: { name: string; description: string; stats: string }[];
  mentions: string[];
  surprisingFacts: string[];
  socialLinks: { platform: string; url: string }[];
}

export async function synthesizeProfile(
  rawMarkdown: string,
  inputName: string
): Promise<HypeSheet> {
  const response = await getAnthropic().messages.create({
    model: "anthropic/claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `You are analyzing web search results about a person named "${inputName}". Extract a structured profile from the following scraped data.

IMPORTANT: Only use facts that appear in the data below. Never invent or assume achievements.

DATA:
${rawMarkdown.slice(0, 15000)}

Return a JSON object with this exact structure:
{
  "name": "Full name as found",
  "tagline": "One-line description of who they are (e.g., 'AI Engineer building Peru's tech ecosystem')",
  "role": "Current role/title",
  "achievements": ["Achievement 1 with specific numbers", "Achievement 2", ...],
  "projects": [{"name": "Project", "description": "What it does", "stats": "e.g., 572 GitHub stars"}],
  "mentions": ["Quote or mention by others about this person"],
  "surprisingFacts": ["Interesting facts most people wouldn't know"],
  "socialLinks": [{"platform": "github", "url": "https://..."}]
}

If you can't find enough data, include what you can and leave arrays empty. Never fabricate.
Return ONLY the JSON object, no markdown fences.`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  try {
    return JSON.parse(text) as HypeSheet;
  } catch {
    return {
      name: inputName,
      tagline: "Someone awesome on the internet",
      role: "Unknown",
      achievements: [],
      projects: [],
      mentions: [],
      surprisingFacts: [],
      socialLinks: [],
    };
  }
}
