import { loginSchema } from 'schemas';
import UserForm from 'components/UserForm';
import { loginFormInitialValues, loginFormFields } from 'constants/formFields';

const LoginPage = () => (
  <div className="container">
    <UserForm
      btnName="Login"
      validationSchema={loginSchema}
      initialValues={loginFormInitialValues}
      formFields={loginFormFields}
      signinBtn
    />
  </div>
);

export { LoginPage };
