import SingleSetting from '../SingleSetting';
import { StyledPanelWrapper } from './styles';
import Button from '../Button';

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
      <Button handleClick={close}>X</Button>
    </StyledPanelWrapper>
  );
};

export default SettingsPanel;
