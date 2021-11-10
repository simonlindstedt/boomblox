import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledButton = styled(motion.button)`
  background-color: white;
  color: black;
  border: 5px solid #5000ff;
  padding: 15px 20px;
  margin: 8px;
  width: 45%;
  cursor: grab;
  font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const StyledPlayButton = styled(motion.button)`
  background-color: #b0deb0;
  border: 5px solid black;
  padding: 15px 20px;
  margin: 8px;
  width: 60%;
  cursor: pointer;
  font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
