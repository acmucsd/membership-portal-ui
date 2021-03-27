import { connect } from 'react-redux';
import { withFormik } from 'formik';

import AddAttendanceForm from '../components/AddAttendanceForm';
import { addAttendance } from '../adminActions';

const FormikAddAttendanceForm = withFormik({
  mapPropsToValues() {
    return {
      event: '',
      attendees: [],
    };
  },
  handleSubmit(values, { resetForm, props }: { [key: string]: any }) {
    const attendanceDetails = {
      event: values.event,
      attendees: values.attendees,
    };

    props
      .addAttendance(attendanceDetails)
      .then(() => {
        resetForm();
      })
      .catch(() => {});
  },
})(AddAttendanceForm as any);

export default connect(null, { addAttendance })(FormikAddAttendanceForm);
