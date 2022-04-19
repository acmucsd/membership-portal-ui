import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import AddAttendanceForm from '../components/AddAttendanceForm';
import { addAttendance, getAllEmails as getAllEmailsConnect } from '../adminActions';
import { fetchPastEvents as fetchPastEventsConnect } from '../../event/eventActions';

const AddAttendanceFormContainer = (props) => {
  const { emails, pastEvents, addAttendance: addAttendanceFunction, fetchPastEventsConnect, getAllEmailsConnect } = props; // eslint-disable-line no-shadow

  useEffect(() => {
    getAllEmailsConnect();
    fetchPastEventsConnect();
  }, [fetchPastEventsConnect, getAllEmailsConnect]);

  const FormikAddAttendanceForm = withFormik({
    mapPropsToValues() {
      return {
        attendees: [],
        emails,
        pastEvents,
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
      addAttendanceFunction(attendanceDetails)
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

export default connect(mapStateToProps, { addAttendance, getAllEmailsConnect, fetchPastEventsConnect })(AddAttendanceFormContainer);
