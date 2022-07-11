import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import { fetchPastEvents } from '../../event/utils';
import { addAttendance, getEmails } from '../utils';
import AddAttendanceForm from '../components/AddAttendanceForm';
import { PublicEvent } from '../../api';

const AddAttendanceFormContainer = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [pastEvents, setPastEvents] = useState<PublicEvent[]>([]);

  useEffect(() => {
    getEmails().then(setEmails); // TODO: Move to context
    fetchPastEvents().then(setPastEvents); // TODO: Move to context
  }, []);

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
        users: values.attendees,
        event: values.event,
        asStaff: values.staff,
      };

      addAttendance(attendanceDetails)
        .then(resetForm)
        .catch(() => {});
    },
  })(AddAttendanceForm as any);
  return <FormikAddAttendanceForm />;
};

export default AddAttendanceFormContainer;
