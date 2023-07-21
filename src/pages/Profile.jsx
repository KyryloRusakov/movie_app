import React from 'react'
import Header from './../components/Header';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../components/hook/useAuth";
import axios from "axios";

const Profile = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  // const { name } = data;
    //  const fetchUser = async (data) => {
    //    const { email, password } = data;
    //    try {
    //      const response = await axios.get("http://localhost:3001/users");
    //      console.log(response);
    //      const users = response.data;
    //      console.log(users);

    //      const user = users.find(
    //        (user) => user.email === email && user.password === password
    //      );

    //      if (user) {
    //        navigate("/movies");
    //      } else {
    //        setError("Неправильный email или пароль. Попробуйте снова.");
    //      }
    //    } catch (error) {
    //      setError(
    //        "Произошла ошибка при проверке учетных данных. Попробуйте позже."
    //      );
    //    }
    //  };
    const logout = () => {
      signout(() => navigate("/movies"));
    }

  return (
    <div className="container">
      <Header />
      <div className="logout">
        <button className="form-btn" type="submit" onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Profile