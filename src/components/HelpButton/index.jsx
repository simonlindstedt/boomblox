import { StyledButton } from './styles';
import propTypes from 'prop-types';

const HelpButton = ({ title, handleClick }) => {
  return (
    <StyledButton
      onClick={handleClick}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
    >
      {title}
    </StyledButton>
  );
};

HelpButton.propTypes = {
  title: propTypes.string,
  handleClick: propTypes.func,
};

export default HelpButton;
