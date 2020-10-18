import { connect } from 'react-redux';
import { withFormik } from 'formik';

import EditEventform from '../../components/EditEventForm';
import { editEvent, deleteEvent, copyLink } from '../../actions/adminActions';

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
