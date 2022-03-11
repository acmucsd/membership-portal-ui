import { withFormik } from 'formik';
import React, { useEffect } from 'react';
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
    handleSubmit(values, { resetForm }: { [key: string]: any }) {
      const attendanceDetails = {
        attendees: values.attendees,
        event: values.event,
        asStaff: values.staff,
      };
      dispatch(addAttendance(attendanceDetails)).unwrap().then(resetForm).catch();
    },
  })(AddAttendanceForm as any);
  return <FormikAddAttendanceForm />;
};

export default AddAttendanceFormContainer;
