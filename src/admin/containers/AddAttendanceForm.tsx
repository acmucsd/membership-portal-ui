import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import AddAttendanceForm from '../components/AddAttendanceForm';
import { addAttendance, getAllEmails as getAllEmailsConnect } from '../adminActions';
import { fetchPastEvents as fetchPastEventsConnect } from '../../event/eventActions';

const AddAttendanceFormContainer = (props) => {
  const { fetchPastEventsConnect, getAllEmailsConnect } = props; // eslint-disable-line no-shadow

  useEffect(() => {
    getAllEmailsConnect();
    fetchPastEventsConnect();
  }, [fetchPastEventsConnect, getAllEmailsConnect]);

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
      // turn event name to event uuid
      const eventUuid = props.pastEvents.filter((event) => event.title === values.event)[0].uuid;
      const attendanceDetails = {
        attendees: values.attendees,
        event: eventUuid,
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

export default connect(mapStateToProps, { addAttendance, getAllEmailsConnect, fetchPastEventsConnect })(AddAttendanceFormContainer);
