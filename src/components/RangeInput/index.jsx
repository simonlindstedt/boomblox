import propTypes from 'prop-types';
import {
  StyledInput,
  InputWrapper,
  StyledText,
  StyledLabel,
  StyledMuteButton,
} from './styles';
import sound from './icon/sound.png';
import mute from './icon/mute.png';

const RangeInput = ({
  handleChange,
  handleClick,
  tempo,
  volume,
  isMaster,
  isZero,
}) => {
  if (isMaster) {
    return (
      <InputWrapper>
        <StyledLabel htmlFor="volume">Master Volume</StyledLabel>
        <StyledInput
          type="range"
          id="volume"
          name="volume"
          min={0.0}
          max={1.0}
          step={0.1}
          onChange={handleChange}
          value={volume}
        />
        <StyledMuteButton onClick={handleClick}>
          <img src={isZero ? mute : sound} />
        </StyledMuteButton>
        <StyledText>{volume}</StyledText>
      </InputWrapper>
    );
  } else {
    return (
      <InputWrapper>
        <StyledLabel htmlFor="tempo">BPM</StyledLabel>
        <StyledInput
          type="range"
          id="tempo"
          name="tempo"
          min="30"
          max="200"
          value={tempo}
          onChange={handleChange}
        />
        <StyledText>{tempo}</StyledText>
      </InputWrapper>
    );
  }
};

RangeInput.propTypes = {
  handleChange: propTypes.func,
  handleClick: propTypes.func,
  tempo: propTypes.oneOfType([propTypes.string, propTypes.number]),
  volume: propTypes.oneOfType([propTypes.string, propTypes.number]),
  isMaster: propTypes.bool,
  isZero: propTypes.bool,
};

export default RangeInput;
