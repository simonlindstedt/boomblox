import { useEffect, useState } from "react";
import { StyledPanelWrapper } from "./styles";

const SequencerPanel = ({ box, setBox, step }) => {
  const [sequencerStep, setSequencerStep] = useState(step);

  const close = () => {
    setBox(null);
  };

  useEffect(() => {
    setSequencerStep(step);
  }, [step]);

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
            <span style={{ color: key === sequencerStep ? "red" : "black" }}>
              Is here
            </span>
          </div>
        );
      })}
      <p>{sequencerStep}</p>
      <button onClick={close}>X</button>
    </StyledPanelWrapper>
  );
};

export default SequencerPanel;
