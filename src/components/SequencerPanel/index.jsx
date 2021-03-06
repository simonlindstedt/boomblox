import { useEffect, useState } from 'react';
import { StyledPanelWrapper } from './styles';
import propTypes from 'prop-types';
import Button from '../Button';
import notes from '../../Helpers/middleScale';

const SequencerPanel = ({ box, setBox, seqState }) => {
  const [sequencerStep, setSequencerStep] = useState(seqState);

  const close = () => {
    setBox(null);
  };

  useEffect(() => {
    setSequencerStep(seqState);
  }, [seqState]);

  if (sequencerStep === undefined) {
    return null;
  }

  return (
    <StyledPanelWrapper>
      <div className="controls">
        <select
          onChange={(e) => {
            box.settings.reset = false;
            box.settings.speed = e.target.value;
            setBox({ ...box });
          }}
          defaultValue={box.settings.speed}
        >
          <option value={0.0625}>4 bars</option>
          <option value={0.125}>2 bars</option>
          <option value={0.25}>1 bars</option>
          <option value={0.5}>1 / 2</option>
          <option value={1}>1 / 4</option>
          <option value={2}>1 / 8</option>
          <option value={4}>1 / 16</option>
          <option value={8}>1 / 32</option>
        </select>
        <Button
          handleClick={() => {
            box.settings.reset = false;
            box.settings.sequence.push({ play: false, value: 440, octave: 1 });
            setBox({ ...box });
          }}
        >
          Add step
        </Button>
        <Button
          handleClick={() => {
            box.settings.reset = false;
            box.settings.sequence.pop();
            setBox({ ...box });
          }}
        >
          Remove step
        </Button>
        <Button
          handleClick={() => {
            box.settings.reset = true;
            setBox({ ...box });
          }}
        >
          Reset
        </Button>
        <Button
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          handleClick={close}
        >
          X
        </Button>
      </div>
      {box.settings.sequence.map((item, key) => {
        return (
          <div key={key} className="step">
            <select
              defaultValue={item.value}
              onChange={(e) => {
                box.settings.reset = false;
                box.settings.sequence[key].value = parseFloat(e.target.value);
                setBox({ ...box });
              }}
            >
              {notes.map((note, key) => {
                return (
                  <option key={key} value={note.freq}>
                    {note.name}
                  </option>
                );
              })}
            </select>
            <select
              defaultValue={item.octave}
              onChange={(e) => {
                box.settings.reset = false;
                box.settings.sequence[key].octave = parseFloat(e.target.value);
                setBox({ ...box });
              }}
            >
              <option value={1 / 32}>-5</option>
              <option value={1 / 16}>-4</option>
              <option value={1 / 8}>-3</option>
              <option value={1 / 4}>-2</option>
              <option value={1 / 2}>-1</option>
              <option value={1}>0</option>
              <option value={2}>+1</option>
              <option value={4}>+2</option>
              <option value={8}>+3</option>
              <option value={16}>+4</option>
              <option value={32}>+5</option>
            </select>
            <input
              type="checkbox"
              style={{
                border: `2px solid ${
                  key === sequencerStep ? '#FB6A4A' : 'black'
                }`,
              }}
              defaultChecked={item.play}
              onChange={(e) => {
                box.settings.reset = false;
                box.settings.sequence[key].play = e.target.checked;
                setBox({ ...box });
              }}
            />
          </div>
        );
      })}
    </StyledPanelWrapper>
  );
};

SequencerPanel.propTypes = {
  setBox: propTypes.func,
  box: propTypes.object,
  seqState: propTypes.array,
};

export default SequencerPanel;
