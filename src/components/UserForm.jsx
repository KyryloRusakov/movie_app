import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import RadioButtons from './formControls/RadioButtons';

const UserForm = ({
  initialValues,
  validationSchema,
  btnName,
  formFields,
  signinBtn,
  onSubmit,
  isSubmitting,
  inputValue,
  userDataExists,
}) => {
  const {
    values,
    setValues,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  if (userDataExists) {
    initialValues.firstName = userDataExists.firstName;
    initialValues.lastName = userDataExists.lastName;
    initialValues.sex = userDataExists.sex;
    initialValues.date = userDataExists.date;
    initialValues.email = userDataExists.email;
    initialValues.password = userDataExists.password;
    initialValues.confirmPassword = userDataExists.confirmPassword;
  }

  // console.log(values);

  return (
    <form className="form" onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <div className="form-control-wrapper" key={field.id}>
          <label>
            {field.title}
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={values[field.id]}
              max={field.max}
              className={
                errors[field.id] && touched[field.id]
                  ? 'form-input invalid'
                  : 'form-input'
              }
            />
            {errors[field.id] && touched[field.id] && (
              <span className="form-error">{errors[field.id]}</span>
            )}
          </label>
          {field.id === 'lastName' && (
            <RadioButtons
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
            />
          )}
        </div>
      ))}
      <div className="form-footer">
        {signinBtn && (
          <Link className="form-link" to="/movie_app/signup">
            Sign In
          </Link>
        )}
        <button disabled={isSubmitting} className="form-btn" type="submit">
          {btnName}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
