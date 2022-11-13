import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import LongPressButton from './components/LongPressButton';

function App() {
  const [count, setCount] = useState(0);

  return (
    <LongPressButton
      buttonProps={{ color: 'red.4', uppercase: true }}
      iconColor={'blue.6'}
      onLongPress={() => {
        console.log('Long Pressed!!');
      }}
      durationMs={2.5 * 1000}
      disabledWhenLongPressed
    >
      Long Press
    </LongPressButton>
  );
}

export default App;
