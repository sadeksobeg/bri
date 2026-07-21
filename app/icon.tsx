import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "50%",
          border: "2px solid #c9a961",
          boxShadow: "0 4px 20px rgba(201, 169, 97, 0.3)",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#c9a961",
            letterSpacing: "0.1em",
          }}
        >
          B
        </div>
      </div>
    ),
    { ...size }
  );
}
