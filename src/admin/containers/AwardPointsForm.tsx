import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { awardPoints } from '../adminSlice';
import AwardPointsForm from '../components/AwardPointsForm';

const FormikAwardPointsForm = withFormik({
  mapPropsToValues() {
    return {
      points: 0,
      awardees: [],
      description: '',
    };
  },
  handleSubmit(values, { resetForm, props }: { [key: string]: any }) {
    const pointDetails = {
      points: Number(values.points),
      users: values.awardees,
      description: values.description,
    };

    props
      .awardPoints(pointDetails)
      .then(() => resetForm())
      .catch(() => {});
  },
})(AwardPointsForm as any);

export default connect(null, { awardPoints })(FormikAwardPointsForm);
