import Pixi from "../../Classes/Pixi";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import SideMenu from "../SideMenu";
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
          title="Filter"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox("osc", e.clientX, e.clientY);
          }}
          title="Oscillator"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox("rec", e.clientX, e.clientY);
          }}
          title="Recording"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox("reverb", e.clientX, e.clientY);
          }}
          title="Reverb"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox("gain", e.clientX, e.clientY);
          }}
          title="Gain"
        />
        <button
          onClick={() => {
            setPlaying(!playing);
          }}
        >
          {playing ? "play" : "pause"}
        </button>
      </SideMenu>
    </main>
  );
};

export default Canvas;
