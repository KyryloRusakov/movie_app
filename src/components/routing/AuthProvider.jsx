import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
   const navigate = useNavigate();
  //  const location = useLocation();
  //  let currentLocation = location.pathname;
  //  console.log(location);
   
   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // navigate(currentLocation);
    }
  }, []);

  const signin = (userData, cb, isAuth) => {
    setUser(userData);
    cb();
    if(isAuth){
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }
  const signout = (cb) => {
    setUser(null)
    cb();
    localStorage.removeItem("user");
  }

  const value = {user, signin, signout}

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider