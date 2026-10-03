import { interpolate } from "remotion";

export type Crop = { x: number; y: number; width: number; height: number };
export type Layout =
  | { mode: "single"; crop: Crop; captionY: number }
  | { mode: "split"; upper: Crop; lower: Crop; captionY: number };
const panel = (x: number, y: number, width: number): Crop => ({
  x,
  y,
  width,
  height: (width * 960) / 1080,
});
const portrait: Crop = { x: 0, y: 0, width: 1080, height: 1920 };
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Source-frame ranges are half-open. Both panels always share this source frame.
// Split crops isolate different people visible in the SAME original frame.
export const getLayout = (file: string, frame: number): Layout => {
  if (file === "unpacked-1.mp4") {
    if (frame >= 53 && frame < 72)
      return {
        mode: "split",
        upper: panel(0, 210, 640),
        lower: panel(440, 180, 640),
        captionY: 960,
      };
    return {
      mode: "single",
      crop: portrait,
      captionY: frame >= 72 ? 1030 : 1140,
    };
  }
  if (file === "unpacked-2.mp4") {
    if (frame >= 100 && frame < 124)
      return {
        mode: "split",
        upper: panel(0, 430, 600),
        lower: panel(500, 360, 580),
        captionY: 960,
      };
    return {
      mode: "single",
      crop: portrait,
      captionY:
        frame >= 30 && frame < 87
          ? 1500
          : frame >= 87 && frame < 135
            ? 1010
            : 1140,
    };
  }
  if (file === "unpacked-3.mp4")
    return {
      mode: "single",
      crop: portrait,
      captionY: frame < 39 ? 1090 : 1540,
    };
  if (file === "love-source.mp4")
    return {
      mode: "single",
      crop: portrait,
      captionY: frame >= 210 ? 1480 : 1140,
    };
  if (file === "r3born-source.mp4" && frame >= 36 && frame < 62) {
    return {
      mode: "split",
      upper: panel(690, interpolate(frame, [36, 73], [145, 290], clamp), 430),
      lower: panel(1100, interpolate(frame, [36, 73], [100, 260], clamp), 550),
      captionY: 1030,
    };
  }
  let center = 960;
  if (file === "r3born-extra.mp4")
    center = frame < 45 ? 855 : frame < 105 ? 1065 : 1090;
  else if (frame >= 383) center = 1170;
  else if (frame >= 267 && frame < 328) center = 1120;
  else if (frame >= 108 && frame < 150) center = 1150;
  return {
    mode: "single",
    crop: { x: center - 303.75, y: 0, width: 607.5, height: 1080 },
    captionY: file === "r3born-source.mp4" && frame >= 383 ? 1400 : 1140,
  };
};
