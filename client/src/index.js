import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import reducer from './';

// ------------ COMPONENTS ------------
import App from "./components/App";
import LoginProvider from "./components/LoginContext";
// import GlobalStyles from '../GlobalStyles'
//-------------------------------------

// const store = configureStore();

ReactDOM.render(
  <LoginProvider>
    <App />
    {/* <GlobalStyles /> */}
  </LoginProvider>,
  document.getElementById("root")
);
