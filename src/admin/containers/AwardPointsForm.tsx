import { withFormik } from 'formik';
import { awardPoints } from '../utils';
import AwardPointsForm from '../components/AwardPointsForm';

const FormikAwardPointsForm = withFormik({
  mapPropsToValues() {
    return {
      points: 0,
      awardees: [],
      description: '',
    };
  },
  handleSubmit(values, { resetForm }) {
    const pointDetails = {
      points: Number(values.points),
      users: values.awardees,
      description: values.description,
    };

    awardPoints(pointDetails)
      .then(() => resetForm())
      .catch(() => {});
  },
})(AwardPointsForm as any);

export default FormikAwardPointsForm;
