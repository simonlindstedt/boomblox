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

  .drumVolume {
    height: 10px;
    width: 100%;
    appearance: none;
    background-color: #7f63b7;
    border-radius: 25px;
    -webkit-appearance: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 18px;
      width: 18px;
      border-radius: 18px;
      background: black;
      cursor: pointer;
    }
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
    background: #7f63b7;
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

export const StyledButton = styled(motion.button)`
  /* margin: 20px; */
  margin-top: 8px;
  border: none;
  padding: 10px 20px;
  background-color: #7f63b7;
  color: white;
  cursor: pointer;
  border-radius: 8px;
`;
