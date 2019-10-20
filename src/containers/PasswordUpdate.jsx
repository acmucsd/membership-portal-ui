import { connect } from 'react-redux';
import { withFormik } from 'formik';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { updatePassword } from '../actions/authActions';
import PasswordReset from '../components/PasswordReset';

const PasswordResetContainer = (props) => {
  const params = useParams();
  useEffect(() => {
    console.log(params);
    props.setFieldValue('code', params.code);
  }, []);

  return (
    <PasswordReset />
  )
}

const FormikPasswordForm = withFormik({
  mapPropsToValues() {
    return {
      code: '',
      newPassword: '',
      confirmPassword: '',
    };
  },
  handleSubmit(values, { resetForm, props }) {
    console.log('WTF')
    console.log(values);
    props.updatePassword(values);
  },
})(PasswordResetContainer);

export default connect(
  null,
  { updatePassword }
)(FormikPasswordForm);
