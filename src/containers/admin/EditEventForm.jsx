import { connect } from 'react-redux';
import { withFormik } from 'formik';

import EditEventform from '../../components/EditEventForm';
import { getMonthIndex } from '../../utils';
import { editEvent } from '../../actions/adminActions';

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
      committee: '',
    };
  },
  handleSubmit(values, { props }) {
    let { startTime } = values;
    let { endTime } = values;

    if (values.startTime === 12) {
      startTime = 0;
    }
    if (values.startAm === 'PM') {
      startTime += 12;
    }
    if (values.endTime === 12) {
      endTime = 0;
    }
    if (values.endAm === 'PM') {
      endTime += 12;
    }
    const event = {
      uuid: values.uuid,
      title: values.title,
      location: values.location,
      pointValue: values.pointValue,
      start: new Date(
        values.year,
        getMonthIndex(values.month),
        values.day,
        startTime
      ).toUTCString(),
      end: new Date(
        values.year,
        getMonthIndex(values.month),
        values.day,
        endTime
      ).toUTCString(),
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
})(EditEventform);

export default connect(null, { editEvent })(FormikEditEventForm);
