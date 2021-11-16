import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledPage = styled(motion.div)`
  width: 100%;
  height: 100%;
  /* background: linear-gradient(180deg, #715c9c 0%, #c4bdd5 100%); */
  background-color: #9576d6;
  color: white;
  position: absolute;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-weight: 400;
    font-size: 40px;
    margin: 15px;
  }

  p {
    font-size: 30px;
    width: 50%;
    text-align: center;
    margin: 15px;
  }
`;

export const StyledButton = styled(motion.button)`
  font-size: 20px;
  background-color: #5000ff;
  color: white;
  border: none;
  padding: 20px;
  margin: 20px;
  border-radius: 50px;
  font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const StyledButtonContainer = styled(motion.div)`
  width: 100%;
  position: absolute;
  bottom: 80px;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;
