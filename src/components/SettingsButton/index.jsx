import React from 'react';
import { StyledSettingsButton } from './styles';
import propTypes from 'prop-types';

const SettingsButton = ({ handleClick, title }) => {
    return (
      <StyledSettingsButton
        whileHover={{
          backgroundColor: '#d3d3d3',
        }}
        onClick={handleClick}
      >
        {title}
      </StyledSettingsButton>
    );
  }

SettingsButton.propTypes = {
  handleClick: propTypes.func,
  title: propTypes.string,
};
export default SettingsButton;
