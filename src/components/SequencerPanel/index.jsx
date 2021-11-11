import { useEffect, useState } from 'react';
import { StyledPanelWrapper } from './styles';

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
            <input
              type="number"
              defaultValue={item.value}
              onChange={(e) => {
                box.settings.sequence[key].value = parseInt(e.target.value);
                setBox({ ...box });
              }}
            />
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
      <input
        type="number"
        defaultValue={box.settings.speed}
        onChange={(e) => {
          box.settings.speed = 1 / e.target.value;
          setBox({ ...box });
        }}
      />
      <button onClick={close}>X</button>
    </StyledPanelWrapper>
  );
};

export default SequencerPanel;
