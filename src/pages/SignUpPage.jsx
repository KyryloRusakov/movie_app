import UserForm from 'components/UserForm';
import { signupSchema } from 'schemas';
import { signinFormInitialValues, signinFormFields } from 'constants/formFields';

const SignUpPage = () => (
  <div className="container">
    <UserForm
      btnName="Sign Up"
      validationSchema={signupSchema}
      initialValues={signinFormInitialValues}
      formFields={signinFormFields}
      signinBtn={false}
    />
  </div>
);

export { SignUpPage };
