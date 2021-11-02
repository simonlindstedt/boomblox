import Pixi from '../../Classes/Pixi';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button';

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
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
      <Button
        handleClick={() => {
          pixi.addBox('filter');
        }}
        title="Filter"
      />
      <Button
        handleClick={() => {
          pixi.addBox('osc');
        }}
        title="Oscillator"
      />
      <Button
        handleClick={() => {
          pixi.addBox('rec');
        }}
        title="Recording"
      />
      <Button
        handleClick={() => {
          pixi.addBox('reverb');
        }}
        title="Reverb"
      />
      <Button
        handleClick={() => {
          pixi.addBox('gain');
        }}
        title="Gain"
      />
    </>
  );
};

export default Canvas;
