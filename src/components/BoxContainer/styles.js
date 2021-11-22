import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledBoxContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const StyledBox = styled(motion.img)`
  width: 100px;
  opacity: 0.7;
  position: absolute;

  &:nth-child(1) {
    top: 10px;
    left: 55px;
  }
  &:nth-child(2) {
    top: 10px;
    left: 400px;
  }
  &:nth-child(3) {
    top: 10px;
    right: 350px;
  }
  &:nth-child(4) {
    top: 200px;
    right: 100px;
  }
`;
