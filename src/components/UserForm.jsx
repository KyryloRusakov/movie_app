import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { setLoggedIn } from 'store/authSlice';
import RadioButtons from './formControls/RadioButtons';

const UserForm = ({
  initialValues, validationSchema, btnName, formFields, signinBtn,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    actions.resetForm();
    dispatch(setLoggedIn());
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
    initialValues,
    validationSchema,
    onSubmit,
  });

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
          <Link className="form-link" to="/signup">
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
