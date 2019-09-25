import { connect } from 'react-redux';
import { withFormik } from 'formik';

import CreateEventForm from '../components/CreateEventForm';

const FormikCreateEventForm = withFormik({
  mapPropsToValues() {
    return {
      title: '',
      location: '',
      points: '',
      startTime: '',
      startAm: '',
      endTime: '',
      endAm: '',
      facebook: '',
      description: '',
    }
  },
  handleSubmit(values, { resetForm, props }) {
    console.log(values)
  },
})(CreateEventForm);

export default connect(
  null,
  null
)(FormikCreateEventForm);
