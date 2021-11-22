import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledClearButton = styled(motion.button)`
  background-color: white;
  color: black;
  border: 4px solid #7f63b7;
  margin-right: 23px;
  width: 60px;
  height: 30px;
  padding: 2px;
  font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const StyledClearDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
