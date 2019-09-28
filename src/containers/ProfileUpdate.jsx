import { connect } from 'react-redux';
import { withFormik } from 'formik';

import ProfileUpdate from '../components/ProfileUpdate';
import { updateUser } from '../actions/authActions';
const FormikProfileUpdate = withFormik({
    mapPropsToValues() {
      return {
        firstName: '',
      }
    },
    handleSubmit(values, { resetForm, props }) {
      props.loginUser(values);
      resetForm();
    },
  })(ProfileUpdate);
  
  export default connect(
    null,
    { updateUser}
  )(FormikProfileUpdate);
  