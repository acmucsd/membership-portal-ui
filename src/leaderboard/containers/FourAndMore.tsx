import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getYearBounds, years } from 'ucsd-quarters-years';

import InfiniteScroll from 'react-infinite-scroller';
import { Menu, Dropdown } from 'antd';
import LeaderListItem from '../components/LeaderListItem';
import { fetchLeaderboard as fetchLeaderboardConnect, updateTimeframe as updateTimeframeConnect } from '../leaderboardActions';

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
  updateTimeframe: Function;
  selfUUID: string;
  timeframe: string;
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
  const { users, selfUUID, timeframe, updateTimeframe } = props;
  const [page, setPage] = useState(0);
  const [prevUserLength, setPrevUserLength] = useState(0);
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

  const yearCodes = ['All Time'].concat(Object.keys(years));
  const menu = (
    <Menu>
      {yearCodes.map((yearCode, index) => {
        // if this academic quarter start hasn't at least started...
        if (yearCode !== 'All Time' && !(getYearBounds(yearCode as any).start < new Date())) {
          // do not output a menu option at all.ls
          return null;
        }
        return (
          <Menu.Item key={yearCode}>
            <div
              role="menuitem"
              className="leader-timeframe"
              tabIndex={0}
              onClick={() => {
                if (yearCode === 'All Time') {
                  updateTimeframe(yearCode);
                  setStartTime(0);
                  setEndTime(0);
                  setPage(0);
                  props.fetchLeaderboard(0, 3, true); // updates users for TopThree
                  props.fetchLeaderboard(3, LIMIT); // updates users for FourAndMore
                  return;
                }
                const timeframeStart = getYearBounds(yearCode as any).start;
                // If the next year does exist, use its start date as the timeframe bound
                // (to include summertime in previous year), otherwise just use the current yearly bound.
                const timeframeEnd =
                  years[index + 1] !== undefined ? getYearBounds(years[index + 1] as any).start : getYearBounds(yearCode as any).end;
                const yearUnixStart = timeframeStart.getTime() / 1000;
                const yearUnixEnd = timeframeEnd.getTime() / 1000;
                updateTimeframe(yearCode);
                setStartTime(yearUnixStart);
                setEndTime(yearUnixEnd);
                setPage(0);
                props.fetchLeaderboard(0, 3, yearUnixStart, yearUnixEnd, true); // updates users for TopThree
                props.fetchLeaderboard(3, LIMIT, yearUnixStart, yearUnixEnd); // updates users for FourAndMore
              }}
            >
              {yearCode}
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
  timeframe: state.leaderboard.timeframe,
  selfUUID: state.auth.profile.uuid,
});

export default connect(mapStateToProps, { fetchLeaderboard: fetchLeaderboardConnect, updateTimeframe: updateTimeframeConnect })(FourAndMoreContainer);
