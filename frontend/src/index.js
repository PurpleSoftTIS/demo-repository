import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import { UserProvider } from './Context/UserContext';
import { FormProvider } from './Context/FormContext';

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <FormProvider>
      <App />
      </FormProvider>      
    </UserProvider>
  </React.StrictMode>
);
