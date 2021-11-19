import { useState } from 'react';
import propTypes from 'prop-types';
import { StyledSideMenu, StyledMenuButton } from './styles';
import arrowLeft from './icons/left.png';
import arrowRight from './icons/right.png';
import Title from '../Title';
import Instructions from '../Instructions';

const SideMenu = ({ children, helpIsActive, setHelpIsActive }) => {
  const [active, setActive] = useState(false);

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  };

  const buttonVariants = {
    inactive: { x: 0 },
    active: { x: -400 },
  };

  return (
    <>
      <StyledMenuButton
        initial="inactive"
        animate={active ? 'active' : 'inactive'}
        variants={buttonVariants}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
          cursor: 'pointer',
        }}
        onClick={() => {
          setActive(!active);
          setHelpIsActive(false);
        }}
      >
        <img src={active ? arrowRight : arrowLeft} alt="arrow button" />
      </StyledMenuButton>
      <StyledSideMenu
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        variants={menuVariants}
      >
        <Title title="boomblox" />
        {children}
      </StyledSideMenu>
      <Instructions
        helpIsActive={helpIsActive}
        setHelpIsActive={setHelpIsActive}
      />
    </>
  );
};
SideMenu.propTypes = {
  helpIsActive: propTypes.bool,
  setHelpIsActive: propTypes.func,
};
export default SideMenu;
