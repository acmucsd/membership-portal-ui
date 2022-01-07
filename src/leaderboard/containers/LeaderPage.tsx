import React from 'react';
import { connect } from 'react-redux';

import { fetchLeaderboard as fetchLeaderboardConnect } from '../leaderboardActions';

import LeaderPage from '../components/LeaderPage';
import PageLayout from '../../layout/containers/PageLayout';

interface LeaderPageContainerProps {
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
  selfUUID: string;
}

const LeaderPageContainer: React.FC<LeaderPageContainerProps> = (props) => {
  const { users, fetchLeaderboard, selfUUID } = props;

  return (
    <PageLayout>
      <LeaderPage users={users} fetchLeaderboard={fetchLeaderboard} selfUUID={selfUUID} />
    </PageLayout>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  users: state.leaderboard.users,
  selfUUID: state.auth.profile.uuid,
});

export default connect(mapStateToProps, { fetchLeaderboard: fetchLeaderboardConnect })(LeaderPageContainer);
