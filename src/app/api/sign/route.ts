import { NextResponse } from "next/server";
import { signPayload } from "@/lib/hmac";

export async function POST(request: Request) {
  const { input } = (await request.json()) as { input: string };
  if (!input?.trim()) {
    return NextResponse.json({ error: "Input is required" }, { status: 400 });
  }

  const timestamp = Date.now().toString();
  const signature = await signPayload(`${timestamp}:${input}`);

  return NextResponse.json({ signature, timestamp });
}
