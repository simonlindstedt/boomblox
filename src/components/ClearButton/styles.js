import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledClearButton = styled(motion.button)`
  /* background-color: white;
  color: black;
  border: 4px solid #7f63b7;
  margin-right: 23px;
  width: 60px;
  height: 30px;
  padding: 2px;
  font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */

  /* border: 5px solid #4a327a;
  background-color: white;
  padding: 15px 20px;
  margin: 8px 10px 0 8px;
  width: 80%;
  cursor: pointer;
  font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */

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
`;

export const StyledClearDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
