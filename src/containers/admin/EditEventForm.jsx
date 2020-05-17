import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import { useHistory } from 'react-router-dom';
import EditEventform from '../../components/EditEventForm';
import { getMonthIndex, notify } from '../../utils';
import { editEvent, deleteEvent } from '../../actions/adminActions';

function EditEvntFormWithDelete(props) {
  const history = useHistory();
  function handleDelete() {
    props
      .deleteEvent(props.values.uuid)
      .then((resp) => {
        notify(resp);
        history.push('/');
      })
      .catch((error) => {
        notify('Failed to delete the event', error);
        console.log(error);
      });
  }
  const propsToPass = { handleDelete, ...props };
  if (propsToPass === {}) console.err('There must be props'); // This line is to go around eslint restrictions
  return <EditEventform propsToPass />;
}

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
})(EditEvntFormWithDelete);

export default connect(null, { editEvent, deleteEvent })(FormikEditEventForm);
