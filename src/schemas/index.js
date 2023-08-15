import * as yup from 'yup';

const regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

const isAdult = (birthday) => {
  const ageDifMs = Date.now() - birthday;
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is a required field'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .matches(regex, {
      message: 'Password must have at least one digit and one letter.',
    })
    .required('Password is a required field'),
});

export const signupSchema = yup.object().shape({
  firstName: yup.string().required('Please enter your name'),
  lastName: yup.string(),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is a required field'),
  date: yup
    .date()
    .required('Please enter your child\'s birthday/due date')
    .test('adult', 'Only above 18', (val) => isAdult(new Date(val)) > 17),
  sex: yup.string().required('Select your gender'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .matches(regex, {
      message: 'Password must have at least one digit and one letter.',
    })
    .required('Password is a required field'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Confirm password is a required field'),
});
