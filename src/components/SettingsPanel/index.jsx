import { useEffect, useState } from "react";
import { StyledPanelWrapper } from "./styles";

const SettingsPanel = ({ box, setBoxSettings }) => {
  const [settings, changeSettings] = useState(box.settings);

  const close = () => {
    setBoxSettings(null);
  };

  useEffect(() => {
    if (settings) {
      setBoxSettings({ ...box, settings });
    }
  }, [settings]);

  return (
    <StyledPanelWrapper>
      <p>{box.id}</p>
      {!!settings &&
        Object.keys(settings).map((setting, index) => {
          return (
            <div key={index}>
              <p>name: {setting}</p>
              <input
                defaultValue={settings[setting]}
                type="range"
                min={0.0}
                max={1.0}
                step={0.01}
                onChange={(e) => {
                  settings[setting] = e.target.value;
                  changeSettings({ ...settings });
                }}
              />
            </div>
          );
        })}
      <button onClick={close}>X</button>
    </StyledPanelWrapper>
  );
};

export default SettingsPanel;
