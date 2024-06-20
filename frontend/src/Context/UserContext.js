import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userC, setUserC] = useState(null);
  const [emailC, setEmailC] = useState(null);
  const [urole, setUrole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar desde sessionStorage al inicializar
  useEffect(() => {
    if (urole === null){
      const storedUser = localStorage.getItem('user');
      const storedEmail = localStorage.getItem('email');
      const storedRole = localStorage.getItem('role')
      if (storedUser && storedEmail) {
        setUserC(storedUser);
        setEmailC(storedEmail);
      }
      if (storedRole){
        setUrole(storedRole);
      }else{
        setUrole('gest');
      }
    }
    setIsLoading(false);  
  }, [urole]);

  return (
    <UserContext.Provider value={{ userC, emailC, urole, setEmailC, setUserC, setUrole, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };