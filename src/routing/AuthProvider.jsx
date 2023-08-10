import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signin = (userData, cb, isAuth) => {
    setUser(userData);
    cb();
    if (isAuth) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };
  const signout = (cb) => {
    setUser(null);
    cb();
    localStorage.removeItem('user');
  };

  const value = { user, signin, signout };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
