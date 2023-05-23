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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          Email:
          <input
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </label>
      </div>

      <Link to="/signup">Sign In</Link>
      <button type="submit" onClick={loginHandler}>
        Log In
      </button>
    </form>
  );
}

export default Login