import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
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
          background: "linear-gradient(135deg, #0b1a3d 0%, #1a2f5a 50%, #0b1a3d 100%)",
          fontFamily: "system-ui",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(201, 169, 97, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)
            `,
          }}
        />

        {/* Border decoration */}
        <div
          style={{
            position: "absolute",
            inset: 20,
            border: "2px solid rgba(201, 169, 97, 0.3)",
            borderRadius: 40,
          }}
        />

        {/* Logo circle */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #c9a961 0%, #d4b978 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 120,
              fontWeight: "bold",
              color: "#0b1a3d",
              letterSpacing: "-0.05em",
            }}
          >
            B
          </span>
        </div>

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#c9a961",
              letterSpacing: "0.2em",
            }}
          >
            BRIVIA
          </span>
          <span
            style={{
              fontSize: 28,
              color: "rgba(255, 255, 255, 0.8)",
              letterSpacing: "0.1em",
            }}
          >
            حلويات فاخرة
          </span>
        </div>

        {/* Decorative divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 40,
          }}
        >
          <div
            style={{
              width: 100,
              height: 1,
              background: "linear-gradient(to right, transparent, #c9a961)",
            }}
          />
          <span style={{ fontSize: 24, color: "#c9a961" }}>✦</span>
          <div
            style={{
              width: 100,
              height: 1,
              background: "linear-gradient(to left, transparent, #c9a961)",
            }}
          />
        </div>

        {/* Tagline */}
        <span
          style={{
            marginTop: 30,
            fontSize: 20,
            color: "rgba(245, 240, 230, 0.7)",
          }}
        >
          من سوريا إلى قلبك
        </span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
