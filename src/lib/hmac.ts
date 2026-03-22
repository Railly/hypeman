const encoder = new TextEncoder();

function getSecret(): ArrayBuffer {
  const secret = process.env.HMAC_SECRET;
  if (!secret) throw new Error("HMAC_SECRET not set");
  const encoded = encoder.encode(secret);
  return encoded.buffer.slice(encoded.byteOffset, encoded.byteOffset + encoded.byteLength);
}

export async function signPayload(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    getSecret(),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const payloadBuf = encoder.encode(payload);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    payloadBuf.buffer.slice(payloadBuf.byteOffset, payloadBuf.byteOffset + payloadBuf.byteLength)
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifySignature(
  payload: string,
  signature: string
): Promise<boolean> {
  const expected = await signPayload(payload);
  if (expected.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}
