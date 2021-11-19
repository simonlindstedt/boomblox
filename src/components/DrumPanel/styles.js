import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledPanelWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 20px;
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
    margin-bottom: 10px;
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
  select {
    margin-right: 4px;
    width: 65px;
    font-size: 14px;
    font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }

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
    width: 20px;
    height: 20px;
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
    max-width: 394px;
    * {
      margin: 8px 10px;
    }
  }
`;

export const StyledBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
