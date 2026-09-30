import { ImageResponse } from "next/og";

export const alt = "Elite Bathrooms: Greater Seattle Area Bathroom Remodeling Specialists";
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
          background: "#25272E",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: "#B98A64", letterSpacing: 4 }}>
          GREATER SEATTLE AREA SPECIALISTS
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 76,
            fontWeight: 800,
            color: "#F1F0F5",
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
