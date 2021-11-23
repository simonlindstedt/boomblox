import React from 'react';
import { StyledClearButton, StyledClearDiv } from './styles';
import propTypes from 'prop-types';

const ClearButton = ({ handleClick, title }) => {
  return (
    <StyledClearButton
      whileHover={{
        backgroundColor: 'rgb(251, 154, 154)',
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      onClick={handleClick}
    >
      {title}
    </StyledClearButton>
  );
};

ClearButton.propTypes = {
  handleClick: propTypes.func,
  title: propTypes.string,
};
export default ClearButton;
