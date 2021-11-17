import { useState } from 'react';
import {
  StyledButton,
  StyledButtonContainer,
  StyledPage,
  StyledTextContainer,
} from './styles';
import { variants, buttonContainerVariants, buttonVariants } from './variants';
import Title from '../Title';

const StartPage = () => {
  const [active, setActive] = useState(true);

  return (
    <>
      <StyledPage
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        variants={variants}
      >
        <StyledTextContainer>
          <Title title="boomblox" />
          <p>choose your audio blocks and connect them to create sound</p>
        </StyledTextContainer>
      </StyledPage>
      <StyledButtonContainer
        initial="inactive"
        animate={active ? 'active' : 'inactive'}
        variants={buttonContainerVariants}
      >
        <StyledButton
          initial="active"
          animate={active ? 'active' : 'inactive'}
          variants={buttonVariants}
          onClick={() => {
            setActive(!active);
          }}
          whileHover={{
            scale: 1.1,
            filter: active ? 'drop-shadow(2px -2px 0px #4A327A)' : 'none',
            cursor: 'pointer',
            transition: { duration: 0.2 },
          }}
        >
          {active ? 'Start' : '⌄'}
        </StyledButton>
      </StyledButtonContainer>
    </>
  );
};

export default StartPage;
