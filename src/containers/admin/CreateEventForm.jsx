import { connect } from 'react-redux';
import { withFormik } from 'formik';

import CreateEventForm from '../../components/admin/CreateEventForm';
import { getMonthIndex } from '../../utils';
import { postEvent } from '../../actions/adminActions';

const curYear = new Date().getFullYear();

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
      year: curYear,
      cover: '',
      description: '',
      attendanceCode: '',
    };
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
      .postEvent(event)
      .then(resp => {
        resetForm();
      })
      .catch(error => {
        console.log(error);
      });
  },
})(CreateEventForm);

export default connect(null, { postEvent })(FormikCreateEventForm);
