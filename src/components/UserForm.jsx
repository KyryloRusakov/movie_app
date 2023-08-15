import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { signupSchema } from 'schemas';

const UserForm = ({ btnName }) => {
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
      firstName: '',
      lastName: '',
      email: '',
      date: '',
      sex: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit,
  });

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-control-wrapper">
        <label>
          First Name:
          <input
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            className={
              errors.firstName && touched.firstName
                ? 'form-input invalid'
                : 'form-input'
            }
          />
          {errors.firstName && touched.firstName && (
            <span className="form-error">{errors.firstName}</span>
          )}
        </label>
      </div>
      <div className="form-control-wrapper">
        <label>
          Last Name:
          <input
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            className={
              errors.lastName && touched.lastName
                ? 'form-input invalid'
                : 'form-input'
            }
          />
          {errors.lastName && touched.lastName && (
            <span className="form-error">{errors.lastName}</span>
          )}
        </label>
      </div>
      <div className="form-control-wrapper">
        <label>
          Date of birth:
          <input
            value={values.date}
            onChange={handleChange}
            onBlur={handleBlur}
            id="date"
            type="date"
            placeholder="Select your date of birth"
            className={
              errors.date && touched.date ? 'form-input invalid' : 'form-input'
            }
          />
          {errors.date && touched.date && (
            <span className="form-error">{errors.date}</span>
          )}
        </label>
      </div>
      <div className="form-radiobtn-wrapper" id="sex">
        Your sex:
        <label className="form-radiobtn">
          Male
          <input
            value="male"
            onChange={handleChange}
            onBlur={handleBlur}
            name="sex"
            type="radio"
            checked={values.sex === 'male'}
            className={
              errors.male && touched.male ? 'form-input invalid' : 'form-input'
            }
          />
        </label>
        <label className="form-radiobtn">
          Female
          <input
            value="female"
            onChange={handleChange}
            onBlur={handleBlur}
            name="sex"
            type="radio"
            checked={values.sex === 'female'}
            className={
              errors.female && touched.female
                ? 'form-input invalid'
                : 'form-input'
            }
          />
        </label>
        {errors.sex && touched.sex && (
          <span className="form-error">{errors.sex}</span>
        )}
      </div>
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
          {errors.email && touched.email && (
            <span className="form-error">{errors.email}</span>
          )}
        </label>
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
          {errors.password && touched.password && (
            <span className="form-error">{errors.password}</span>
          )}
        </label>
      </div>
      <div className="form-control-wrapper">
        <label>
          Confirm Password:
          <input
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className={
              errors.confirmPassword && touched.confirmPassword
                ? 'form-input invalid'
                : 'form-input'
            }
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span className="form-error">{errors.confirmPassword}</span>
          )}
        </label>
      </div>
      <div className="form-footer">
        <button disabled={isSubmitting} className="form-btn" type="submit">
          {btnName}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
