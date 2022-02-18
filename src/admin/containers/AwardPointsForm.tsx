import { withFormik } from 'formik';

import AwardPointsForm from '../components/AwardPointsForm';
import { awardPoints } from '../adminActions';

const FormikAwardPointsForm = withFormik({
  mapPropsToValues() {
    return {
      points: 0,
      awardees: [],
      description: '',
    };
  },
  handleSubmit(values, { resetForm }: { [key: string]: any }) {
    const pointDetails = {
      points: Number(values.points),
      users: values.awardees,
      description: values.description,
    };

    awardPoints(pointDetails)
      .then(() => {
        resetForm();
      })
      .catch(() => {});
  },
})(AwardPointsForm as any);

export default FormikAwardPointsForm;
