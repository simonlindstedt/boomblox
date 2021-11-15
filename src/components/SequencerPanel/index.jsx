import { useEffect, useState } from 'react';
import { StyledPanelWrapper } from './styles';
import notes from '../../Helpers/middleScale';

const SequencerPanel = ({ box, setBox, seqState }) => {
  const [sequencerStep, setSequencerStep] = useState(seqState);
  const close = () => {
    setBox(null);
  };

  useEffect(() => {
    console.log('seq panel mount');
  }, []);

  useEffect(() => {
    setSequencerStep(seqState);
  }, [seqState]);

  if (sequencerStep === undefined) {
    return null;
  }

  return (
    <StyledPanelWrapper>
      {box.settings.sequence.map((item, key) => {
        return (
          <div key={key}>
            <div>
              <select
                defaultValue={item.value}
                onChange={(e) => {
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
                  box.settings.sequence[key].octave = parseFloat(
                    e.target.value
                  );
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
            </div>
            <input
              type="checkbox"
              defaultChecked={item.play}
              onChange={(e) => {
                box.settings.sequence[key].play = e.target.checked;
                setBox({ ...box });
              }}
            />
            <span style={{ color: key === sequencerStep ? 'red' : 'black' }}>
              Is here
            </span>
          </div>
        );
      })}
      <p>{sequencerStep}</p>
      <select
        onChange={(e) => {
          box.settings.speed = e.target.value;
          setBox({ ...box });
        }}
        defaultValue={box.settings.speed}
      >
        <option value={0.25}>0.25</option>
        <option value={0.5}>0.5</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={4}>4</option>
        <option value={8}>8</option>
        <option value={16}>16</option>
      </select>
      <button
        onClick={() => {
          box.settings.sequence.push({ play: false, value: 220 });
          setBox({ ...box });
        }}
      >
        Add step
      </button>
      <button
        onClick={(e) => {
          box.settings.sequence.pop();
          setBox({ ...box });
        }}
      >
        Remove step
      </button>
      <button onClick={close}>X</button>
    </StyledPanelWrapper>
  );
};

export default SequencerPanel;