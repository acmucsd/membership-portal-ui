import { connect } from 'react-redux';
import { withFormik } from 'formik';

import AwardPointsForm from '../../components/admin/AwardPointsForm';
import { awardPoints } from '../../actions/adminActions';

const curYear = new Date().getFullYear();

const FormikAwardPointsForm = withFormik({
  mapPropsToValues() {
    return {
      points: 0,
      awardees: [],
      description: '',
    ***REMOVED***
  },
  handleSubmit(values, { resetForm, props }) {
    const pointDetails = {
      points: values.points,
      users: values.awardees,
      description: values.description,
    ***REMOVED***

    props
      .awardPoints(pointDetails)
      .then(() => {
        resetForm();
***REMOVED***
      .catch(error => {
        console.log(error);
***REMOVED***;
  },
})(AwardPointsForm);

export default connect(null, { awardPoints })(FormikAwardPointsForm);
