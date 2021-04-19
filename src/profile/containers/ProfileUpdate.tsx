import { connect } from 'react-redux';
import { withFormik } from 'formik';

import ProfileUpdate from '../components/ProfileUpdate';
import { updateProfile } from '../profileActions';

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
    // Run updateProfile action. Bio must be null if blank, because empty strings aren't accepted by the backend.
    props.updateProfile({ ...values, bio: values.bio === '' ? null : values.bio });
  },
})(ProfileUpdate as React.FC);

const mapStateToProps = (state: { [key: string]: any }) => ({
  user: state.auth,
});

export default connect(mapStateToProps, { updateProfile })(FormikProfileUpdate);
