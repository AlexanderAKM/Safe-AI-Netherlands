import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default async function Icon() {
  const logoPath = path.join(process.cwd(), "public", "sain-symbol.svg");
  const svg = await readFile(logoPath, "utf-8");
  const svgBase64 = Buffer.from(svg).toString("base64");
  const svgDataUri = `data:image/svg+xml;base64,${svgBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <img
          src={svgDataUri}
          alt="Safe AI Netherlands logo"
          width="32"
          height="32"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    ),
    size,
  );
}
