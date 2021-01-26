import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import TopLeaderCard from '../components/TopLeaderCard';
import fetchLeaderboard from '../leaderboardActions';

const getTopThree = (users: { [key: string]: any }) => {
  const topThree: any[] = [];
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
      />,
    );
  }

  return topThree;
};

interface TopThreeContainerProps {
  users: [
    {
      points: string;
      profilePicture: string;
      firstName: string;
      lastName: string;
      rank: string;
      uuid: string;
    },
  ];
  fetchLeaderboard: Function;
}

const TopThreeContainer: React.FC<TopThreeContainerProps> = (props) => {
  const { users } = props;

  useEffect(() => {
    props.fetchLeaderboard(0, 3);
  }, []);

  return <>{getTopThree(users)}</>;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  users: state.leaderboard.users,
});

export default connect(mapStateToProps, { fetchLeaderboard })(TopThreeContainer);
