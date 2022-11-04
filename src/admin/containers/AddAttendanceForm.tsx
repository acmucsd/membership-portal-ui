import React, { useEffect } from 'react';
import { withFormik } from 'formik';
import { useSelector } from 'react-redux';
import { eventSelector, fetchPastEvents } from '../../event/eventSlice';
import { useAppDispatch } from '../../redux/store';
import { addAttendance, adminSelector, getEmails } from '../adminSlice';
import AddAttendanceForm from '../components/AddAttendanceForm';

const AddAttendanceFormContainer = () => {
  const { emails } = useSelector(adminSelector);
  const { pastEvents } = useSelector(eventSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEmails());
    dispatch(fetchPastEvents());
  }, [dispatch]);

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
    handleSubmit(values) {
      const attendanceDetails = {
        attendees: values.attendees,
        event: values.event,
        asStaff: values.staff,
      };
      addAttendanceFunction(attendanceDetails).catch(() => {});
    },
  })(AddAttendanceForm as any);
  return <FormikAddAttendanceForm />;
};

export default AddAttendanceFormContainer;
