import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import EditEventform from '../../components/EditEventForm';
import { getMonthIndex, notify } from '../../utils';
import { editEvent, deleteEvent } from '../../actions/adminActions';

import { useHistory } from 'react-router-dom';

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
      committee: '',
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
      committee: values.committee,
    };
    props
      .editEvent(event)
      .then(resp => {})
      .catch(error => {
        console.log(error);
      });
  },
})(EditEvntFormWithDelete);

function EditEvntFormWithDelete(props) {
  const history = useHistory();
  function handleDelete() {
    props
      .deleteEvent(props.values.uuid)
      .then(resp => {
        history.push('/');
      })
      .catch(error => {
        notify('Failed to delete the event', error);
        console.log(error);
      });
  }
  return <EditEventform handleDelete={handleDelete} {...props} />;
}

export default connect(null, { editEvent, deleteEvent })(FormikEditEventForm);
