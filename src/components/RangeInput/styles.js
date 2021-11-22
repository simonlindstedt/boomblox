import styled from 'styled-components';

export const StyledInput = styled.input`
  height: 8px;
  width: 100%;
  appearance: none;
  background-color: #7f63b7;
  border-radius: 25px;
  -webkit-appearance: none;
  margin: 5px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 18px;
    background: #4a327a;
    cursor: pointer;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px 0;
  position: relative;
`;

export const StyledText = styled.p`
  margin: 0 0 10px;
  font-weight: 500;
`;

export const StyledLabel = styled.label`
  margin: 0;
`;

export const StyledMuteButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 20px;
  width: 30px;
  height: 20px;
  border: none;
  background-color: white;

  img {
    width: 100%;
    height: 100%;
  }
`;
