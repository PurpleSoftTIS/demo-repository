import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { UserProvider } from './Context/UserContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
