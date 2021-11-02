import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  width: 50%;
  height: 50%;
`;

const Button = ({ handleClick, title }) => {
  return (
    <ButtonWrapper>
      <button onClick={handleClick}>{title}</button>
    </ButtonWrapper>
  );
};
export default Button;
