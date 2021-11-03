import { useEffect } from "react";
import { StyledPanelWrapper } from "./styles";

const SettingsPanel = ({ box, setBox }) => {
  const close = () => {
    setBox(null);
  };

  useEffect(() => {
    console.log("hello mount");
    if (box.settings) {
      console.log(box.settings);
    }
  }, []);

  return (
    <StyledPanelWrapper>
      <p>{box.id}</p>
      <p>{box.type}</p>
      {!!box.settings &&
        Object.keys(box.settings).map((key, index) => {
          return (
            <div key={index}>
              <p>{key}</p>
              <p>{box.settings[key]}</p>
            </div>
          );
        })}
      <button onClick={close}>X</button>
    </StyledPanelWrapper>
  );
};

export default SettingsPanel;
