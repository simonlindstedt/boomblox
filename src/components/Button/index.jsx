import React from 'react';
import { StyledButton } from './styles';
import propTypes from 'prop-types';

const Button = ({ handleMouseUp, title, handleClick, isMovable }) => {
  if (isMovable) {
    return (
      <StyledButton
        drag
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        dragElastic={1}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
        onMouseUp={handleMouseUp}
      >
        {title}
      </StyledButton>
    );
  } else {
    return <StyledButton onClick={handleClick}>{title}</StyledButton>;
  }
};

Button.propTypes = {
  handleMouseUp: propTypes.func,
  handleClick: propTypes.func,
  title: propTypes.string,
  isMovable: propTypes.bool,
};
export default Button;
