import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledPage = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: #292335;
  color: white;
  position: absolute;
  top: 0;
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const StyledTextContainer = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 50px;
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
  background-color: #7f63b7;
  color: white;
  border: none;
  padding: 20px 57px;
  margin: 20px;
  border-radius: 50px;
  font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 500;
`;

export const StyledButtonContainer = styled(motion.div)`
  width: 100%;
  position: absolute;
  bottom: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
