import { useState } from 'react';
import { StyledButton, StyledButtonContainer, StyledPage } from './styles';
import { variants, buttonContainerVariants, buttonVariants } from './variants';

const StartPage = () => {
  const [active, setActive] = useState(true);

  return (
    <>
      <StyledPage
        initial="visible"
        animate={active ? 'visible' : 'hidden'}
        variants={variants}
      >
        <h1>Hello</h1>
        <p>choose your audio blocks and connect them to create sound.</p>
      </StyledPage>
      <StyledButtonContainer
        initial="active"
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
            cursor: 'pointer',
            transition: { duration: 0.2 },
          }}
        >
          {active ? 'Start' : 'v'}
        </StyledButton>
      </StyledButtonContainer>
    </>
  );
};

export default StartPage;
