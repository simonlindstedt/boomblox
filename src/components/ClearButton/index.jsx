import React from 'react';
import { StyledClearButton } from './styles';
import propTypes from 'prop-types';

const ClearButton = ({ handleClick, title }) => {
    return (
      <StyledClearButton
        whileHover={{
          backgroundColor: '#d3d3d3',
        }}
        onClick={handleClick}
      >
        {title}
      </StyledClearButton>
    );
  }

ClearButton.propTypes = {
  handleClick: propTypes.func,
  title: propTypes.string,
};
export default ClearButton;
