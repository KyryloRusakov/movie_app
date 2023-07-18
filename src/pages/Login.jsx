import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './../components/hook/useAuth';

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const {signin} = useAuth();

  // const onSubmit = (data) => {
  //   // const user = data.email;

  //   // signin(user, () => navigate("/movies"), true);
  // };

   const onSubmit = async (data) => {
     try {
       const response = await fetch("http://localhost:3001/users", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
        });
        console.log(data);

       if (response.ok) {
         navigate("/movies");
       } else {
         console.error("Error creating user:", response.statusText);
       }
     } catch (error) {
       console.error("Error creating user:", error);
     }
   };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control-wrapper">
          <label>
            Name:
            <input
              className="form-input"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </label>
        </div>
        <div className="form-control-wrapper">
          <label>
            Email:
            <input
              className="form-input"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </label>
        </div>
        <div className="form-control-wrapper">
          <label>
            Password:
            <input
              className="form-input"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </label>
        </div>
        <div className="form-footer">
          <Link className="form-link" to="/signup">
            Sign In
          </Link>
          <button className="form-btn" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login