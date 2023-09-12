import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { loginSchema } from 'schemas';
import UserForm from 'components/UserForm';
import { loginFormInitialValues, loginFormFields } from 'constants/formFields';
import { setUser } from 'store/userSlice';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (values, actions) => {
    setIsSubmitting(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(({ user }) => {
        const profileUpdates = {
          displayName: values.firstName,
        };

        return updateProfile(user, profileUpdates)
          .then(() => {
            dispatch(
              setUser({
                email: user.email,
                name: user.displayName,
              }),
            );
            actions.resetForm();
            navigate('/');
          })
          .catch((error) => {
            setIsSubmitting(false);
            setError(`Login error: ${error.message}`);
          });
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(`Login error: ${error.message}`);
      });
  };

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}
      <UserForm
        btnName="Login"
        validationSchema={loginSchema}
        initialValues={loginFormInitialValues}
        formFields={loginFormFields}
        onSubmit={handleLogin}
        isSubmitting={isSubmitting}
        signinBtn
      />
    </div>
  );
};

export { LoginPage };
