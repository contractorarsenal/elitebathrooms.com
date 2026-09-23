import { ImageResponse } from "next/og";

export const alt = "Elite Bathrooms: Tacoma Bathroom Remodeling Specialists";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded text card, not a fabricated photo — real project photography
// replaces this once available.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#121316",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: "#C79B67", letterSpacing: 4 }}>
          TACOMA-BASED BATHROOM SPECIALISTS
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 76,
            fontWeight: 800,
            color: "#F7F5F0",
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          Elite Bathrooms
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#A3A7AD", display: "flex" }}>
          Built right from the studs out.
        </div>
      </div>
    ),
    { ...size }
  );
}
