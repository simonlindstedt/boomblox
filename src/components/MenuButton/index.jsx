import React from 'react';
import { StyledButton, StyledPlayButton } from './styles';
import propTypes from 'prop-types';

const MenuButton = ({
  handleMouseUp,
  title,
  handleClick,
  isMovable,
  playing,
}) => {
  if (isMovable) {
    return (
      <StyledButton
        drag
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        dragElastic={1}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
        whileDrag={{
          scale: 0.9,
          transition: { duration: 0.2 },
          cursor: 'grabbing',
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
        onMouseUp={handleMouseUp}
      >
        {title}
      </StyledButton>
    );
  } else {
    return (
      <StyledPlayButton
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        onClick={handleClick}
        animate={{
          backgroundColor: playing ? '#e5dafd' : '#FB9A9A',
        }}
      >
        {title}
      </StyledPlayButton>
    );
  }
};

MenuButton.propTypes = {
  handleMouseUp: propTypes.func,
  handleClick: propTypes.func,
  title: propTypes.string,
  isMovable: propTypes.bool,
};
export default MenuButton;
