import styled from 'styled-components';

export const StyledInput = styled.input`
  height: 20px;
  width: 100%;
`;

export const InputWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
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
