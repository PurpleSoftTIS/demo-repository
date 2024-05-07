import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userC, setUserC] = useState(null);
  const [emailC, setEmailC] = useState(null);

  // Cargar desde sessionStorage al inicializar
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedEmail = sessionStorage.getItem('email');
    if (storedUser && storedEmail) {
      setUserC(storedUser);
      setEmailC(storedEmail);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userC, emailC, setEmailC, setUserC }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };