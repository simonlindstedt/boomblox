import React from 'react';
import { StyledClearButton, StyledClearDiv } from './styles';
import propTypes from 'prop-types';

const ClearButton = ({ handleClick, title }) => {
    return (
      <StyledClearDiv>
      <StyledClearButton
        whileHover={{
          backgroundColor: '#d3d3d3',
        }}
        onClick={handleClick}
      >
        {title}
      </StyledClearButton>
      </StyledClearDiv>
    );
  }

ClearButton.propTypes = {
  handleClick: propTypes.func,
  title: propTypes.string,
};
export default ClearButton;
