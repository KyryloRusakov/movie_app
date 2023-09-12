import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import UserForm from 'components/UserForm';
import { signupSchema } from 'schemas';
import {
  signinFormInitialValues,
  signinFormFields,
} from 'constants/formFields';
import { setUser } from 'store/userSlice';

const SignUpPage = () => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (values, actions) => {
    setIsSubmitting(true);
    const auth = getAuth();
    console.log(auth);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(({ user }) => {
        const profileUpdates = {
          displayName: values.firstName,
        };

        return updateProfile(user, profileUpdates)
          .then(() => {
            console.log(user);
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
            setError(`Sign in error: ${error.message}`);
          });
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(`Sign in error: ${error.message}`);
      });
  };
  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}
      <UserForm
        btnName="Sign Up"
        validationSchema={signupSchema}
        initialValues={signinFormInitialValues}
        formFields={signinFormFields}
        onSubmit={handleRegister}
        isSubmitting={isSubmitting}
        signinBtn={false}
      />
    </div>
  );
};

export { SignUpPage };
