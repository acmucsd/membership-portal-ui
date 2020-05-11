import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LeaderListItem from '../components/LeaderListItem';
import fetchLeaderboard from '../actions/leaderboardActions';

const getFourAndMore = (users) => {
  const fourAndMore = [];

  for (let i = 3; i < users.length; i += 1) {
    const user = users[i];
    fourAndMore.push(
      <LeaderListItem
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

  return fourAndMore;
};

const FourAndMoreContainer = (props) => {
  const { users } = props;

  useEffect(() => {
    props.fetchLeaderboard();
  }, []);

  return <>{getFourAndMore(users)}</>;
};

const mapStateToProps = (state) => ({
  users: state.leaderboard.users,
});

FourAndMoreContainer.propTypes = {
  users: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { fetchLeaderboard })(
  FourAndMoreContainer
);
