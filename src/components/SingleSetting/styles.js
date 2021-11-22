import styled from 'styled-components';

export const StyledSingleSetting = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  select {
    width: 130px;
    font-size: 16px;
    font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }
  p {
    margin: 5px;
  }

  input[type='range'] {
    height: 8px;
    background-color: #7f63b7;
    border-radius: 25px;
    -webkit-appearance: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 15px;
      width: 15px;
      border-radius: 18px;
      background: #4a327a;
      cursor: pointer;
    }
  }
`;
