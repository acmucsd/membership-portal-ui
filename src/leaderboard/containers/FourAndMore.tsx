import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroller';
import { Menu, Dropdown } from 'antd';
import LeaderListItem from '../components/LeaderListItem';
import { fetchLeaderboard } from '../leaderboardActions';

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

const LIMIT = 100;
const FourAndMoreContainer: React.FC<FourAndMoreContainerProps> = (props) => {
  const { users } = props;
  const [page, setPage] = useState(0);
  const [prevUserLength, setPrevUserLength] = useState(0);
  const [timeframe, setTimeframe] = useState('All Time');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const earliestDate = new Date('Jun 15, 2019').valueOf() / 1000;
  const yearInSeconds = 31536000;

  const hasMore = () => {
    return prevUserLength !== users.length;
  };

  useEffect(() => {
    setPrevUserLength(users.length);
  }, [users]);

  const loadFunc = () => {
    if (users.length >= page * LIMIT) {
      setPage(page + 1);
      props.fetchLeaderboard((page+1) * LIMIT + 3, LIMIT, startTime, endTime);
    }
    if (startTime === 0 || endTime === 0) {
      props.fetchLeaderboard(page * LIMIT + 3, LIMIT);
    } else {
      props.fetchLeaderboard(page * LIMIT + 3, LIMIT, startTime, endTime);
    }
  };

  const timeframeData = [
    {
      text: 'All Time',
      start: 0,
      end: 0,
    },
    {
      text: '2020-2021',
      start: earliestDate + yearInSeconds,
      end: earliestDate + yearInSeconds * 2,
    },
    {
      text: '2019-2020',
      start: earliestDate,
      end: earliestDate + yearInSeconds,
    },
  ];

  const menu = (
    <Menu>
      {timeframeData.map((d) => {
        return (
          <Menu.Item key={d.text}>
            <div
              role="menuitem"
              className="leader-timeframe"
              tabIndex={0}
              onClick={() => {
                setTimeframe(d.text);
                setStartTime(d.start);
                setEndTime(d.end);
                setPage(0);
                props.fetchLeaderboard(0, 3, d.start, d.end, true); // updates users for TopThree
                props.fetchLeaderboard(3, LIMIT, d.start, d.end); // updates users for FourAndMore
              }}
            >
              {d.text}
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
        {getFourAndMore(users)}
      </InfiniteScroll>
    </>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  users: state.leaderboard.users,
});

export default connect(mapStateToProps, { fetchLeaderboard })(FourAndMoreContainer);
