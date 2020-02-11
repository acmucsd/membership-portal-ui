import { connect } from 'react-redux';
import { withFormik } from 'formik';

import EditEventform from '../components/EditEventForm';
import { getMonthIndex } from '../utils';
import { editEvent } from '../actions/adminActions';

const curYear = new Date().getFullYear();

const FormikEditEventForm = withFormik({
  mapPropsToValues() {
    return {
      uuid: '0',
      title: 'a',
      location: 'a',
      pointValue: '100',
      startTime: '1',
      startAm: 'AM',
      endTime: '3',
      endAm: 'AM',
      month: '10',
      day: 0,
      cover: 'google.com',
      description: '123',
      attendanceCode: '123',
    }
  },
  handleSubmit(values, { resetForm, props }) {
    console.log(values);
    if (values.startTime === 12) {
      values.startTime = 0;
    }
    if (values.startAm === 'PM') {
      values.startTime += 12;
    }
    if (values.endTime === 12) {
      values.endTime = 0;
    }
    if (values.endAm === 'PM') {
      values.endTime += 12;
    }
    const event = {
      uuid: values.uuid,
      title: values.title,
      location: values.location,
      pointValue: values.pointValue,
      start: new Date(curYear, getMonthIndex(values.month), values.day, values.startTime).toUTCString(),
      end: new Date(curYear, getMonthIndex(values.month), values.day, values.endTime).toUTCString(),
      cover: values.cover,
      attendanceCode: values.attendanceCode,
      description: values.description
    }
    props.editEvent(event)
    .then((resp) => {
      resetForm();
    })
    .catch((error) => {
      console.log(error);
    })

  },
})(EditEventform);

export default connect(
  null,
  { editEvent }
)(FormikEditEventForm);
