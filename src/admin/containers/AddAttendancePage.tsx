import React from 'react';
import PageLayout from '../../layout/containers/PageLayout';
import AddAttendancePage from '../components/AddAttendancePage';

const AddAttendancePageContainer: React.FC = () => {
  return (
    <PageLayout>
      <AddAttendancePage />
    </PageLayout>
  );
};

export default AddAttendancePageContainer;
