import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HypeMan - AI that hypes YOU up";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
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
            width: 800,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 60%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 60%)",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {[500, 650, 800].map((s, i) => (
          <div
            key={s}
            style={{
              position: "absolute",
              width: s,
              height: s,
              borderRadius: "50%",
              border: `1px solid rgba(139,92,246,${0.08 - i * 0.02})`,
              top: "42%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #22c55e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 60px rgba(139,92,246,0.3), 0 0 120px rgba(34,197,94,0.15)",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
              <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
              <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
            </svg>
          </div>

          <span
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-3px",
              fontFamily: "monospace",
            }}
          >
            HypeMan
          </span>
        </div>

        <p
          style={{
            fontSize: 32,
            color: "#a3a3a3",
            margin: 0,
            marginBottom: 48,
            fontFamily: "sans-serif",
            letterSpacing: "-0.5px",
          }}
        >
          Scrapes your digital footprint. Pitches you like a rockstar.
        </p>

        <div
          style={{
            display: "flex",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <svg width="32" height="40" viewBox="0 0 50 72" fill="none">
              <path
                d="M41.7154 23.1929C38.9531 24.0129 36.8707 25.8677 35.3457 27.8826C35.0183 28.3151 34.3358 27.9901 34.4658 27.4601C37.3856 15.4534 33.5283 5.47401 21.5039 0.561817C20.894 0.311833 20.259 0.859299 20.419 1.49926C25.8887 23.4604 2.88236 21.608 5.78971 46.504C5.83971 46.9314 5.35973 47.2239 5.00975 46.9739C3.9198 46.1915 2.70237 44.5591 1.86741 43.4116C1.62242 43.0742 1.09245 43.1692 0.979951 43.5716C0.314984 45.9765 0 48.2413 0 50.4912C0 59.2407 4.49727 66.9427 11.3044 71.4074C11.6944 71.6624 12.1944 71.2974 12.0619 70.8499C11.7119 69.675 11.5144 68.4351 11.4994 67.1527C11.4994 66.3652 11.5494 65.5603 11.6719 64.8103C11.9569 62.9254 12.6119 61.1305 13.7118 59.4957C17.4841 53.8335 25.0462 48.3638 23.8388 40.9368C23.7613 40.4668 24.3163 40.1569 24.6663 40.4793C29.9935 45.3465 31.0485 51.8936 30.1735 57.7658C30.0985 58.2757 30.7385 58.5482 31.061 58.1482C31.8759 57.1283 32.8709 56.2334 33.9533 55.5609C34.2233 55.3934 34.5833 55.5209 34.6858 55.8209C35.2882 57.5733 36.1832 59.2182 37.0281 60.8631C38.0381 62.8404 38.5756 65.0978 38.4906 67.4877C38.4481 68.6501 38.2556 69.775 37.9331 70.8449C37.7956 71.2974 38.2906 71.6749 38.6881 71.4149C45.5002 66.9502 50 59.2482 50 50.4937C50 47.4514 49.4675 44.4691 48.4601 41.6743C46.3477 35.8121 40.988 31.4099 42.3429 23.7704C42.4079 23.4054 42.0704 23.0879 41.7154 23.1929Z"
                fill="#FA5D19"
              />
            </svg>
            <span style={{ fontSize: 28, color: "#fff", fontWeight: 600, fontFamily: "sans-serif" }}>
              Firecrawl
            </span>
          </div>

          <div style={{ color: "#404040", fontSize: 32 }}>+</div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <svg width="28" height="44" viewBox="0 0 55 89" fill="none">
              <path d="M0 0H18.413V88.5124H0V0Z" fill="#FFFFFF" />
              <path d="M36.5788 0H54.9917V88.5124H36.5788V0Z" fill="#FFFFFF" />
            </svg>
            <span style={{ fontSize: 28, color: "#fff", fontWeight: 600, fontFamily: "sans-serif" }}>
              ElevenLabs
            </span>
          </div>

        </div>
      </div>
    ),
    { ...size }
  );
}
