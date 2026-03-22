import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HypeMan - AI that hypes YOU up";
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            border: "1px solid rgba(139,92,246,0.08)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #8b5cf6, #22c55e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
              <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
            </svg>
          </div>

          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-2px",
              fontFamily: "monospace",
            }}
          >
            HypeMan
          </span>
        </div>

        <p
          style={{
            fontSize: 28,
            color: "#a3a3a3",
            margin: 0,
            fontFamily: "sans-serif",
          }}
        >
          AI that hypes YOU up
        </p>

        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 40,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#8b5cf6",
              fontSize: 18,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#8b5cf6",
              }}
            />
            Firecrawl Search
          </div>
          <div style={{ color: "#525252", fontSize: 18 }}>+</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#22c55e",
              fontSize: 18,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            ElevenLabs Voice
          </div>
          <div style={{ color: "#525252", fontSize: 18 }}>+</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#fff",
              fontSize: 18,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#fff",
              }}
            />
            Claude AI
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
