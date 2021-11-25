import { StyledButton } from './styles';
import propTypes from 'prop-types';

const Button = ({ children, handleClick }) => {
  return (
    <StyledButton
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      onClick={handleClick}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  handleClick: propTypes.func,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
};

export default Button;
