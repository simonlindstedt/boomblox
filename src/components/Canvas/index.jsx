import Pixi from "../../Classes/Pixi";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import SideMenu from "../SideMenu";
import RangeInput from "../RangeInput";
import SettingsPanel from "../SettingsPanel";
import GlobalWorker from "./GlobalWorker?worker";

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  canvas {
    width: 100%;
    height: 100%;
  }
`;

const globalWorker = new GlobalWorker();
const pixi = new Pixi(globalWorker);

const Canvas = () => {
  const canvasRef = useRef();
  const [playing, setPlaying] = useState(true);
  const [tempo, setTempo] = useState("30");
  const [box, setBox] = useState("");

  const handleMessages = (e) => {
    if (e.data.box) {
      setBox(e.data.box);
    }
  };

  // On mount
  useEffect(() => {
    pixi.start(canvasRef.current);
    globalWorker.addEventListener("message", handleMessages);
  }, []);

  useEffect(() => {
    if (playing) {
      pixi.pause();
    } else {
      pixi.play();
    }
  }, [playing, box]);

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
