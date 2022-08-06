import React from 'react';
import styles from './App.module.scss';
import { Pi } from './views/pi';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.pi}>
        <Pi />
      </div>
    </div>
  );
}

export default App;
