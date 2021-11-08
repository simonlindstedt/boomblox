import propTypes from 'prop-types';
import { StyledInput, InputWrapper, StyledText, StyledLabel } from './styles';

const RangeInput = ({ handleChange, tempo, volume, isMaster }) => {
  if (isMaster) {
    return (
      <InputWrapper>
        <StyledLabel htmlFor="volume">Master Volume</StyledLabel>
        <StyledInput
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1"
          defaultValue="0.2"
          step="0.001"
          onChange={handleChange}
        />
        <StyledText>{volume}</StyledText>
      </InputWrapper>
    );
  } else {
    return (
      <InputWrapper>
        <StyledLabel htmlFor="tempo">choose BPM</StyledLabel>
        <StyledInput
          type="range"
          id="tempo"
          name="tempo"
          min="30"
          max="200"
          onChange={handleChange}
        />
        <StyledText>{tempo}</StyledText>
      </InputWrapper>
    );
  }
};

RangeInput.propTypes = {
  handleChange: propTypes.func,
  tempo: propTypes.string,
  volume: propTypes.string,
  isMaster: propTypes.bool,
};

export default RangeInput;
