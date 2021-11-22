import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledClearButton = styled(motion.button)`
  background-color: white;
  color: black;
  border: 4px solid #7f63b7;
  position: absolute;
  bottom: 120px;
  right: 41px;
  width: 60px;
  height: 30px;
  padding: 2px;
  font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
