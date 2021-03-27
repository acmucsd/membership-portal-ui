import React from 'react';
import { connect } from 'react-redux';

import AddAttendancePage from '../components/AddAttendancePage';
import PageLayout from '../../layout/containers/PageLayout';

const AddAttendancePageContainer: React.FC = () => {
  return (
    <PageLayout>
      <AddAttendancePage />
    </PageLayout>
  );
};

export default connect(null, {})(AddAttendancePageContainer);
