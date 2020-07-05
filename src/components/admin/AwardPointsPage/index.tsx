import React from 'react';
import AwardPointsForm from '../../../containers/admin/AwardPointsForm';

import './style.less';

const AwardPointsPage: React.FC = () => {
  return (
    <div className="award-points-page">
      <h1 className="title">Admin</h1>
      <AwardPointsForm />
    </div>
  );
};

export default AwardPointsPage;
