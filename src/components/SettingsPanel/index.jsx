import SingleSetting from "../SingleSetting";
import { StyledPanelWrapper } from "./styles";

const SettingsPanel = ({ box, setBox }) => {
  const close = () => {
    setBox(null);
  };

  return (
    <StyledPanelWrapper>
      <p>{box.id}</p>
      {!!box.settings &&
        Object.keys(box.settings).map((setting, key) => {
          return (
            <SingleSetting
              key={key}
              setting={setting}
              value={box.settings[setting]}
              handleOnChange={(e) => {
                box.settings[setting] = e.target.value;
                setBox({ ...box });
              }}
            />
          );
        })}
      <button onClick={close}>X</button>
    </StyledPanelWrapper>
  );
};

export default SettingsPanel;
