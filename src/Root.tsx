import { AbsoluteFill, Composition, Sequence, useCurrentFrame } from "remotion";
import { Footage, CenterCaptions } from "./Cut";
import captions from "./captions.json";

const R3Captions = () => <CenterCaptions pages={captions.r3born} />;
const UnpackedCaptions = () => {
  const frame = useCurrentFrame();
  return (
    <CenterCaptions
      pages={captions.unpacked}
      full={frame >= 126 && frame <= 180}
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
    <Sequence name="A new technique" from={382} durationInFrames={270}>
      <Footage file="r3born-extra.mp4" landscape length={270} />
    </Sequence>
    <R3Captions />
  </AbsoluteFill>
);
const Unpacked = () => (
  <AbsoluteFill>
    <Sequence name="No way" durationInFrames={105}>
      <Footage kind="unpacked" file="unpacked-1.mp4" length={105} />
    </Sequence>
    <Sequence name="One card" from={105} durationInFrames={150}>
      <Footage kind="unpacked" file="unpacked-2.mp4" length={150} />
    </Sequence>
    <Sequence name="The reaction" from={255} durationInFrames={72}>
      <Footage kind="unpacked" file="unpacked-3.mp4" length={72} />
    </Sequence>
    <UnpackedCaptions />
  </AbsoluteFill>
);
const LoveCaptions = () => {
  const frame = useCurrentFrame();
  return <CenterCaptions pages={captions.love} full={frame >= 260} />;
};
const LoveAndJustice = () => (
  <AbsoluteFill>
    <Footage kind="love" file="love-source.mp4" />
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
