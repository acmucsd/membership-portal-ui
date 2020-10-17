import { connect } from 'react-redux';
import { withFormik } from 'formik';

import CreateEventForm from '../../components/admin/CreateEventForm';
import { postEvent, copyLink } from '../../actions/adminActions';

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
