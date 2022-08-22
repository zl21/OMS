import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import App1 from './App1';
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App1 />
    </Provider>
  </React.StrictMode>
);


/* 
// 也可以用如下写法，有警告：
import ReactDOM from 'react-dom';

ReactDOM.render(
  // Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
  <React.StrictMode>
    <Provider store={store}>
      <App1 />
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
)
 */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
