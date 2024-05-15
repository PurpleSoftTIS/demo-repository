import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import { UserProvider } from './Context/UserContext';

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
