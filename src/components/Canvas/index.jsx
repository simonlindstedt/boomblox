import Pixi from '../../Classes/Pixi';
import React, { useRef, useEffect, useState } from 'react';
import MenuButton from '../MenuButton';
import SideMenu from '../SideMenu';
import RangeInput from '../RangeInput';
import SettingsPanel from '../SettingsPanel';
import Mediator from '../../Classes/Mediator';
import SequencerPanel from '../SequencerPanel';
import DrumPanel from '../DrumPanel';
import ClearButton from '../ClearButton';
import {
  StyledButtonContainer,
  CanvasWrapper,
  StyledText,
  StyledTitle,
} from './styles';
import HelpButton from '../HelpButton';
import SaveButton from '../PresetButtons/SaveButton';
import UploadButton from '../PresetButtons/UploadButton';

const mediator = new Mediator();
const pixi = new Pixi(mediator);

const Canvas = () => {
  const canvasRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [box, setBox] = useState();
  const [isZero, setIsZero] = useState(false);
  const [oldValue, setOldValue] = useState();
  const [tempo, setTempo] = useState(pixi.clock.tempo);
  const [sequencerStates, setSequencerStates] = useState();
  const [helpIsActive, setHelpIsActive] = useState(false);

  const handleMessages = (e) => {
    if (e.data.box) {
      setBox(null);
      setBox(e.data.box);
    }

    if (e.data.sequencerStates) {
      setSequencerStates(e.data.sequencerStates);
    }
  };
  const revertToPreviousVolume = () => {
    setVolume(oldValue);
    pixi.setMasterVolume(oldValue);
  };

  // On mount
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    pixi.start(canvasRef.current);
    mediator.worker.addEventListener('message', handleMessages);
  }, []);

  useEffect(() => {
    if (playing) {
      pixi.play();
    } else {
      pixi.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (box) {
      pixi.findAndChangeSettings(box);
    }
  }, [box]);

  useEffect(() => {
    if (volume > 0) {
      setIsZero(false);
      setOldValue(volume);
    }
  }, [volume]);

  return (
    <>
      {box && box.type !== 'seq' && box.type !== 'drum' ? (
        <SettingsPanel box={box} setBox={setBox} />
      ) : null}
      {box && box.type === 'seq' ? (
        <SequencerPanel
          box={box}
          setBox={setBox}
          seqState={
            sequencerStates.find((item) => item.belongsTo === box.id)?.step
          }
        />
      ) : null}
      {box && box.type === 'drum' ? (
        <DrumPanel
          box={box}
          setBox={setBox}
          seqState={sequencerStates.filter((item) => item.belongsTo === box.id)}
        />
      ) : null}

      <SideMenu helpIsActive={helpIsActive} setHelpIsActive={setHelpIsActive}>
        <StyledTitle>boomblox</StyledTitle>
        <StyledButtonContainer>
          <StyledText>drag and drop to add to playground</StyledText>
          <MenuButton
            handleMouseUp={(e) => {
              pixi.addBox('filter', e.clientX, e.clientY);
            }}
            isMovable={true}
            title="Filter"
          />
          <MenuButton
            handleMouseUp={(e) => {
              pixi.addBox('osc', e.clientX, e.clientY);
            }}
            isMovable={true}
            title="Oscillator"
          />
          <MenuButton
            handleMouseUp={(e) => {
              pixi.addBox('rec', e.clientX, e.clientY);
            }}
            isMovable={true}
            title="Recording"
          />
          <MenuButton
            handleMouseUp={(e) => {
              pixi.addBox('reverb', e.clientX, e.clientY);
            }}
            isMovable={true}
            title="Reverb"
          />
          <MenuButton
            handleMouseUp={(e) => {
              pixi.addBox('frequency-lfo', e.clientX, e.clientY);
            }}
            isMovable={true}
            title="Frequency LFO"
          />
          <MenuButton
            handleMouseUp={(e) => {
              pixi.addBox('amplitude-lfo', e.clientX, e.clientY);
            }}
            isMovable={true}
            title="Amplitude LFO"
          />
          <MenuButton
            handleMouseUp={(e) => {
              pixi.addBox('seq', e.clientX, e.clientY);
            }}
            isMovable={true}
            title="Sequencer"
          />
          <MenuButton
            handleMouseUp={(e) => {
              pixi.addBox('drum', e.clientX, e.clientY);
            }}
            isMovable={true}
            title="Drumbox"
          />
          <MenuButton
            handleMouseUp={(e) => {
              pixi.addBox('delay', e.clientX, e.clientY);
            }}
            isMovable={true}
            title="Delay"
          />
          <ClearButton
            handleClick={() => {
              const answer = window.confirm('Are you sure?');
              if (answer) {
                pixi.clear();
                pixi.addMasterAndTrash();
                setPlaying(false);
              }
            }}
            title="Clear canvas"
          />

          <SaveButton
            handleClick={() => {
              let date = new Date();
              let name = `preset-${date.toLocaleDateString()}-${date.toLocaleTimeString()}.json`;
              const preset = pixi.savePreset();
              const string =
                'data:text/json;charset=utf-8,' +
                encodeURIComponent(JSON.stringify(preset));
              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', string);
              linkElement.setAttribute('download', name);
              linkElement.click();
              linkElement.remove();
            }}
          />
          <UploadButton
            handleInput={async (e) => {
              const file = e.target.files[0];
              const content = await file.text();
              pixi.loadPreset(JSON.parse(content));
              e.target.value = '';
            }}
          />
        </StyledButtonContainer>
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <HelpButton
            handleClick={() => {
              setHelpIsActive(true);
            }}
            title="Help?"
          />
          <MenuButton
            handleClick={() => {
              setPlaying(!playing);
            }}
            isMovable={false}
            title={playing ? 'Pause' : 'Play'}
            playing={playing}
          />
        </div>
        <RangeInput
          handleChange={(e) => {
            setTempo(e.target.value);
            pixi.clock.setTempo(tempo);
          }}
          tempo={tempo}
          isMaster={false}
        />
        <RangeInput
          handleChange={(e) => {
            setVolume(e.target.value);
            pixi.setMasterVolume(volume);
          }}
          volume={volume}
          isMaster={true}
          isZero={isZero}
          handleClick={() => {
            setIsZero(!isZero);

            if (isZero) {
              revertToPreviousVolume();
            } else {
              setVolume(0);

              pixi.setMasterVolume(0);
            }
          }}
        />
      </SideMenu>
      <CanvasWrapper ref={canvasRef}></CanvasWrapper>
    </>
  );
};

export default Canvas;
