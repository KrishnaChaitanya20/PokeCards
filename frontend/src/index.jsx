// frontend/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { LoginProvider } from './LoginContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginProvider> 
      <App />
    </LoginProvider>
  </React.StrictMode>
);