import React from 'react';

import AddAttendancePage from '../components/AddAttendancePage';
import PageLayout from '../../layout/containers/PageLayout';

const AddAttendancePageContainer: React.FC = () => {
  return (
    <PageLayout>
      <AddAttendancePage />
    </PageLayout>
  );
};

export default AddAttendancePageContainer;
