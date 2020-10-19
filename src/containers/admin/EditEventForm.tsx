import { connect } from 'react-redux';
import { withFormik } from 'formik';

import EditEventform from '../../components/admin/EditEventForm';
import { editEvent, deleteEvent, copyLink } from '../../actions/adminActions';
import { notify } from '../../utils';

const FormikEditEventForm = withFormik({
  mapPropsToValues() {
    return {
      uuid: '',
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
  handleSubmit(values, { props }: { [key: string]: any }) {
    const { startDate, startTime, endDate, endTime } = values;

    if (values.title === '') {
      notify('Event Edit Error', 'Title is required.');
      return;
    }

    if (values.location === '') {
      notify('Event Edit Error', 'Location is required.');
      return;
    }

    if (values.pointValue === 0) {
      notify('Event Edit Error', 'Points is required.');
      return;
    }

    if (!startDate) {
      notify('Event Edit Error', 'Start Date is required.');
      return;
    }

    if (!startTime) {
      notify('Event Edit Error', 'Start Time is required.');
      return;
    }

    if (!endDate) {
      notify('Event Edit Error', 'End Date is required.');
      return;
    }

    if (!endTime) {
      notify('Event Edit Error', 'End Time is required.');
      return;
    }

    if (values.cover === '') {
      notify('Event Edit Error', 'Cover is required.');
      return;
    }

    if (values.description === '') {
      notify('Event Edit Error', 'Description is required.');
      return;
    }

    if (values.attendanceCode === '') {
      notify('Event Edit Error', 'Attendance Code is required.');
      return;
    }

    if (values.committee === '') {
      notify('Event Edit Error', 'Community is required.');
      return;
    }

    const event = {
      uuid: values.uuid,
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
      .editEvent(event)
      .then(() => {})
      .catch(() => {});
  },
})(EditEventform as React.FC);

export default connect(null, { editEvent, deleteEvent, copyLink })(FormikEditEventForm);
