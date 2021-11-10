import Pixi from "../../Classes/Pixi";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import SideMenu from "../SideMenu";
import RangeInput from "../RangeInput";
import SettingsPanel from "../SettingsPanel";
import Mediator from "../../Classes/Mediator";
import SequencerPanel from "../SequencerPanel";

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const mediator = new Mediator();
const pixi = new Pixi(mediator);

const Canvas = () => {
  const canvasRef = useRef();
  const [playing, setPlaying] = useState(true);
  const [tempo, setTempo] = useState(pixi.clock.tempo);
  const [box, setBox] = useState();
  const [sequencerStates, setSequencerStates] = useState();

  const handleMessages = (e) => {
    if (e.data.box) {
      setBox(e.data.box);
    }
    if (e.data.sequencerStates) {
      setSequencerStates(e.data.sequencerStates);
    }
  };

  // On mount
  useEffect(() => {
    pixi.start(canvasRef.current);
    mediator.worker.addEventListener("message", handleMessages);
  }, []);

  useEffect(() => {
    if (playing) {
      pixi.pause();
    } else {
      pixi.play();
    }
  }, [playing]);

  useEffect(() => {
    if (box) {
      pixi.findAndChangeSettings(box);
    }
  }, [box]);

  return (
    <main>
      {box && box.type !== "seq" ? (
        <SettingsPanel box={box} setBox={setBox} />
      ) : null}
      {box && box.type === "seq" ? (
        <SequencerPanel
          box={box}
          setBox={setBox}
          step={sequencerStates.find((item) => item.id === box.id).step}
        />
      ) : null}
      <CanvasWrapper ref={canvasRef}></CanvasWrapper>
      <SideMenu>
        <Button
          handleMouseUp={(e) => {
            pixi.addBox("filter", e.clientX, e.clientY);
          }}
          isMovable={true}
          title="Filter"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox("osc", e.clientX, e.clientY);
          }}
          isMovable={true}
          title="Oscillator"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox("rec", e.clientX, e.clientY);
          }}
          isMovable={true}
          title="Recording"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox("reverb", e.clientX, e.clientY);
          }}
          isMovable={true}
          title="Reverb"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox("frequency-lfo", e.clientX, e.clientY);
          }}
          isMovable={true}
          title="Frequency LFO"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox("amplitude-lfo", e.clientX, e.clientY);
          }}
          isMovable={true}
          title="Amplitude LFO"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox("seq", e.clientX, e.clientY);
          }}
          isMovable={true}
          title="Sequencer"
        />
        <Button
          handleClick={() => {
            setPlaying(!playing);
          }}
          isMovable={false}
          title={playing ? "Play" : "Pause"}
          playing={playing}
        />
        <RangeInput
          handleChange={(e) => {
            setTempo(e.target.value);
            pixi.clock.setTempo(tempo);
          }}
          tempo={tempo}
        />
      </SideMenu>
    </main>
  );
};

export default Canvas;
