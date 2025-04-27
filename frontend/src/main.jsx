import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'; // Make sure it's `ReactDOM` (capitalized)
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
