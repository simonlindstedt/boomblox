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

  h3 {
    margin: 10px 10px 5px;
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
