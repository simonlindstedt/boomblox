import { StyledButton } from './styles';

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

export default SaveButton;
