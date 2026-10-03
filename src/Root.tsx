import { AbsoluteFill, Composition, Sequence, useCurrentFrame } from "remotion";
import { Footage, CenterCaptions } from "./Cut";
import captions from "./captions.json";
import { getLayout } from "./editorial";

const R3Captions = () => {
  const f = useCurrentFrame();
  const file = f >= 382 ? "r3born-extra.mp4" : "r3born-source.mp4";
  const sourceFrame = f >= 382 ? f - 382 : f >= 204 ? f - 204 + 267 : f;
  return (
    <CenterCaptions
      pages={captions.r3born}
      top={getLayout(file, sourceFrame).captionY}
    />
  );
};
const UnpackedCaptions = () => {
  const f = useCurrentFrame();
  const file =
    f >= 255
      ? "unpacked-3.mp4"
      : f >= 105
        ? "unpacked-2.mp4"
        : "unpacked-1.mp4";
  const sourceFrame = f >= 255 ? f - 255 : f >= 105 ? f - 105 : f;
  return (
    <CenterCaptions
      pages={captions.unpacked}
      top={getLayout(file, sourceFrame).captionY}
    />
  );
};
const R3born = () => (
  <AbsoluteFill>
    <Sequence name="The legend" durationInFrames={204}>
      <Footage file="r3born-source.mp4" length={204} />
    </Sequence>
    <Sequence name="700 pounds - one handed" from={204} durationInFrames={178}>
      <Footage file="r3born-source.mp4" trimBefore={267} length={178} />
    </Sequence>
    <Sequence name="A new technique" from={382} durationInFrames={270}>
      <Footage file="r3born-extra.mp4" length={270} />
    </Sequence>
    <R3Captions />
  </AbsoluteFill>
);
const Unpacked = () => (
  <AbsoluteFill>
    <Sequence name="No way" durationInFrames={105}>
      <Footage file="unpacked-1.mp4" length={105} />
    </Sequence>
    <Sequence name="One card" from={105} durationInFrames={150}>
      <Footage file="unpacked-2.mp4" length={150} />
    </Sequence>
    <Sequence name="The reaction" from={255} durationInFrames={72}>
      <Footage file="unpacked-3.mp4" length={72} />
    </Sequence>
    <UnpackedCaptions />
  </AbsoluteFill>
);
const LoveCaptions = () => {
  const frame = useCurrentFrame();
  return (
    <CenterCaptions
      pages={captions.love}
      top={getLayout("love-source.mp4", frame).captionY}
    />
  );
};
const LoveAndJustice = () => (
  <AbsoluteFill>
    <Footage file="love-source.mp4" />
    <LoveCaptions />
  </AbsoluteFill>
);
export const RemotionRoot = () => (
  <>
    <Composition
      id="R3born"
      component={R3born}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={652}
    />
    <Composition
      id="Unpacked"
      component={Unpacked}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={327}
    />
    <Composition
      id="LoveAndJustice"
      component={LoveAndJustice}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={339}
    />
  </>
);
