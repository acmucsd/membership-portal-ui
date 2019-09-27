import { connect } from 'react-redux';
import { withFormik } from 'formik';

import RegisterForm from '../components/RegisterForm';
import { registerAccount } from '../actions/registerActions.js';

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
    ***REMOVED***
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
