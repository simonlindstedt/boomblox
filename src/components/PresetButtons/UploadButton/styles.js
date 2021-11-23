import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledLabel = styled(motion.label)`
  background-color: white;
  color: black;
  font-size: 12px;
  display: inline-block;
  text-align: center;
  border: 5px solid #7f63b7;
  padding: 13px 20px;
  margin: 5px 8px;
  width: 45%;
  cursor: pointer;
  font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  input[type='file'] {
    display: none;
  }

  @media (min-width: 1460px) {
    padding: 15px 20px;
    font-size: 14px;
  }
`;
