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
      bio: '',
    };
  },
  handleSubmit(values, { props }: { [key: string]: any }) {
    props
      .updateProfile(values)
      .then(() => {})
      .catch(() => {});
  },
})(ProfileUpdate as React.FC);

const mapStateToProps = (state: { [key: string]: any }) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateProfile })(FormikProfileUpdate);
