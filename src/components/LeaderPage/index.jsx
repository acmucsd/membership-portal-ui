import React from 'react';

import Leaderboard from '../../containers/Leaderboard';

import './style.less';

const LeaderPage = () => {
  return (
    <div className="leader-page">
      <h1 className="title">Leaderboard</h1>
      <Leaderboard />
    </div>
  );
};

export default LeaderPage;
