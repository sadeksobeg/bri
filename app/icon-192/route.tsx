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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b1a3d 0%, #152a52 100%)",
          borderRadius: "20%",
          border: "3px solid #c9a961",
          boxShadow: "0 4px 16px rgba(201, 169, 97, 0.3)",
        }}
      >
        <span
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: "#c9a961",
            letterSpacing: "0.05em",
          }}
        >
          B
        </span>
      </div>
    ),
    {
      width: 192,
      height: 192,
    }
  );
}
