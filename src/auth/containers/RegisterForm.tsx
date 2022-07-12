import { withFormik } from 'formik';
import * as Yup from 'yup';
import history from '../../history';
import { registerAccount } from '../utils';
import RegisterForm from '../components/RegisterForm';
import { UserRegistration } from '../../api';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().max(20, 'Too Long').required('Required'),
  lastName: Yup.string().max(20, 'Too Long').required('Required'),
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string().min(9, 'Password must be at least 9 characters').max(20, 'Password must be at most 20 characters').required('Required'),
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
  handleSubmit(values) {
    // Convert values to unkown to deal with major initially being undefined
    registerAccount((values as unknown) as UserRegistration, history.location.search);
  },
})(RegisterForm as React.FC);

export default FormikRegisterForm;
