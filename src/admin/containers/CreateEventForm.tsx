import { connect } from 'react-redux';
import { withFormik } from 'formik';

import CreateEventForm from '../components/CreateEventForm';
import { postEvent, copyLink } from '../adminActions';
import { notify } from '../../utils';

const FormikCreateEventForm = withFormik({
  mapPropsToValues() {
    return {
      title: '',
      location: '',
      pointValue: 0,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      cover: '',
      description: '',
      attendanceCode: '',
      committee: '',
    };
  },
  handleSubmit(values, { resetForm, props }: { [key: string]: any }) {
    const { startDate, startTime, endDate, endTime } = values;

    if (values.title === '') {
      notify('Event Creation Error', 'Title is required.');
      return;
    }

    if (values.location === '') {
      notify('Event Creation Error', 'Location is required.');
      return;
    }

    if (values.pointValue === 0) {
      notify('Event Creation Error', 'Points is required.');
      return;
    }

    if (!startDate) {
      notify('Event Creation Error', 'Start Date is required.');
      return;
    }

    if (!startTime) {
      notify('Event Creation Error', 'Start Time is required.');
      return;
    }

    if (!endDate) {
      notify('Event Creation Error', 'End Date is required.');
      return;
    }

    if (!endTime) {
      notify('Event Creation Error', 'End Time is required.');
      return;
    }

    if (values.cover === '') {
      notify('Event Creation Error', 'Cover is required.');
      return;
    }

    if (values.description === '') {
      notify('Event Creation Error', 'Description is required.');
      return;
    }

    if (values.attendanceCode === '') {
      notify('Event Creation Error', 'Attendance Code is required.');
      return;
    }

    if (values.committee === '') {
      notify('Event Creation Error', 'Community is required.');
      return;
    }

    const event = {
      title: values.title,
      location: values.location,
      pointValue: values.pointValue,
      start: new Date(`${startDate.format('LL')} ${startTime.format('LT')}`).toISOString(),
      end: new Date(`${endDate.format('LL')} ${endTime.format('LT')}`).toISOString(),
      cover: values.cover,
      attendanceCode: values.attendanceCode,
      description: values.description,
      committee: values.committee,
    };

    props
      .postEvent(event)
      .then(() => {
        resetForm();
      })
      .catch(() => {});
  },
})(CreateEventForm as React.FC);

export default connect(null, { postEvent, copyLink })(FormikCreateEventForm);
