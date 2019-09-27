import { connect } from 'react-redux';
import { withFormik } from 'formik';

import ProfileUpdate from '../components/SignInForm';
// TODO: fix the h1 size
const FormikProfileUpdate = withFormik({
    mapPropsToValues() {
      return {
        email: '',
        password: '',
      }
    },
    handleSubmit(values, { resetForm, props }) {
      props.loginUser(values);
      resetForm();
      props.redirectHome();
    },
  })(SignInForm);
  
  export default connect(
    null,
    { loginUser, redirectHome}
  )(FormikSignInForm);
  