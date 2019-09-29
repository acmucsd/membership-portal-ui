import { connect } from 'react-redux';
import { withFormik } from 'formik';

import CreateEventForm from '../components/CreateEventForm';
import { getMonthIndex } from '../utils';
import { postEvent } from '../actions/adminActions';

const FormikCreateEventForm = withFormik({
  mapPropsToValues() {
    return {
      title: '',
      location: '',
      pointValue: '',
      startTime: '',
      startAm: '',
      endTime: '',
      endAm: '',
      month: '',
      day: 0,
      cover: '',
      description: '',
      attendanceCode: '',
    }
  },
  handleSubmit(values, { resetForm, props }) {
    if (values.startAm === 'PM') {
      values.startTime += 12;
    }
    if (values.endAm === 'PM') {
      values.endTime += 12;
    }
    const event = {
      title: values.title,
      location: values.location,
      pointValue: values.pointValue,
      start: new Date(2019, values.day, getMonthIndex(values.month), values.startTime),
      end: new Date(2019, values.day, getMonthIndex(values.month), values.endTime),
      cover: values.cover,
      attendanceCode: values.attendanceCode,
      description: values.description
    }
    props.postEvent(event);
    resetForm();
  },
})(CreateEventForm);

export default connect(
  null,
  { postEvent }
)(FormikCreateEventForm);
