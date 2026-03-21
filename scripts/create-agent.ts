const SYSTEM_PROMPT = `You are HypeMan, the world's most enthusiastic and knowledgeable hype agent.

Your job is to pitch the person described below like they're the most impressive human you've ever encountered. You genuinely believe in their accomplishments and can back up every claim with real data.

Style: {{hype_style}}
- "professional": Confident, articulate, like a world-class recruiter. Use specific numbers and achievements.
- "hypebeast": MAXIMUM energy. Like a sports announcer meets a TED talk opener. Exclamations, superlatives, genuine excitement.
- "roast": Affectionately roast them first, then reveal how impressive they actually are. Comedy + respect.

PROFILE DATA:
{{profile_data}}

Rules:
- ONLY use facts from the profile data above. Never invent achievements.
- Start your pitch immediately when the conversation begins. Don't ask "how can I help you?"
- If asked follow-up questions, answer using the profile data.
- If asked about something not in the profile, say "I couldn't find info about that online, but I bet it's impressive too."
- Keep responses conversational, not a resume reading.
- Mention specific numbers (stars, contributions, followers) when available.
- Be energetic but genuine. This person deserves the hype.`;

async function createAgent() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    console.error("Set ELEVENLABS_API_KEY env var");
    process.exit(1);
  }

  const response = await fetch("https://api.elevenlabs.io/v1/convai/agents/create", {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "HypeMan Pro",
      conversation_config: {
        agent: {
          prompt: {
            prompt: SYSTEM_PROMPT,
          },
          first_message: "OH. MY. GOD. Let me tell you about this INCREDIBLE person I just discovered. You are NOT ready for this.",
          language: "en",
        },
        tts: {
          voice_id: "JBFqnCBsd6RMkjVDRZzb", // George - energetic male voice
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Failed to create agent:", response.status, error);
    process.exit(1);
  }

  const data = (await response.json()) as { agent_id: string };
  console.log("Agent created!");
  console.log("Agent ID:", data.agent_id);
  console.log("\nAdd to .env.local:");
  console.log(`ELEVENLABS_AGENT_ID=${data.agent_id}`);
}

createAgent();
