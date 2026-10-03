import { AbsoluteFill, Composition, Sequence, useCurrentFrame } from "remotion";
import { Footage, CenterCaptions } from "./Cut";
import captions from "./captions.json";

const R3Captions = () => {
  const frame = useCurrentFrame();
  return (
    <CenterCaptions pages={captions.r3born} top={frame >= 320 ? 1370 : 1130} />
  );
};
const UnpackedCaptions = () => {
  const frame = useCurrentFrame();
  return (
    <CenterCaptions
      pages={captions.unpacked}
      top={frame >= 294 ? 1560 : frame >= 126 && frame <= 180 ? 1510 : 1100}
    />
  );
};
const R3born = () => (
  <AbsoluteFill>
    <Sequence name="The legend" durationInFrames={204}>
      <Footage file="r3born-source.mp4" landscape length={204} />
    </Sequence>
    <Sequence name="700 pounds - one handed" from={204} durationInFrames={178}>
      <Footage
        file="r3born-source.mp4"
        landscape
        trimBefore={267}
        length={178}
      />
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
    <CenterCaptions pages={captions.love} top={frame >= 210 ? 1490 : 1150} />
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
      durationInFrames={382}
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

