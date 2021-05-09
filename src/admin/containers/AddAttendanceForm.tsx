import { connect } from 'react-redux';
import { withFormik } from 'formik';

import AddAttendanceForm from '../components/AddAttendanceForm';
import { addAttendance, getAllEmails } from '../adminActions';

const FormikAddAttendanceForm = withFormik({
  mapPropsToValues(props: { [key:string]: any}) {
    return {
      event: '',
      attendees: [],
      emails: []
    };
  },
  handleSubmit(values, { resetForm, props }: { [key: string]: any }) {
    //console.log(props);
    // props.getAllEmails();
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

/*const mapStateToProps = (state: { [key: string]: any }) => ({
  emails: state.emailList,
});*/

export default connect(/*mapStateToProps*/null, { addAttendance, getAllEmails })(FormikAddAttendanceForm);
