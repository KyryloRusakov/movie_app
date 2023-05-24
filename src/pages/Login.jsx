import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const navigate = useNavigate()

  function loginHandler() {
    navigate("/movies");
  }

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
          <button className="form-btn" type="submit" onClick={loginHandler}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login