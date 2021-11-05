import Pixi from "../../Classes/Pixi";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import SideMenu from "../SideMenu";
import RangeInput from "../RangeInput";
import SettingsPanel from "../SettingsPanel";
import Mediator from "../../Classes/Mediator";

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  canvas {
    width: 100%;
    height: 100%;
  }
`;

const mediator = new Mediator();
const pixi = new Pixi(mediator);

const Canvas = () => {
  const canvasRef = useRef();
  const [playing, setPlaying] = useState(true);
  const [tempo, setTempo] = useState("30");
  const [box, setBox] = useState();

  const handleMessages = (e) => {
    if (e.data.box) {
      setBox(e.data.box);
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
      console.log(box);
      pixi.findAndChangeSettings(box);
    }
  }, [box]);

  return (
    <main>
      {box ? <SettingsPanel box={box} setBox={setBox} /> : null}
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
          title="f-lfo"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox("amplitude-lfo", e.clientX, e.clientY);
          }}
          isMovable={true}
          title="a-lfo"
        />
        <Button
          handleClick={() => {
            setPlaying(!playing);
          }}
          isMovable={false}
          title={playing ? "Play" : "Pause"}
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
