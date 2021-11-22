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
