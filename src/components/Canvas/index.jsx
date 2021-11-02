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
  const canvasRef = useRef();
  let pixi = null;

  useEffect(() => {
    pixi = new Pixi();
    pixi.start(canvasRef.current);
  }, [canvasRef]);

  return (
    <>
      <CanvasWrapper ref={canvasRef}></CanvasWrapper>
    </>
  );
};

export default Canvas;
