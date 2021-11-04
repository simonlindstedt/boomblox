import { useState } from 'react';
import { StyledSideMenu, StyledMenuButton } from './styles';

const SideMenu = ({ children }) => {
  const [active, setActive] = useState(false);

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  };

  const buttonVariants = {
    inactive: { x: -0 },
    active: { x: -400 },
  };
  return (
    <>
      <StyledMenuButton
        initial="inactive"
        animate={active ? 'active' : 'inactive'}
        variants={buttonVariants}
        onClick={() => {
          setActive(!active);
        }}
      >
        {active ? '➡️' : '⬅️'}
      </StyledMenuButton>
      <StyledSideMenu
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        variants={menuVariants}
      >
        {children}
      </StyledSideMenu>
    </>
  );
};

export default SideMenu;
