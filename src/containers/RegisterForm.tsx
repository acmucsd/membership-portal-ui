import { connect } from 'react-redux';
import { withFormik } from 'formik';

import RegisterForm from '../components/RegisterForm';
import { registerAccount } from '../actions/registerActions';

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
  handleSubmit(values, { props }: { [key: string]: any }) {
    props.registerAccount(values);
  },
})(RegisterForm as React.FC);

export default connect(null, { registerAccount })(FormikRegisterForm);
