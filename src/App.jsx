import './main.scss';

import { useEffect, useState } from 'react';
import Canvas from './components/Canvas';
import StartPage from './components/StartPage';

const App = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (
      navigator.userAgent.includes('Android') ||
      navigator.userAgent.includes('iPhone') ||
      navigator.userAgent.includes('iPad')
    ) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  if (!mobile) {
    return (
      <main>
        <StartPage />
        <Canvas />
      </main>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <p>Not yet supported on mobile :(</p>
      </div>
    );
  }
};

export default App;
