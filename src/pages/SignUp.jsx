import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../components/hook/useAuth";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const { signin } = useAuth();

  const onSubmit = (data) => {
    const user = data.firstName;
    signin(user, () => navigate("/movies"));
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control-wrapper">
          <label>
            First Name:
            <input
              className="form-input"
              {...register("firstName", {
                required: "Enter your name",
              })}
            />
            {errors.firstName && (
              <span className="form-error">{errors.firstName.message}</span>
            )}
          </label>
        </div>
        <div className="form-control-wrapper">
          <label>
            Last Name:
            <input
              className="form-input"
              {...register("lastName", {
                required: "Enter your last name",
              })}
            />
            {errors.lastName && (
              <span className="form-error">{errors.lastName.message}</span>
            )}
          </label>
        </div>
        <div className="form-control-wrapper">
          <label>
            Username:
            <input
              className="form-input"
              {...register("username", {
                required: true,
                pattern: {
                  value: /^[a-z][a-zA-Z0-9_.]*$/,
                  message:
                    'Логин должен начинаться с маленькой буквы и содержать только буквы, цифры или символы "." или "_"',
                },
              })}
            />
            {errors.username && (
              <span className="form-error">{errors.username.message}</span>
            )}
          </label>
        </div>
        <div className="form-control-wrapper">
          <label>
            Date of birth:
            <input
              className="form-input"
              type="date"
              {...register("date", {
                required: "Chose date",
              })}
            />
            {errors.date && (
              <span className="form-error">{errors.date.message}</span>
            )}
          </label>
        </div>
        <div className="form-radiobtn-wrapper">
          Your sex:
          <label className="form-radiobtn">
            Male
            <input
              className="form-input"
              type="radio"
              {...register("sex", {
                required: true,
              })}
            />
          </label>
          <label className="form-radiobtn">
            Female
            <input
              className="form-input"
              type="radio"
              {...register("sex", {
                required: "Chose sex",
              })}
            />
            {errors.sex && (
              <span className="form-error">{errors.sex.message}</span>
            )}
          </label>
        </div>
        <div className="form-control-wrapper">
          <label>
            Email:
            <input
              className="form-input"
              {...register("email", {
                required: "Enter your email",
              })}
            />
            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
            )}
          </label>
        </div>
        <div className="form-control-wrapper">
          <label>
            Password:
            <input
              className="form-input"
              {...register("password", {
                required: "Enter your password",
              })}
            />
            {errors.password && (
              <span className="form-error">{errors.password.message}</span>
            )}
          </label>
        </div>
        <div className="form-control-wrapper">
          <label>
            Confirm Password:
            <input
              className="form-input"
              {...register("confirmPassword", {
                required: "Confirm your password",
              })}
            />
            {errors.confirmPassword && (
              <span className="form-error">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-footer">
          <button
            className="form-btn"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
