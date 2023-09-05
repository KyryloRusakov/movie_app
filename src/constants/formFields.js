export const signinFormInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  date: '',
  sex: '',
  password: '',
  confirmPassword: '',
};

export const loginFormInitialValues = {
  email: '',
  password: '',
};

export const signinFormFields = [
  {
    title: 'First Name:',
    value: 'firstName',
    id: 'firstName',
    type: 'text',
    placeholder: 'Enter your first name',
  },
  {
    title: 'Last Name:',
    value: 'lastName',
    id: 'lastName',
    type: 'text',
    placeholder: 'Enter your last name',
  },
  {
    title: 'Date of birth:',
    value: 'date',
    id: 'date',
    type: 'date',
    placeholder: 'Select your date of birth',
  },
  {
    title: 'Email:',
    value: 'email',
    id: 'email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    title: 'Password:',
    value: 'password',
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
  },
  {
    title: 'Confirm Password:',
    value: 'confirmPassword',
    id: 'confirmPassword',
    type: 'confirmPassword',
    placeholder: 'Confirm your password',
  },
];

export const loginFormFields = [
  {
    title: 'Email:',
    value: 'email',
    id: 'email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    title: 'Password:',
    value: 'password',
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
  },
];
