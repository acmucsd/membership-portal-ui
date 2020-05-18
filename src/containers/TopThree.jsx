import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import TopLeaderCard from '../components/TopLeaderCard';
import { getDefaultProfile } from '../utils';
import { fetchLeaderboard } from '../actions/leaderboardActions';

const TopThreeContainer = props => {
  useEffect(() => {
    props.fetchLeaderboard();
  }, []);

  return <>{getTopThree(props.users)}</>;
};

const getTopThree = users => {
  let topThree = [];
  for (let i = 0; i < Math.min(users.length, 3); i++) {
    const user = users[i];
    topThree.push(
      <TopLeaderCard
        key={i}
        exp={user.points}
        image={user.profilePicture}
        name={`${user.firstName} ${user.lastName}`}
        placement={i + 1}
        rank={user.rank}
        uuid={user.uuid}
      />
    );
  }

  return topThree;
};

const mapStateToProps = state => ({
  users: state.leaderboard.users,
});

export default connect(mapStateToProps, { fetchLeaderboard })(TopThreeContainer);
