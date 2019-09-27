import { connect } from 'react-redux';
import { withFormik } from 'formik';

import SignInForm from '../components/SignInForm';

const ProfileUpdate = withFormik({
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
  