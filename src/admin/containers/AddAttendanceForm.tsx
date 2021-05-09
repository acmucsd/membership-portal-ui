import { connect } from 'react-redux';
import { withFormik } from 'formik';

import AddAttendanceForm from '../components/AddAttendanceForm';
import { addAttendance, getAllEmails } from '../adminActions';

const FormikAddAttendanceForm = withFormik({
  mapPropsToValues() {
    return {
      attendees: [],
      event: '',
      staff: false,
    };
  },
  handleSubmit(values, { resetForm, props }: { [key: string]: any }) {
    const attendanceDetails = {
      attendees: values.attendees,
      event: values.event,
      asStaff: values.staff,
    };
    props
      .addAttendance(attendanceDetails)
      .then(() => {
        resetForm();
      })
      .catch(() => {});
  },
})(AddAttendanceForm as any);

export default connect(null, { addAttendance, getAllEmails })(FormikAddAttendanceForm);
