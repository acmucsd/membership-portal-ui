import { withFormik } from 'formik';
import { useContext } from 'react';
import { fetchUser } from '../../auth/utils';
import { AppContext } from '../../context';
import ProfileUpdate from '../components/ProfileUpdate';
import { updateProfile } from '../utils';

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
  handleSubmit(values) {
    const { setUser } = useContext(AppContext);

    updateProfile(values)
      .then(() => {
        fetchUser().then(setUser);
      })
      .catch(() => {});
  },
})(ProfileUpdate as React.FC);

export default FormikProfileUpdate;
