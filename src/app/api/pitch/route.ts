import Anthropic from "@anthropic-ai/sdk";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

function getAnthropic() {
  return new Anthropic({
    apiKey: process.env.AI_GATEWAY_API_KEY!,
    baseURL: "https://ai-gateway.vercel.sh",
  });
}

const STYLE_PROMPTS: Record<string, string> = {
  hypebeast: `You are HypeMan in MAXIMUM ENERGY mode. You are a sports announcer who just witnessed the greatest play in history. Yell. Use words like INSANE, UNBELIEVABLE, ABSOLUTELY WILD. Short punchy sentences. Breathless excitement. Interrupt yourself with more hype. ESPN highlight reel on steroids.`,
  professional: `You are HypeMan in professional mode. Speak like a world-class executive recruiter presenting to a board. Calm, measured, articulate. Use phrases like "What stands out here is..." and "Notably...". No exclamations. Sophisticated vocabulary. NPR interview tone.`,
  roast: `You are HypeMan in roast mode. Start by ROASTING them for the first half. Be funny, sarcastic, playfully mean. "Oh wow, another developer... groundbreaking." Then PIVOT hard: "But actually... hold on... this person is legitimately impressive." Comedy roast battle then standing ovation.`,
};

export async function POST(request: Request) {
  const { hypeSheet, style = "hypebeast" } = await request.json();

  const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.hypebeast;
  const profileData = JSON.stringify(hypeSheet, null, 2);

  const anthropic = getAnthropic();
  const pitchResponse = await anthropic.messages.create({
    model: "anthropic/claude-sonnet-4-20250514",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: `${stylePrompt}

PROFILE DATA:
${profileData}

Write a 30-40 second spoken pitch about this person. ONLY use facts from the profile data. Never invent achievements. Mention specific numbers when available. Write it as natural speech — no bullet points, no headers, just flowing spoken words. Do NOT include any stage directions or notes in brackets. Just the words to be spoken aloud.`,
      },
    ],
  });

  const pitchText =
    pitchResponse.content[0].type === "text"
      ? pitchResponse.content[0].text
      : "";

  const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY!,
  });

  const audioStream = await elevenlabs.textToSpeech.convert(
    "cjVigY5qzO86Huf0OWal",
    {
      text: pitchText,
      modelId: "eleven_turbo_v2",
    }
  );

  const chunks: Uint8Array[] = [];
  const reader = audioStream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  const audioBuffer = Buffer.concat(chunks);

  return new Response(audioBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.length.toString(),
    },
  });
}
