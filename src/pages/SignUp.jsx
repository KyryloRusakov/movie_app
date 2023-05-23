import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const navigate = useNavigate();

  function signupHandler() {
    navigate("/movies");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          First Name:
          <input
            {...register("firstName", {
              required:
                'Enter your name',
            })}
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            {...register("password", {
              required: true,
              pattern: {
                value: /^[a-z][a-zA-Z0-9_.]*$/,
                message:
                  'Логин должен начинаться с маленькой буквы и содержать только буквы, цифры или символы "." или "_"',
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </label>
      </div>

      <button type="submit" onClick={signupHandler}>
        Sign Up
      </button>
    </form>
  );
}

export default SignUp