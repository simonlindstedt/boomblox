import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledButton = styled(motion.button)`
  margin: 10px 0 0;
  font-size: 12px;
  border: none;
  padding: 10px 20px;
  background-color: #7f63b7;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-family: 'IBM Plex mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
