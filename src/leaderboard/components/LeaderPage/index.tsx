import React, { useEffect, useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { getCurrentYear, getYearBounds, years } from 'ucsd-quarters-years';
import { ReactComponent as ArrowsIcon } from '../../../assets/icons/caret-icon-double.svg';
import { authSelector } from '../../../auth/authSlice';
import { useAppDispatch } from '../../../redux/store';
import { fetchLeaderboard, leaderboardSelector } from '../../leaderboardSlice';
import LeaderListItem from '../LeaderListItem';
import TopLeaderCard from '../TopLeaderCard';
import './style.less';

const LeaderPage: React.FC = () => {
  const { users } = useSelector(leaderboardSelector);
  const {
    profile: { uuid: selfUUID },
  } = useSelector(authSelector);
  const dispatch = useAppDispatch();

  // Default to the current year, otherwise use all time
  const { name, start, end } = getCurrentYear() ?? { name: 'All Time', start: 0, end: 0 };

  const [timeframe, setTimeframe] = useState<string>(name);
  const [startTime, setStartTime] = useState<number>(new Date(start).getTime() / 1000); // Convert time to unix
  const [endTime, setEndTime] = useState<number>(new Date(end).getTime() / 1000); // Convert time to unix

  useEffect(() => {
    dispatch(fetchLeaderboard({ offset: 0, limit: 0, from: startTime, to: endTime }));
  }, [dispatch, endTime, startTime]);

  const yearCodes = ['All Time'].concat(Object.keys(years));
  const menu = (
    <Menu className="menu">
      {yearCodes.map((yearCode, index) => {
        // if this academic quarter start hasn't at least started...
        if (yearCode !== 'All Time' && !(getYearBounds(yearCode as any).start < new Date())) {
          // do not output a menu option at all.
          return null;
        }
        return (
          <Menu.Item className="menu-item" key={yearCode}>
            <div
              role="menuitem"
              className="leader-page-timeframe"
              tabIndex={0}
              onClick={() => {
                if (yearCode === 'All Time') {
                  setTimeframe(yearCode);
                  setStartTime(0);
                  setEndTime(0);
                  return;
                }

                const timeframeStart = getYearBounds(yearCode as any).start;
                // If the next year does exist, use its start date as the timeframe bound
                // (to include summertime in previous year), otherwise just use the current yearly bound.
                const timeframeEnd =
                  years[index + 1] !== undefined ? getYearBounds(years[index + 1] as any).start : getYearBounds(yearCode as any).end;
                const yearUnixStart = timeframeStart.getTime() / 1000;
                const yearUnixEnd = timeframeEnd.getTime() / 1000;
                setTimeframe(yearCode);
                setStartTime(yearUnixStart);
                setEndTime(yearUnixEnd);
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
    <div className="leader-page">
      <div className="leader-page-top">
        <h1 className="leader-page-title">Leaderboard</h1>
        <Dropdown className="leader-page-dropdown-menu" overlay={menu} trigger={['click', 'hover']}>
          <p className="leader-page-dropdown-link">
            {timeframe} <ArrowsIcon />
          </p>
        </Dropdown>
      </div>

      <div className="leader-page-leaderboard">
        {!users && <div className="empty-results">Loading users...</div>}
        {users && users.length === 0 && <div className="empty-results">No users found for this timeframe!</div>}
        {users && users.length !== 0 && (
          <>
            <div className="top-three">
              {users.slice(0, 3).map((user, index) => (
                <TopLeaderCard
                  key={index}
                  exp={user.points}
                  image={user.profilePicture}
                  name={`${user.firstName} ${user.lastName}`}
                  placement={index + 1}
                  uuid={user.uuid}
                  selfUUID={selfUUID}
                />
              ))}
            </div>
            <div className="four-and-more">
              {users.slice(3).map((user, index) => (
                <LeaderListItem
                  key={index + 3}
                  exp={user.points}
                  image={user.profilePicture}
                  name={`${user.firstName} ${user.lastName}`}
                  placement={index + 4}
                  uuid={user.uuid}
                  selfUUID={selfUUID}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderPage;
