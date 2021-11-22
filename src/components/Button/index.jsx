import { StyledButton } from './styles';

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

export default Button;
