import Pixi from "../../Classes/Pixi";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import SideMenu from "../SideMenu";

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  canvas {
    width: 100%;
    height: 100%;
  }
`;

const pixi = new Pixi();

const Canvas = () => {
  const canvasRef = useRef();
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    pixi.start(canvasRef.current);
  }, []);

  useEffect(() => {
    if (playing) {
      pixi.pause();
    } else {
      pixi.play();
    }
  }, [playing]);

  return (
    <main>
      <CanvasWrapper ref={canvasRef} />
    </main>
  );
};

export default Canvas;
