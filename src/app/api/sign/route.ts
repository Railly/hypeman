import { NextResponse } from "next/server";
import { signPayload } from "@/lib/hmac";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(request: Request) {
  const { input, turnstileToken } = (await request.json()) as {
    input: string;
    turnstileToken?: string;
  };

  if (!input?.trim()) {
    return NextResponse.json({ error: "Input is required" }, { status: 400 });
  }

  if (process.env.TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      return NextResponse.json({ error: "Captcha required" }, { status: 403 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      undefined;

    const valid = await verifyTurnstile(turnstileToken, ip);
    if (!valid) {
      return NextResponse.json({ error: "Captcha failed" }, { status: 403 });
    }
  }

  const timestamp = Date.now().toString();
  const signature = await signPayload(`${timestamp}:${input}`);

  return NextResponse.json({ signature, timestamp });
}
