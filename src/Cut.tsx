import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { Video } from "@remotion/media";
import { loadFont } from "@remotion/fonts";
import type { Caption } from "@remotion/captions";

loadFont({
  family: "Barlow Condensed",
  url: staticFile("fonts/BarlowCondensed-ExtraBold.ttf"),
  weight: "800",
});
export type CaptionPage = { words: Caption[]; top?: number };
export const CenterCaptions: React.FC<{
  pages: CaptionPage[];
  full?: boolean;
}> = ({ pages, full = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const page = pages.find(
    (p, i) =>
      ms >= p.words[0].startMs &&
      ms <
        Math.min(
          p.words[p.words.length - 1].endMs + 160,
          pages[i + 1]?.words[0].startMs ?? Infinity,
        ),
  );
  if (!page) return null;
  const age = ((ms - page.words[0].startMs) / 1000) * fps;
  const count = page.words.map((w) => w.text.trim()).join(" ").length;
  const size = count <= 12 ? 142 : count <= 20 ? 120 : count <= 28 ? 106 : 94;
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        width: 920,
        top: full ? 1530 : 980,
        transform: `translateY(-50%) scale(${interpolate(age, [0, 4, 7], [0.96, 1.015, 1], { extrapolateRight: "clamp" })})`,
        textAlign: "center",
        fontFamily: "Barlow Condensed",
        fontWeight: 800,
        fontSize: size,
        lineHeight: 0.98,
        letterSpacing: 0.4,
        color: "white",
        textTransform: "uppercase",
        WebkitTextStroke: "5px #101014",
        paintOrder: "stroke fill",
        textShadow: "0 7px 8px #0008",
      }}
    >
      {page.words.map((word, i) => {
        const active = ms >= word.startMs && ms < word.endMs;
        const wordAge = ((ms - word.startMs) / 1000) * fps;
        return (
          <React.Fragment key={i}>
            <span
              style={{
                display: "inline-block",
                color: active ? "#FFE34D" : "#FFFFFF",
                transform: active
                  ? `scale(${interpolate(wordAge, [0, 3, 6], [0.96, 1.045, 1], { extrapolateRight: "clamp" })})`
                  : undefined,
              }}
            >
              {word.text.trim()}
            </span>
            {i < page.words.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const Footage: React.FC<{
  file: string;
  landscape?: boolean;
  trimBefore?: number;
  length?: number;
  kind?: "r3born" | "unpacked" | "love";
}> = ({ file, landscape = false, trimBefore = 0, length, kind = "r3born" }) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const durationInFrames = length ?? config.durationInFrames;
  const sourceTime = (frame + trimBefore) / config.fps;
  const full =
    (file === "unpacked-2.mp4" && frame >= 21 && frame <= 75) ||
    (kind === "love" && frame >= 260);
  const crop =
    file === "r3born-extra.mp4"
      ? frame < 45
        ? 42
        : frame < 105
          ? 58
          : 60
      : sourceTime >= 12.75
        ? 66
        : sourceTime >= 8.2 && sourceTime < 10.9
          ? 62
          : sourceTime >= 3.6 && sourceTime < 5
            ? 65
            : 50;
  const upperY =
    kind === "unpacked"
      ? file === "unpacked-3.mp4" && frame >= 39
        ? 48
        : 18
      : kind === "love"
        ? frame >= 260
          ? 42
          : 28
        : 50;
  const motion = interpolate(frame, [0, durationInFrames - 1], [1, 1.025], {
    extrapolateRight: "clamp",
  });
  const video = (muted: boolean, pos: string, scale: number) => (
    <Video
      name={
        muted ? "Synchronized detail" : "Official trailer audio and picture"
      }
      src={staticFile(file)}
      trimBefore={trimBefore}
      durationInFrames={durationInFrames}
      muted={muted}
      objectFit="cover"
      style={{
        width: "100%",
        height: "100%",
        objectPosition: pos,
        transform: `scale(${scale})`,
      }}
    />
  );
  return (
    <AbsoluteFill style={{ backgroundColor: "#0D0E12", overflow: "hidden" }}>
      {full ? (
        video(false, "50% 50%", 1)
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              inset: "0 0 auto",
              height: 848,
              overflow: "hidden",
            }}
          >
            {video(
              false,
              landscape ? `${crop}% 45%` : `50% ${upperY}%`,
              motion,
            )}
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 1112,
              bottom: 0,
              overflow: "hidden",
            }}
          >
            {video(
              true,
              landscape ? `${crop}% 65%` : `50% ${kind === "love" ? 70 : 90}%`,
              landscape ? 1.26 * motion : motion,
            )}
          </div>
          <div
            style={{
              position: "absolute",
              left: 64,
              right: 64,
              top: 865,
              height: 3,
              background: "#FFFFFF30",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 64,
              top: 865,
              width: interpolate(frame, [0, durationInFrames], [60, 952]),
              height: 3,
              background: "#FFE34D",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 64,
              right: 64,
              top: 1092,
              height: 3,
              background: "#FFFFFF30",
            }}
          />
        </>
      )}
    </AbsoluteFill>
  );
};
