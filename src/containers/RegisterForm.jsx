import { connect } from 'react-redux';
import { withFormik } from 'formik';

import RegisterForm from '../components/RegisterForm';
import { registerAccount } from '../actions/registerAction.js';

const FormikRegisterForm = withFormik({
  mapPropsToValues() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpassword: '',
      major: '',
      year: '',
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
