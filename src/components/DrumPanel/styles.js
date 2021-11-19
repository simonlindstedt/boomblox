import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledPanelWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 50px;
  background-color: white;
  border-radius: 8px;
  margin: 20px;
  z-index: 5;
  .volume {
    display: flex;
    justify-content: space-between;
  }
  select,
  button {
    margin-right: 4px;
  }

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

  .sequence {
    display: flex;
    flex-wrap: wrap;
    max-width: 210px;
    * {
      margin: 4px;
    }
  }
`;
