import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
// import reducer from './';

// ------------ COMPONENTS ------------
import App from './components/App';
// import GlobalStyles from '../GlobalStyles'
//-------------------------------------

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
    {/* <GlobalStyles /> */}
  </Provider>,
  document.getElementById('root')
);
