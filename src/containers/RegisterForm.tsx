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
    props.registerAccount(values, props.search);
  },
})(RegisterForm as React.FC);

const mapStateToProps = (state: { [key: string]: any }) => ({
  search: state.router.location.search,
});

export default connect(mapStateToProps, { registerAccount })(FormikRegisterForm);
