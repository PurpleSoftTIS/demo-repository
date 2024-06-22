import React, { createContext, useState } from "react";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [formDataC, setFormDataC] = useState([]);
  const [feriados, setFeriados] = useState([]);

  const fetchConfiguraciones = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/configuraciones', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setFormDataC(data);
      return data;
    } catch (error) {
      console.error('Error al obtener las configuraciones:', error);
      throw error;
    }
  };

  const fetchFeriados = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/feriados', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setFeriados(data);
      return data;
    } catch (error) {
      console.error('Error al obtener los feriados:', error);
      throw error;
    }
  };

  return (
    <FormContext.Provider value={{ formDataC, feriados, fetchConfiguraciones, fetchFeriados }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };