import { connect } from 'react-redux';
import { withFormik } from 'formik';

import RegisterForm from '../components/RegisterForm';
import { registerAccount } from '../actions/registerActions.js';

const FormikRegisterForm = withFormik({
  mapPropsToValues() {
    // TODO - Implement profile picture.
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmpassword: '',
      major: '',
      graduationYear: 0,
    };
  },
  handleSubmit(values, { resetForm, props }) {
    props.registerAccount(values);
    resetForm();
  },
})(RegisterForm);

export default connect(
  null,
  { registerAccount }
)(FormikRegisterForm);
