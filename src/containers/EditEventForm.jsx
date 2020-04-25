import { connect } from 'react-redux';
import { withFormik } from 'formik';

import EditEventform from '../components/EditEventForm';
import { getMonthIndex } from '../utils';
import { editEvent } from '../actions/adminActions';

const curYear = new Date().getFullYear();

const FormikEditEventForm = withFormik({
  mapPropsToValues() {
    return {
      uuid: '',
      title: '',
      location: '',
      pointValue: '',
      startTime: '',
      startAm: '',
      endTime: '',
      endAm: '',
      month: '',
      year: '',
      day: 0,
      cover: '',
      description: '',
      attendanceCode: '',
    };
  },
  handleSubmit(values, { resetForm, props }) {
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
      start: new Date(values.year, getMonthIndex(values.month), values.day, values.startTime).toUTCString(),
      end: new Date(values.year, getMonthIndex(values.month), values.day, values.endTime).toUTCString(),
      cover: values.cover,
      attendanceCode: values.attendanceCode,
      description: values.description,
    };
    props
      .editEvent(event)
      .then(resp => {})
      .catch(error => {
        console.log(error);
      });
  },
})(EditEventform);

export default connect(null, { editEvent })(FormikEditEventForm);
