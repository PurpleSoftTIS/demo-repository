import React, { createContext, useState } from "react";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [formDataC, setFormDataC] = useState([]);
   
  return (
    <FormContext.Provider value={{ formDataC, setFormDataC}}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };