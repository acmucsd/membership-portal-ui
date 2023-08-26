import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import RegisterForm from '../components/RegisterForm';
import { registerAccount } from '../authActions';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().max(20, 'Too Long').required('Required'),
  lastName: Yup.string().max(20, 'Too Long').required('Required'),
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string().min(9, 'Password must be at least 9 characters').required('Required'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords Must Match')
    .required('Required'),
  major: Yup.string().min(2, 'Too Short').max(50, 'Too Long').required('Required'),
});

const FormikRegisterForm = withFormik({
  mapPropsToValues() {
    // TODO - Implement profile picture.
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmpassword: '',
      major: undefined, // to trigger the select placeholder
      graduationYear: new Date().getFullYear(),
    };
  },
  validationSchema: RegisterSchema,
  validateOnChange: false,
  validateOnBlur: false,
  handleSubmit(values, { props }: { [key: string]: any }) {
    props.registerAccount(values, props.search);
  },
})(RegisterForm as React.FC);

const mapStateToProps = (state: { [key: string]: any }) => ({
  search: state.router.location.search,
});

export default connect(mapStateToProps, { registerAccount })(FormikRegisterForm);
