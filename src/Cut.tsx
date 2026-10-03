import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { Video, Audio } from "@remotion/media";
import { getLayout, type Crop } from "./editorial";
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
  top: number;
}> = ({ pages, top }) => {
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
  const size = count <= 12 ? 112 : count <= 20 ? 100 : count <= 28 ? 90 : 82;
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        width: 920,
        top,
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
        const emphasized =
          !/^(a|an|the|is|was|he|in|to|and|of|for|it|has|this|so|had|my)$/i.test(
            word.text.trim().replace(/[.,!?]/g, ""),
          );
        const active = emphasized && ms >= word.startMs && ms < word.endMs;
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
  trimBefore?: number;
  length?: number;
}> = ({ file, trimBefore = 0, length }) => {
  const frame = useCurrentFrame();
  const { durationInFrames: total } = useVideoConfig();
  const durationInFrames = length ?? total;
  const layout = getLayout(file, frame + trimBefore);
  const landscape = file.startsWith("r3born");
  const sourceWidth = landscape ? 1920 : 1080;
  const sourceHeight = landscape ? 1080 : 1920;
  const panel = (crop: Crop, top: number, height: number, label: string) => {
    const scale = 1080 / crop.width;
    return (
      <div
        style={{
          position: "absolute",
          top,
          left: 0,
          width: 1080,
          height,
          overflow: "hidden",
        }}
      >
        <Video
          name={label}
          src={staticFile(file)}
          muted
          trimBefore={trimBefore}
          durationInFrames={durationInFrames}
          style={{
            position: "absolute",
            width: sourceWidth * scale,
            height: sourceHeight * scale,
            left: -crop.x * scale,
            top: -crop.y * scale,
          }}
        />
      </div>
    );
  };
  return (
    <AbsoluteFill style={{ backgroundColor: "#08090B", overflow: "hidden" }}>
      <Audio
        name="Single original audio track"
        src={staticFile(file)}
        trimBefore={trimBefore}
        durationInFrames={durationInFrames}
      />
      {layout.mode === "single" ? (
        panel(layout.crop, 0, 1920, "Original scene")
      ) : (
        <>
          {panel(layout.upper, 0, 960, "Participant A — same source frame")}
          {panel(layout.lower, 960, 960, "Participant B — same source frame")}
          <div
            style={{
              position: "absolute",
              top: 958,
              left: 0,
              right: 0,
              height: 4,
              backgroundColor: "#FFFFFFB0",
            }}
          />
        </>
      )}
    </AbsoluteFill>
  );
};
