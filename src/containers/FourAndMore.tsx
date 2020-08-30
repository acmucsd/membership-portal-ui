import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroller';
import LeaderListItem from '../components/LeaderListItem';
import fetchLeaderboard from '../actions/leaderboardActions';

interface FourAndMoreContainerProps {
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

const getFourAndMore = (users: { [key: string]: any }) => {
  const fourAndMore: any[] = [];

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
      />,
    );
  }

  return fourAndMore;
};

const LIMIT = 20;
const FourAndMoreContainer: React.FC<FourAndMoreContainerProps> = (props) => {
  const { users } = props;
  const [page, setPage] = useState(0);
  const [prevUserLength, setPrevUserLength] = useState(0);
  const hasMore = () => {
    return prevUserLength !== users.length;
  };
  useEffect(() => {
    setPrevUserLength(users.length);
  }, [users]);
  const loadFunc = () => {
    setPage(page + 1);
    props.fetchLeaderboard(page * LIMIT + 3, LIMIT);
  };
  return (
    <>
      <InfiniteScroll pageStart={0} loadMore={loadFunc} hasMore={hasMore()}>
        {getFourAndMore(users)}
      </InfiniteScroll>
    </>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  users: state.leaderboard.users,
});

export default connect(mapStateToProps, { fetchLeaderboard })(FourAndMoreContainer);
