import Pixi from '../../Classes/Pixi';
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import SideMenu from '../SideMenu';
import RangeInput from '../RangeInput';

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
  const [tempo, setTempo] = useState('30');

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
          isMovable={true}
          title="Filter"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox('osc', e.clientX, e.clientY);
          }}
          isMovable={true}
          title="Oscillator"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox('rec', e.clientX, e.clientY);
          }}
          isMovable={true}
          title="Recording"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox('reverb', e.clientX, e.clientY);
          }}
          isMovable={true}
          title="Reverb"
        />
        <Button
          handleMouseUp={(e) => {
            pixi.addBox('gain', e.clientX, e.clientY);
          }}
          isMovable={true}
          title="Gain"
        />
        <Button
          handleClick={() => {
            setPlaying(!playing);
          }}
          isMovable={false}
          title={playing ? 'Play' : 'Pause'}
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
