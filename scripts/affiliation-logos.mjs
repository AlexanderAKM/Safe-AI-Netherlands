/**
 * Alpha masks for the landing's affiliations strip.
 *
 * The logos arrive in different forms: black on off-white (ERO), black on
 * transparent (BlueDot), white type knocked out of a navy box (HIP), black
 * vector on white (Aithos, exported from its PDF to SVG), and a
 * multicoloured mark on transparent (ELLIS). The strip draws
 * every logo in one muted navy through a CSS mask, so each source is reduced
 * to a single alpha channel here:
 *
 *   - "ink": flatten onto white, then darkness becomes opacity. Dark marks
 *     turn solid, a light ground turns clear, and HIP's white lettering stays
 *     a cut-out in its box.
 *   - "alpha": keep the source's own transparency. ELLIS needs this, because
 *     its bright letters would fade to almost nothing as "ink".
 *
 * Sources sit beside the output as `<name>-source.*` and are never modified.
 * Output is trimmed to the mark and written 160px tall, enough for a 2x
 * screen at the strip's tallest logo.
 *
 *   node scripts/affiliation-logos.mjs
 */

import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve(import.meta.dirname, "..", "public", "logos", "affiliations");
const HEIGHT = 160;

const LOGOS = [
  { name: "ellis", source: "../ellis.svg", mode: "alpha" },
  { name: "ero", source: "ero-source.jpeg", mode: "ink" },
  { name: "bluedot", source: "bluedot-source.png", mode: "ink" },
  { name: "hip", source: "hip-source.svg", mode: "ink" },
  { name: "aithos", source: "aithos-source.svg", mode: "ink" },
];

for (const logo of LOGOS) {
  const input = sharp(path.join(DIR, logo.source), { density: 300 });
  let alpha;
  if (logo.mode === "alpha") {
    alpha = await input.ensureAlpha().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
  } else {
    alpha = await input
      .flatten({ background: "#ffffff" })
      .greyscale()
      .negate()
      // Lift the faint off-white of a JPEG ground to fully clear.
      .linear(1.15, -18)
      .toColourspace("b-w")
      .raw()
      .toBuffer({ resolveWithObject: true });
  }
  const { width, height } = alpha.info;
  // Solid black carrying the mask as its alpha: only the alpha is ever read.
  const out = await sharp({
    create: { width, height, channels: 3, background: "#000000" },
  })
    .joinChannel(alpha.data, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
  const trimmed = await sharp(out).trim({ threshold: 1 }).toBuffer();
  const file = path.join(DIR, `${logo.name}.png`);
  const info = await sharp(trimmed).resize({ height: HEIGHT }).png({ compressionLevel: 9 }).toFile(file);
  console.log(`${logo.name}.png  ${info.width}x${info.height}  aspect ${(info.width / info.height).toFixed(3)}`);
}
