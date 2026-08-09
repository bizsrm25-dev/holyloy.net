import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "HolyLoy. Loyalty is royalty.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#FAF8F6",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 92,
            fontWeight: 700,
            color: "#121212",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          Loyalty is
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 700,
            color: "#DC0000",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          royalty.
        </div>
      </div>
    ),
    size,
  );
}
