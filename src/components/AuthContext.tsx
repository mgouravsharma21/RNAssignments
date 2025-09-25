import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, storeToken, clearToken } from '../utils/SecureStorage';

const AuthContext = createContext({
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getToken().then(token => {
      if (token) setIsLoggedIn(true);
    });
  }, []);

  const login = async (token) => {
    console.log('Storing token:', token);
    await storeToken(token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await clearToken();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);