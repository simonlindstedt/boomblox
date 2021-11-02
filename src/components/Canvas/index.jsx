import Pixi from '../../Classes/Pixi';
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import SideMenu from '../SideMenu';

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
      <CanvasWrapper ref={canvasRef}></CanvasWrapper>
      <SideMenu>
        <Button
          handleMouseUp={(e) => {
            pixi.addBox('filter', e.clientX, e.clientY);
          }}
          title="Filter"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox('osc', e.clientX, e.clientY);
          }}
          title="Oscillator"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox('rec', e.clientX, e.clientY);
          }}
          title="Recording"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox('reverb', e.clientX, e.clientY);
          }}
          title="Reverb"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox('gain', e.clientX, e.clientY);
          }}
          title="Gain"
        />
      </SideMenu>
    </main>
  );
};

export default Canvas;
