import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import LeaderListItem from '../components/LeaderListItem';
import { getDefaultProfile } from '../utils';
import { fetchLeaderboard } from '../actions/leaderboardActions';

const FourAndMoreContainer = props => {
  return <>{getFourAndMore(props.users, props.firstPage, props.offset)}</>;
};

const getFourAndMore = (users, firstPage = true, offset = 0) => {
  let fourAndMore = [];
  let i = 3;
  if (!firstPage) i = 0;

  for (; i < users.length; i++) {
    const user = users[i];
    fourAndMore.push(
      <LeaderListItem
        key={i}
        exp={user.points}
        image={user.profilePicture}
        name={`${user.firstName} ${user.lastName}`}
        placement={i + 1 + offset}
        rank={user.rank}
        uuid={user.uuid}
      />
    );
  }

  return fourAndMore;
};

const mapStateToProps = state => ({
  users: state.leaderboard.users,
});

export default connect(mapStateToProps, { fetchLeaderboard })(FourAndMoreContainer);
