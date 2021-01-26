import { connect } from 'react-redux';
import { withFormik } from 'formik';

import SignInForm from '../components/SignInForm';
import { loginUser } from '../authActions';

const FormikSignInForm = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
    };
  },
  handleSubmit(values, { resetForm, props }: { [key: string]: any }) {
    props.loginUser(values, props.search);
    resetForm();
  },
})(SignInForm as React.FC);

const mapStateToProps = (state: { [key: string]: any }) => ({
  search: state.router.location.search,
});

export default connect(mapStateToProps, { loginUser })(FormikSignInForm);
