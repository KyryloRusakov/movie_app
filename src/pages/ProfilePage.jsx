import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { getDocs, collection } from 'firebase/firestore';
import { removeUser } from 'store/userSlice';
import UserForm from 'components/UserForm';
import { signupSchema } from 'schemas';
import {
  signinFormInitialValues,
  signinFormFields,
} from 'constants/formFields';
import { db } from '../firebase';

const ProfilePage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = useSelector((state) => state.user.email);

  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userCollection = collection(db, 'users');

  useEffect(() => {
    const getUser = async () => {
      try {
        // const q = query(userCollection, where('uid', '==', userId));
        const data = await getDocs(userCollection);
        console.log(data);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredData);
        const currentUser = filteredData.find((user) => user.email === userEmail);
        console.log(currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  console.log(user);

  const userDataExists = {
    firstName: user.name || '',
    lastName: user.lastName || '',
    sex: user.sex || '',
    date: user.date || '',
    email: user.email || '',
    password: user.password || '',
    confirmPassword: user.confirmPassword || '',
  };

  console.log(userDataExists);
  // console.log(values);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     const user = JSON.parse(storedUser);

  //     fetchUserData(user.email);
  //   }
  // }, []);

  // const fetchUserData = async (email) => {
  //   try {
  //     const response = await axios.get('http://localhost:3001/users');
  //     const users = response.data;

  //     const user = users.find((user) => user.email === email);

  //     if (user) {
  //       setUserId(user.id);

  //       setValue('name', user.name);
  //       setValue('lastName', user.lastName);
  //       setValue('username', user.username);
  //       setValue('date', user.date);
  //       setValue('sex', user.sex);
  //       setValue('email', user.email);
  //       setValue('password', user.password);
  //       setValue('confirmPassword', user.password);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3001/users/${userId}`, data);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const logout = () => {
    dispatch(removeUser());
    navigate('/movie_app');
  };

  return (
    <div className="container">
      <div className="profile">
        <div className="profile-info">
          <span className="profile-title">
            You can change your personal data or logout
          </span>
          <div>
            {/* {user.map((user) => (
              <span>{user.name}</span>
            ))} */}
          </div>
          <div className="logout">
            <button className="form-btn" type="submit" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
        <UserForm
          btnName="Save"
          validationSchema={signupSchema}
          initialValues={signinFormInitialValues}
          formFields={signinFormFields}
          // inputValue={user}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          signinBtn={false}
          userDataExists={userDataExists}
        />
      </div>
    </div>
  );
};

export { ProfilePage };
