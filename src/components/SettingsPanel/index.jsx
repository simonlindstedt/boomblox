import SingleSetting from '../SingleSetting';
import { StyledPanelWrapper, StyledButton } from './styles';

const SettingsPanel = ({ box, setBox }) => {
  const close = () => {
    setBox(null);
  };

  return (
    <StyledPanelWrapper>
      <h3>Settings</h3>
      <p>{box.settings.name}</p>
      {!!box.settings &&
        Object.keys(box.settings).map((setting, key) => {
          return (
            <SingleSetting
              key={key}
              boxType={box.type}
              setting={setting}
              value={box.settings[setting]}
              handleOnChange={(e) => {
                box.settings[setting] = e.target.value;
                setBox({ ...box });
              }}
            />
          );
        })}
      <StyledButton
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.2 },
        }}
        onClick={close}
      >
        X
      </StyledButton>
    </StyledPanelWrapper>
  );
};

export default SettingsPanel;
