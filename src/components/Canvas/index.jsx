import Pixi from "../../Classes/Pixi";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const CanvasWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  canvas {
    width: 100%;
    height: 100%;
  }
`;

const Canvas = () => {
  const pixiRef = useRef();

  useEffect(() => {
    const pixi = new Pixi(pixiRef.current);
    pixi.start();
  }, []);

  return <CanvasWrapper ref={pixiRef}></CanvasWrapper>;
};

export default Canvas;
