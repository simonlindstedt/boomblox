import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledPanelWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 50px;
  background-color: white;
  border-radius: 8px;
  margin: 20px;
  z-index: 5;

  input[type='checkbox'] {
    -webkit-appearance: none;
    appearance: none;
    display: inline-grid;
    width: auto;
    height: auto;
    border: 0.15em solid black;
    border-radius: 50%;
    place-content: center;
  }

  input[type='checkbox']::before {
    content: '';
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    /* box-shadow: inset 1em 1em #5000ff; */
    background: #5000ff;
  }

  input[type='checkbox']:checked::before {
    transform: scale(1);
  }
`;

export const StyledButton = styled(motion.button)`
  margin: 20px;
  border: none;
  padding: 10px 20px;
  background-color: #5000ff;
  color: white;
  cursor: pointer;
  border-radius: 8px;
`;
