import { connect } from 'react-redux';
import { withFormik } from 'formik';

import ProfileUpdate from '../components/ProfileUpdate';
import { updateProfile } from '../actions/profileActions';

const FormikProfileUpdate = withFormik({
  mapPropsToValues() {
    return {
      firstName: '',
      lastName: '',
      graduationYear: 0,
      major: '',
      about: '',
    };
  },
  handleSubmit(values, { resetForm, props }) {
    props.updateProfile(values);
    resetForm();
  },
})(ProfileUpdate);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  { updateProfile }
)(FormikProfileUpdate);
