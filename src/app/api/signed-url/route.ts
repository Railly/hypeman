import { NextResponse } from "next/server";

export async function GET() {
  const agentId = process.env.ELEVENLABS_AGENT_ID;
  const apiKey = process.env.ELEVENLABS_API_KEY;

  console.log("[signed-url] agentId:", agentId, "apiKey:", apiKey?.slice(0, 10) + "...");

  if (!agentId || !apiKey) {
    return NextResponse.json(
      { error: "ElevenLabs not configured" },
      { status: 500 }
    );
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
    {
      method: "GET",
      headers: { "xi-api-key": apiKey },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[signed-url] ElevenLabs error:", response.status, errorText);
    return NextResponse.json(
      { error: "Failed to get signed URL", details: errorText },
      { status: 500 }
    );
  }

  const data = (await response.json()) as { signed_url: string };
  return NextResponse.json({ signedUrl: data.signed_url });
}
