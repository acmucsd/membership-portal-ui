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
      committee: '',
    };
  },
  handleSubmit(values, { resetForm, props }: { [key: string]: any }) {
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
      title: values.title,
      location: values.location,
      pointValue: values.pointValue,
      start: new Date(
        values.year,
        getMonthIndex(values.month),
        values.day,
        startTime,
      ).toUTCString(),
      end: new Date(values.year, getMonthIndex(values.month), values.day, endTime).toUTCString(),
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

export default connect(null, { postEvent })(FormikCreateEventForm);
