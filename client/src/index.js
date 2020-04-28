import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
// import reducer from './';

// ------------ COMPONENTS ------------
import App from './components/App';
import LoginProvider from './components/LoginContext';
// import GlobalStyles from '../GlobalStyles'
//-------------------------------------

const store = configureStore();

ReactDOM.render(
  <LoginProvider>
    <Provider store={store}>
      <App />
      {/* <GlobalStyles /> */}
    </Provider>
  </LoginProvider>,
  document.getElementById('root')
);
