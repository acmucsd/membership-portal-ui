import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TopLeaderCard from '../components/TopLeaderCard';
import fetchLeaderboard from '../actions/leaderboardActions';

const getTopThree = (users) => {
  const topThree = [];
  for (let i = 0; i < Math.min(users.length, 3); i += 1) {
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

const TopThreeContainer = (props) => {
  const { users } = props;

  useEffect(() => {
    props.fetchLeaderboard();
  }, []);

  return <>{getTopThree(users)}</>;
};

const mapStateToProps = (state) => ({
  users: state.leaderboard.users,
});

TopThreeContainer.propTypes = {
  users: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { fetchLeaderboard })(
  TopThreeContainer
);
