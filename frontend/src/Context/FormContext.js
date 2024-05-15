import React, { createContext, useState } from "react";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [fromDataContext, setFromDataContext] = useState([]);
   
  return (
    <FormContext.Provider value={{ fromDataContext, setFromDataContext}}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };