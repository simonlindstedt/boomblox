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
  max-width: 570px;
  height: auto;
  padding: 10px 50px;
  background-color: white;
  border-radius: 8px;
  margin: 24px;
  z-index: 5;

  input[type='checkbox'] {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 25px;
  }

  input[type='checkbox']:checked {
    background-color: #c8affa;
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
    justify-content: flex-start;
    width: 100%;
    padding: 8px 8px 0;

    select {
      &:nth-child(1) {
        margin: 10px 12px 0 0;
      }
    }

    button {
      margin-right: 12px;

      &:nth-last-child() {
        margin-right: 0;
      }
    }
  }

  select {
    margin-right: 4px;
    width: 40px;
    font-size: 14px;
    font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }
`;
