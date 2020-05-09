import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';

import TopThree from '../../containers/TopThree';
import FourAndMore from '../../containers/FourAndMore';

import './style.less';

const Leaderboard = props => {
  const defaultPageSize = 10;
  return (
    <div className="leaderboard">
      <div className="top-three">
        <TopThree 
          firstPage={props.pagination.page === 1}
        />
      </div>
      <div className="four-and-more">
        <FourAndMore 
          firstPage={props.pagination.page === 1}
          offset={props.pagination.offset}
        />
      </div>
      <div className="paginate-wrapper">
        <Pagination 
          defaultCurrent={1} 
          current={props.pagination.page} 
          onChange={props.pageOnChange} 
          total={50} 
          defaultPageSize={defaultPageSize} 
        />
      </div>
    </div>
  );
};

export default Leaderboard;
