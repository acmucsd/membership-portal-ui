import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Moment from 'moment';

import EditEventForm from '../components/EditEventForm';
import { editEvent, deleteEvent, copyLink } from '../adminActions';
import { isURL } from '../../utils';

const EditEventSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  eventLink: Yup.string(),
  pointValue: Yup.number().required('Required').moreThan(0, 'Must be greater than 0').integer('Must be an integer'),
  startDate: Yup.date().typeError('Not a date').required('Required'),
  startTime: Yup.date().typeError('Not a time').required('Required'),
  endDate: Yup.date().typeError('Not a date').required('Required'),
  endTime: Yup.date().typeError('Not a time').required('Required'),
  cover: Yup.string().nullable(),
  description: Yup.string().required('Required'),
  attendanceCode: Yup.string().required('Required'),
  committee: Yup.string().required('Required'),
});

const FormikEditEventForm = withFormik({
  mapPropsToValues() {
    return {
      uuid: '',
      title: '',
      location: '',
      eventLink: '',
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
  validationSchema: EditEventSchema,
  validateOnChange: false,
  validateOnBlur: false,
  handleSubmit(values, { props }: { [key: string]: any }) {
    const { startDate, startTime, endDate, endTime } = values;

    const event = {
      uuid: values.uuid,
      title: values.title,
      location: isURL(values.location.trim()) ? values.location.trim().toLowerCase() : values.location.trim(),
      eventLink: isURL(values.eventLink.trim()) ? values.eventLink.trim().toLowerCase() : values.eventLink.trim(),
      pointValue: values.pointValue,
      start: new Date(`${Moment(startDate).format(`LL`)} ${Moment(startTime).format(`LT`)}`).toISOString(),
      end: new Date(`${Moment(endDate).format(`LL`)} ${Moment(endTime).format(`LT`)}`).toISOString(),
      cover: values.cover === null ? undefined : values.cover,
      attendanceCode: values.attendanceCode,
      description: values.description,
      committee: values.committee,
    };

    props
      .editEvent(event)
      .then(() => {})
      .catch(() => {});
  },
})(EditEventForm as React.FC);

export default connect(null, { editEvent, deleteEvent, copyLink })(FormikEditEventForm);
