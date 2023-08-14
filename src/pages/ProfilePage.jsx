import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useAuth } from 'hook/useAuth';

const ProfilePage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const { signout } = useAuth();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      fetchUserData(user.email);
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;

      const user = users.find((user) => user.email === email);

      if (user) {
        setUserId(user.id);

        setValue('name', user.name);
        setValue('lastName', user.lastName);
        setValue('username', user.username);
        setValue('date', user.date);
        setValue('sex', user.sex);
        setValue('email', user.email);
        setValue('password', user.password);
        setValue('confirmPassword', user.password);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3001/users/${userId}`, data);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const logout = () => {
    signout(() => navigate('/movies'));
  };

  return (
    <div className="container">
      <div className="profile">
        <div className="profile-info">
          <span className="profile-title">
            You can change your personal data or logout
          </span>
          <div className="logout">
            <button className="form-btn" type="submit" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control-wrapper">
            <label>
              First Name:
              <input
                className="form-input"
                {...register('name', {
                  required: 'Enter your name',
                })}
              />
              {errors.name && (
                <span className="form-error">{errors.name.message}</span>
              )}
            </label>
          </div>
          <div className="form-control-wrapper">
            <label>
              Last Name:
              <input
                className="form-input"
                {...register('lastName', {
                  required: 'Enter your last name',
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
                {...register('username', {
                  required: true,
                  pattern: {
                    value: /^[a-z][a-zA-Z0-9_.]*$/,
                    message:
                      'The login must start with a lowercase letter and contain only letters, numbers, or "." or "_"',
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
                {...register('date', {
                  required: 'Chose date',
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
                {...register('sex', {
                  required: 'Choose sex',
                })}
                value="male"
              />
            </label>
            <label className="form-radiobtn">
              Female
              <input
                className="form-input"
                type="radio"
                {...register('sex', {
                  required: 'Chose sex',
                })}
                value="female"
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
                {...register('email', {
                  required: 'Enter your email',
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
                {...register('password', {
                  required: 'Enter your password',
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
                {...register('confirmPassword', {
                  required: 'Confirm your password',
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
            <button className="form-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { ProfilePage };
