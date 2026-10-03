import { bundle } from "@remotion/bundler";
import { selectComposition, renderMedia } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";
const out = path.resolve(process.env.OUTPUT_DIR || "out");
fs.mkdirSync(out, { recursive: true });
const browserExecutable = process.env.CHROME_PATH || undefined;
const serveUrl = await bundle({
  entryPoint: path.resolve("src/index.ts"),
  outDir: path.resolve(".cache/bundle"),
});
for (const [id, file] of [
  ["R3born", "01-r3born.mp4"],
  ["Unpacked", "02-unpacked.mp4"],
  ["LoveAndJustice", "03-love-and-justice.mp4"],
]) {
  if (process.argv.length > 2 && !process.argv.slice(2).includes(id)) continue;
  const composition = await selectComposition({
    serveUrl,
    id,
    browserExecutable,
  });
  let last = -1;
  await renderMedia({
    serveUrl,
    composition,
    browserExecutable,
    outputLocation: path.join(out, file),
    codec: "h264",
    audioCodec: "aac",
    audioBitrate: "192k",
    crf: 18,
    x264Preset: "fast",
    pixelFormat: "yuv420p",
    concurrency: 2,
    timeoutInMilliseconds: 120000,
    onProgress: ({ progress }) => {
      const n = Math.floor(progress * 10);
      if (n !== last) {
        last = n;
        console.log(`${id}: ${n * 10}%`);
      }
    },
  });
  console.log(`Saved ${file}`);
}
