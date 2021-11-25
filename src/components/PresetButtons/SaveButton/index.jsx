import { StyledButton } from './styles';
import propTypes from 'prop-types';

const SaveButton = ({ handleClick }) => {
  return (
    <StyledButton
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      onClick={handleClick}
    >
      Save Preset
    </StyledButton>
  );
};
SaveButton.propTypes = {
  handleClick: propTypes.func,
};
export default SaveButton;
