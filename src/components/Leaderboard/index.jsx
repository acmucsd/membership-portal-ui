import React from 'react';

import TopThree from '../../containers/TopThree';
import FourAndMore from '../../containers/FourAndMore';

import './style.less';

const Leaderboard = () => {
  return (
    <div className="leaderboard">
      <div className="top-three">
        <TopThree />
      </div>
      <div className="four-and-more">
        <FourAndMore />
      </div>
    </div>
  );
};

export default Leaderboard;
