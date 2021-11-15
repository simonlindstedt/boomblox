import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledPanelWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 400px;
  max-width: 500px;
  height: auto;
  padding: 10px 50px;
  background-color: white;
  border-radius: 8px;
  margin: 24px;

  input[type='checkbox'] {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }

  input[type='checkbox']:checked {
    background-color: black;
  }

  .step {
    * {
      margin: 2px 0px;
    }
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .controls {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }
`;
