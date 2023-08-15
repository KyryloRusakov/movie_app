import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from 'schemas';

const LoginPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    actions.resetForm();

    navigate('/');
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-control-wrapper">
          <label>
            Email:
            <input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              id="email"
              type="email"
              placeholder="Enter your email"
              className={
                errors.email && touched.email
                  ? 'form-input invalid'
                  : 'form-input'
              }
            />
          </label>
          {errors.email && touched.email && (
            <span className="form-error">{errors.email}</span>
          )}
        </div>
        <div className="form-control-wrapper">
          <label>
            Password:
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              id="password"
              type="password"
              placeholder="Enter your password"
              className={
                errors.password && touched.password
                  ? 'form-input invalid'
                  : 'form-input'
              }
            />
          </label>
          {errors.password && touched.password && (
            <span className="form-error">{errors.password}</span>
          )}
        </div>
        <div className="form-footer">
          <Link className="form-link" to="/signup">
            Sign In
          </Link>
          <button disabled={isSubmitting} className="form-btn" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export { LoginPage };
