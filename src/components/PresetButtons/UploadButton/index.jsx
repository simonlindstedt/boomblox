import { StyledLabel } from './styles';
import propTypes from 'prop-types';

const UploadButton = ({ handleInput }) => {
  return (
    <StyledLabel
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      Load Preset
      <input type="file" accept="application/JSON" onInput={handleInput} />
    </StyledLabel>
  );
};
UploadButton.propTypes = {
  handleInput: propTypes.func,
};
export default UploadButton;
