import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getYearBounds, years } from 'ucsd-quarters-years';

import InfiniteScroll from 'react-infinite-scroller';
import { Menu, Dropdown } from 'antd';
import LeaderListItem from '../components/LeaderListItem';
import fetchLeaderboard from '../leaderboardActions';

import { ReactComponent as ArrowsIcon } from '../../assets/icons/caret-icon-double.svg';

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
  selfUUID: string;
}

const getFourAndMore = (users: { [key: string]: any }, selfUUID) => {
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
        selfUUID={selfUUID}
      />,
    );
  }

  return fourAndMore;
};

const LIMIT = 100;
const FourAndMoreContainer: React.FC<FourAndMoreContainerProps> = (props) => {
  const { users, selfUUID } = props;
  const [page, setPage] = useState(0);
  const [prevUserLength, setPrevUserLength] = useState(0);
  const [timeframe, setTimeframe] = useState('All Time');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const hasMore = () => {
    return prevUserLength !== users.length;
  };

  useEffect(() => {
    setPrevUserLength(users.length);
  }, [users]);

  const loadFunc = () => {
    if (users.length >= page * LIMIT) {
      setPage(page + 1);
      props.fetchLeaderboard((page + 1) * LIMIT + 3, LIMIT, startTime, endTime);
    }
    if (startTime === 0 || endTime === 0) {
      props.fetchLeaderboard(page * LIMIT + 3, LIMIT);
    } else {
      props.fetchLeaderboard(page * LIMIT + 3, LIMIT, startTime, endTime);
    }
  };

  const menu = (
    <Menu>
      {Object.keys(years).map((year) => {
        return (
          <Menu.Item key={year}>
            <div
              role="menuitem"
              className="leader-timeframe"
              tabIndex={0}
              onClick={() => {
                const yearTimeframes = getYearBounds(year as any);
                const yearUnixStart = yearTimeframes.start.getTime() / 1000;
                const yearUnixEnd = yearTimeframes.end.getTime() / 1000;
                setTimeframe(year);
                setStartTime(yearUnixStart);
                setEndTime(yearUnixEnd);
                setPage(0);
                props.fetchLeaderboard(0, 3, yearUnixStart, yearUnixEnd, true); // updates users for TopThree
                props.fetchLeaderboard(3, LIMIT, yearUnixStart, yearUnixEnd); // updates users for FourAndMore
              }}
            >
              {year}
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu}>
        <p className="ant-dropdown-link">
          {timeframe} <ArrowsIcon />
        </p>
      </Dropdown>
      <InfiniteScroll pageStart={0} loadMore={loadFunc} hasMore={hasMore()}>
        {getFourAndMore(users, selfUUID)}
      </InfiniteScroll>
    </>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  users: state.leaderboard.users,
  selfUUID: state.auth.profile.uuid,
});

export default connect(mapStateToProps, { fetchLeaderboard })(FourAndMoreContainer);
