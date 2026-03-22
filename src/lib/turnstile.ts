const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  const body = new URLSearchParams({
    secret,
    response: token,
    ...(ip && { remoteip: ip }),
  });

  const res = await fetch(VERIFY_URL, { method: "POST", body });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}
