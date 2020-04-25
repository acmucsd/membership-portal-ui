import { connect } from 'react-redux';
import { withFormik } from 'formik';

import SignInForm from '../components/SignInForm';
import { loginUser } from '../actions/authActions';

const FormikSignInForm = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
    ***REMOVED***
  },
  handleSubmit(values, { resetForm, props }) {
    props.loginUser(values);
    resetForm();
  },
})(SignInForm);

export default connect(null, { loginUser })(FormikSignInForm);
