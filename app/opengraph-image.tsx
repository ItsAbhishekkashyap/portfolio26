import { ImageResponse } from "next/og";

// Edge runtime: @vercel/og's Node build can't resolve paths containing spaces on Windows.
export const runtime = "edge";
export const alt = "Abhishek Gond, AI & GenAI engineer and full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const photo = await fetch(new URL("./og-photo.jpg", import.meta.url)).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1b1c20", color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 64px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, color: "#9a9da6" }}>© Code by Abhishek</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 104, letterSpacing: -4, lineHeight: 1 }}>Abhishek Gond</div>
            <div style={{ fontSize: 38, color: "#c9cbd1", marginTop: 22 }}>AI &amp; GenAI engineer, full-stack developer</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#45e07a" }} />
            Open to 2027 SDE and AI engineering roles
          </div>
        </div>
        <div style={{ width: 430, display: "flex", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo as unknown as string} width={430} height={671} style={{ objectFit: "cover" }} alt="" />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(90deg, #1b1c20, rgba(27,28,32,0))" }} />
          <div style={{ position: "absolute", right: 40, bottom: 48, width: 120, height: 120, borderRadius: 60, background: "#3355ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>Hire me</div>
        </div>
      </div>
    ),
    size
  );
}
