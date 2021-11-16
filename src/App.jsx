import './main.scss';

import React from 'react';
import Canvas from './components/Canvas';
import StartPage from './components/StartPage';

const App = () => {
  return (
    <>
      <StartPage />
      <Canvas />
    </>
  );
};

export default App;
