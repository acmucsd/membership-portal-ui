import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import SignInForm from '../components/SignInForm';
import { loginUser } from '../actions/authActions';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string()
    .min(9, 'Password must be at least 9 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Required'),
});

const FormikSignInForm = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
    };
  },
  validationSchema: SignInSchema,
  validateOnChange: false,
  validateOnBlur: false,
  handleSubmit(values, { resetForm, props }: { [key: string]: any }) {
    props.loginUser(values, props.search);
    resetForm();
  },
})(SignInForm as React.FC);

const mapStateToProps = (state: { [key: string]: any }) => ({
  search: state.router.location.search,
});

export default connect(mapStateToProps, { loginUser })(FormikSignInForm);
