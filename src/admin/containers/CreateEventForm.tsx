import { withFormik } from 'formik';
import * as Yup from 'yup';

import Moment from 'moment';
import CreateEventForm from '../components/CreateEventForm';
import { postEvent } from '../adminActions';
import { isURL } from '../../utils';

const CreateEventSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  pointValue: Yup.number().required('Required').moreThan(0, 'Must be greater than 0').integer('Must be an integer'),
  startDate: Yup.date().typeError('Not a date').required('Required'),
  startTime: Yup.date().typeError('Not a time').required('Required'),
  endDate: Yup.date().typeError('Not a date').required('Required'),
  endTime: Yup.date().typeError('Not a time').required('Required'),
  cover: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  attendanceCode: Yup.string().required('Required'),
  committee: Yup.string().required('Required'),
});

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
  validationSchema: CreateEventSchema,
  validateOnChange: false,
  validateOnBlur: false,
  handleSubmit(values, { resetForm }: { [key: string]: any }) {
    const { startDate, startTime, endDate, endTime } = values;

    const event = {
      title: values.title,
      location: isURL(values.location.trim()) ? values.location.trim().toLowerCase() : values.location.trim(),
      pointValue: values.pointValue,
      start: new Date(`${Moment(startDate).format(`LL`)} ${Moment(startTime).format(`LT`)}`).toISOString(),
      end: new Date(`${Moment(endDate).format(`LL`)} ${Moment(endTime).format(`LT`)}`).toISOString(),
      cover: values.cover,
      attendanceCode: values.attendanceCode,
      description: values.description,
      committee: values.committee,
    };

    postEvent(event)
      .then(() => {
        resetForm();
      })
      .catch(() => {});
  },
})(CreateEventForm as React.FC);

export default FormikCreateEventForm;
