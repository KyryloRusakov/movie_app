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

  const onSubmit = (data) => {
    const user = data.email;

    signin(user, () => navigate("/movies"), true);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
          <button className="form-btn" type="submit" >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login