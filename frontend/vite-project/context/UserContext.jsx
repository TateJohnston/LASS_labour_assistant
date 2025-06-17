import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [isAdmin, setIsAdmin] = useState(null);
  const [successfulLogin, setSuccessfulLogin] = useState(false);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        isAdmin,
        setIsAdmin,
        setSuccessfulLogin,
        successfulLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
