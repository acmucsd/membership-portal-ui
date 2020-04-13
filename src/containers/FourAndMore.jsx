import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import LeaderListItem from '../components/LeaderListItem';
import { getDefaultProfile } from '../utils';
import { fetchLeaderboard } from '../actions/leaderboardActions';

const FourAndMoreContainer = props => {
  useEffect(() => {
    props.fetchLeaderboard();
  }, []);

  return (
    <>
      {getFourAndMore(props.users)}
    </>
  )
***REMOVED***

const getFourAndMore = users => {
  let fourAndMore = [];

  for (let i = 3; i < users.length; i++) {
    const user = users[i];
    console.log(user.profilePicture);
    fourAndMore.push(
      <LeaderListItem
        key={i}
        exp={user.points}
        image={user.profilePicture}
        name={`${user.firstName} ${user.lastName}`}
        placement={i+1}
        rank={user.rank}
        uuid={user.uuid}
        />
***REMOVED***
  }

  return fourAndMore;
}

const mapStateToProps = state => ({
  users: state.leaderboard.users,
});

export default connect(
  mapStateToProps,
  { fetchLeaderboard }
)(FourAndMoreContainer);
