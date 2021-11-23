import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledButton = styled(motion.button)`
  background-color: white;
  font-size: 13px;
  color: black;
  border: 5px solid rgb(251, 154, 154);
  padding: 15px 20px;
  margin: 0 0 15px;
  width: 80%;
  cursor: pointer;
  font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  @media (min-width: 1460px) {
    font-size: 15px;
  }
`;
