import { withFormik } from 'formik';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPastEvents as fetchPastEventsConnect } from '../../event/eventActions';
import { addAttendance, getEmails } from '../adminSlice';
import AddAttendanceForm from '../components/AddAttendanceForm';

const AddAttendanceFormContainer = (props) => {
  const { fetchPastEventsConnect, getEmails } = props; // eslint-disable-line no-shadow

  useEffect(() => {
    getEmails();
    fetchPastEventsConnect();
  }, [fetchPastEventsConnect, getEmails]);

  const FormikAddAttendanceForm = withFormik({
    mapPropsToValues() {
      return {
        attendees: [],
        emails: props.emails,
        pastEvents: props.pastEvents,
        event: '',
        staff: false,
      };
    },
    handleSubmit(values, { resetForm }: { [key: string]: any }) {
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
  return <FormikAddAttendanceForm />;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  emails: state.admin.emails,
  pastEvents: state.event.pastEvents,
});

export default connect(mapStateToProps, { addAttendance, getEmails, fetchPastEventsConnect })(AddAttendanceFormContainer);
