import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from 'hook/useAuth';

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const { signin } = useAuth();

  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;

      const user = users.find(
        (user) => user.name === name
          && user.email === email
          && user.password === password,
      );

      signin({ name, email }, () => navigate('/movies'), true);

      if (user) {
        navigate('/movies');
      } else {
        setError('Wrong email or password. Please, try again.');
      }
    } catch (error) {
      setError(
        'An error occurred while validating credentials. Please, try later.',
      );
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
              {...register('name', {
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
              {...register('email', {
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
              {...register('password', {
                required: true,
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </label>
        </div>
        {error && <div className="form-error">{error}</div>}
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
};

export default Login;
