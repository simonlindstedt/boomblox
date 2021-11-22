import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledInstructions = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  background-color: white;
  width: 400px;
  z-index: 8;
  padding: 20px 40px;

  h3 {
    letter-spacing: 2.5px;
    font-size: 36px;
    font-family: 'Staatliches', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    margin: 0 0 20px;
  }

  span {
    font-weight: 500;
  }
  ul {
    padding-inline-start: 0;
  }
  li {
    list-style: none;
    margin: 20px 0;
    font-size: 15px;
  }

  button {
    font-size: 20px;
  }
`;
