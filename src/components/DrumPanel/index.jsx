import { StyledPanelWrapper } from './styles';
import { useEffect, useState } from 'react';

const names = ['HiHat', 'Kick', 'Clap', 'Cowbell'];

const DrumPanel = ({ box, setBox, seqState }) => {
  const [sequencerSteps, setSequencerSteps] = useState(seqState);
  const close = () => {
    setBox(null);
  };

  useEffect(() => {
    setSequencerSteps(seqState);
  }, [seqState]);

  return (
    <StyledPanelWrapper>
      <p>Volume</p>
      <input
        type="range"
        min={0.0}
        max={1.0}
        step={0.001}
        defaultValue={box.settings.volume}
        onChange={(e) => {
          box.settings.volume = parseFloat(e.target.value);
          setBox({ ...box });
        }}
      />
      <p>{box.settings.volume}</p>
      {box.settings.sequences.map((sequence, key) => {
        return (
          <div>
            <select
              onChange={(e) => {
                box.settings.speeds[key] = e.target.value;
                setBox({ ...box });
              }}
              defaultValue={box.settings.speeds[key]}
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
                box.settings.sequences[key].push({
                  play: false,
                  value: box.settings.sequences[key][0].value,
                });
                setBox({ ...box });
              }}
            >
              Add step
            </button>
            <button
              onClick={() => {
                box.settings.sequences[key].pop();
                setBox({ ...box });
              }}
            >
              Remove step
            </button>
            <select
              onChange={(e) => {
                let value = parseInt(e.target.value);
                let newSequence = [];
                for (let i = 0; i < sequence.length; i++) {
                  newSequence[i] = sequence[i];
                  newSequence[i].value = value;
                  newSequence[i].category = key;
                }
                box.settings.sequences[key] = newSequence;
                setBox({ ...box });
              }}
            >
              <option value={0}>{`${names[key]}1`}</option>
              <option value={1}>{`${names[key]}2`}</option>
            </select>
            {sequence.map((note, step) => {
              return (
                <input
                  type="checkbox"
                  defaultChecked={note.play}
                  style={{
                    border: `2px solid ${
                      step === sequencerSteps[key].step ? 'red' : 'black'
                    }`,
                  }}
                  onChange={(e) => {
                    sequence[step].play = e.target.checked;
                    setBox({ ...box });
                  }}
                />
              );
            })}
          </div>
        );
      })}
      <button onClick={close}>X</button>
    </StyledPanelWrapper>
  );
};

export default DrumPanel;
