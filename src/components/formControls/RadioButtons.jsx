const radioButtons = ({
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
}) => (
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
          errors.female && touched.female ? 'form-input invalid' : 'form-input'
        }
      />
    </label>
    {errors.sex && touched.sex && (
      <span className="form-error">{errors.sex}</span>
    )}
  </div>
);
export default radioButtons;
