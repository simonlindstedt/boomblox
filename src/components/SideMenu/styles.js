import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledSideMenu = styled(motion.aside)`
  width: 400px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  background-color: white;
  align-items: center;
  padding: 20px;
  z-index: 8;
`;

export const StyledMenuButton = styled(motion.button)`
  border-radius: 50%;
  font-size: 32px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background-color: white;
  position: absolute;
  top: calc(50% - 16px);
  right: 16px;
`;
