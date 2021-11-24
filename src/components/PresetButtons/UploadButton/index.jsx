import { StyledLabel } from './styles';

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

export default UploadButton;
