import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { fetchUser } from '../../auth/authSlice';
import ProfileUpdate from '../components/ProfileUpdate';
import { updateProfile } from '../profileSlice';

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
      .then(() => {
        props.fetchUser();
      })
      .catch(() => {});
  },
})(ProfileUpdate as React.FC);

const mapStateToProps = (state: { [key: string]: any }) => ({
  user: state.auth,
});

export default connect(mapStateToProps, { updateProfile, fetchUser })(FormikProfileUpdate);
