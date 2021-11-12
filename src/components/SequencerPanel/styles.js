import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledPanelWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: auto;
  background-color: white;
  border-radius: 8px;

  input[type='checkbox'] {
    -webkit-appearance: none;
    appearance: none;
    display: inline-grid;
    width: 1em;
    height: 1em;
    border: 0.15em solid black;
    border-radius: 0.15em;
    place-content: center;
  }

  input[type='checkbox']::before {
    content: '';
    width: 0.55em;
    height: 0.55em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #5000ff;
  }

  input[type='checkbox']:checked::before {
    transform: scale(1);
  }
`;
