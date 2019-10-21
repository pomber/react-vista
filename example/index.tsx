import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
// import Stage from './stage';
import HalfCube from './half-cube';

const App = () => {
  return <HalfCube />;
};

ReactDOM.render(<App />, document.getElementById('root'));
