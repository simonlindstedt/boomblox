import styled from 'styled-components';

export const StyledInput = styled.input`
  height: 20px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;

  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    box-shadow: 1px 1px 2px #a6a6a6;
    background: #ff96ab;
    border-radius: 4px;
    border: 2px solid #f27b7f;
  }

  &:focus::-webkit-slider-runnable-track  {
    background: #ff96ab;
  }
  &::-moz-range-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    box-shadow: 1px 1px 2px #a6a6a6;
    background: white;
    border-radius: 4px;
    border: 2px solid #f27b7f;
  }
  &::-moz-range-thumb {
    box-shadow: 1px 1px 2px #a6a6a6;
    border: 2px solid #f27b7f;
    height: 25px;
    width: 5px;
    border-radius: 0px;
    background: #ff96ab;
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 12px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #ff96ab;
    border: 2px solid #f27b7f;
    border-radius: 8px;
    box-shadow: 1px 1px 2px #a6a6a6;
  }
  &::-ms-fill-upper {
    background: #ff96ab;
    border: 2px solid #f27b7f;
    border-radius: 8px;
    box-shadow: 1px 1px 2px #a6a6a6;
  }
  &::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 2px #a6a6a6;
    border: 2px solid #f27b7f;
    height: 30px;
    width: 30px;
    border-radius: 0px;
    background: #ff96ab;
    cursor: pointer;
  }
  &:focus::-ms-fill-lower {
    background: #ff96ab;
  }
  &:focus::-ms-fill-upper {
    background: #ff96ab;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

export const StyledText = styled.p`
  margin: 0;
`;

export const StyledLabel = styled.label`
  margin: 0;
`;
