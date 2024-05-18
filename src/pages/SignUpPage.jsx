import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import UserForm from 'components/UserForm';
import { signupSchema } from 'schemas';
import {
  signinFormInitialValues,
  signinFormFields,
} from 'constants/formFields';
import { setUser } from 'store/userSlice';
import { db } from '../firebase';

const SignUpPage = () => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userCollection = collection(db, 'users');

  const handleRegister = async (values, actions) => {
    setIsSubmitting(true);
    const auth = getAuth();

    try {
      await addDoc(userCollection, {
        name: values.firstName,
        lastName: values.lastName,
        sex: values.sex,
        date: values.date,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
    } catch (error) {
      console.error(error);
    }

    createUserWithEmailAndPassword(auth, values.email, values.password)
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
            console.log(values);
            actions.resetForm();
            navigate('/movie_app');
          })
          .catch((error) => {
            setIsSubmitting(false);
            if (error.code === 'auth/email-already-in-use') {
              setError('The email address is already in use');
            } else {
              setError(`Sign in error: ${error.message}`);
            }
          });
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error.code === 'auth/email-already-in-use') {
          setError('The email address is already in use');
        } else {
          setError(`Sign in error: ${error.message}`);
        }
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
        userDataExists={false}
      />
    </div>
  );
};

export { SignUpPage };
