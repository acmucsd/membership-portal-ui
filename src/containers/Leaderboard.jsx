import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Leaderboard from '../components/Leaderboard';
import { fetchLeaderboard } from '../actions/leaderboardActions';

const LeaderboardContainer = props => {
  const ITEM_LIMIT = 100;

  // internal pagination, used to make sure we fetch leaderboard first before switching pages
  const [_pagination, _setPagination] = useState({ offset: 0, limit: ITEM_LIMIT, page: 1 });
  // actual pagination displayed
  const [pagination, setPagination] = useState({ offset: 0, limit: ITEM_LIMIT, page: 1 });
  const pageOnChange = p => {
    _setPagination({ offset: (p - 1) * ITEM_LIMIT, limit: ITEM_LIMIT, page: p });
  };

  // fetch new leaderboard if pagination changes
  useEffect(() => {
    props.fetchLeaderboard(_pagination.offset, _pagination.limit).then(() => {
      setPagination(_pagination);
    });
  }, [_pagination]);
  return <Leaderboard pageOnChange={pageOnChange} pagination={pagination} />;
};

const mapStateToProps = state => ({
  users: state.leaderboard.users,
});

export default connect(mapStateToProps, { fetchLeaderboard })(LeaderboardContainer);
