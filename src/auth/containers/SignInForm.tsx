import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import SignInForm from '../components/SignInForm';
import { loginUser } from '../authActions';
import history from '../../history';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string().min(1, 'Password must be at least 1 character').required('Required'),
});

const FormikSignInForm = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
    };
  },
  validationSchema: LoginSchema,
  validateOnChange: false,
  validateOnBlur: false,
  handleSubmit(values, { resetForm, props }: { [key: string]: any }) {
    props.loginUser(values, history.location.search);
    resetForm();
  },
})(SignInForm as React.FC);

export default connect(null, { loginUser })(FormikSignInForm);
