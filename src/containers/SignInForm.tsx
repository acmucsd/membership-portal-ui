import { connect } from 'react-redux';
import { withFormik } from 'formik';

import SignInForm from '../components/SignInForm';
import { loginUser } from '../actions/authActions';

const FormikSignInForm = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
    };
  },
  handleSubmit(values, { resetForm, props }: { [key: string]: any }) {
    props.loginUser(values);
    resetForm();
  },
})(SignInForm as React.FC);

export default connect(null, { loginUser })(FormikSignInForm);
