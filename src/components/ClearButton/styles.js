import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledClearButton = styled(motion.button)`
  background-color: white;
  color: black;
  font-size: 12px;
  border: 5px solid #7f63b7;
  padding: 13px 20px;
  margin: 5px 8px;
  width: 45%;
  cursor: pointer;
  font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  @media (min-width: 1460px) {
    padding: 15px 20px;
    font-size: 14px;
  }
`;

export const StyledClearDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
