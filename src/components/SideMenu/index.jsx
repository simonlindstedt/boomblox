import { useState } from 'react';
import { StyledSideMenu, StyledMenuButton } from './styles';
import arrowLeft from './icons/left.png';
import arrowRight from './icons/right.png';
import Title from '../Title';

const SideMenu = ({ children }) => {
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
        }}
      >
        <img src={active ? arrowRight : arrowLeft} alt="arrow button" />
      </StyledMenuButton>
      <StyledSideMenu
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        variants={menuVariants}
      >
        <Title title="[cool project]" />
        {children}
      </StyledSideMenu>
    </>
  );
};

export default SideMenu;
