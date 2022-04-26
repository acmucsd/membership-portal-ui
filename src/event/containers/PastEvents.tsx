import React, { useEffect, useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { getCurrentYear, getYearBounds, years } from 'ucsd-quarters-years';
import background from '../../assets/graphics/background.svg';
import { ReactComponent as ArrowsIcon } from '../../assets/icons/caret-icon-double.svg';
import { authSelector } from '../../auth/authSlice';
import { useAppDispatch } from '../../redux/store';
import { UserAccessType } from '../../types';
import { formatDate } from '../../utils';
import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import { eventSelector, fetchAttendance, fetchPastEvents } from '../eventSlice';

const PastEventsContainer: React.FC = () => {
  const { pastEvents: events, attendance } = useSelector(eventSelector);
  const {
    profile: { accessType },
  } = useSelector(authSelector);
  const dispatch = useAppDispatch();
  const canEditEvents = [UserAccessType.MARKETING, UserAccessType.ADMIN].includes(accessType);
  const [timeframe, setTimeframe] = useState(getCurrentYear()?.name ?? 'All Time');
  const [shownEvents, setShownEvents] = useState<any[]>(events);

  useEffect(() => {
    dispatch(fetchPastEvents());
    dispatch(fetchAttendance());
  }, [dispatch]);

  useEffect(() => {
    if (timeframe === 'All Time') {
      setShownEvents(events);
    } else {
      const yearFilteredEvents = events.filter((event) => {
        if (timeframe === 'All Time') {
          return event;
        }
        const eventStart = new Date(event.start);
        const timeframeStart = getYearBounds(timeframe as any).start;
        const timeframeEnd = getYearBounds(timeframe as any).end;
        return eventStart >= timeframeStart && eventStart < timeframeEnd;
      });

      setShownEvents(yearFilteredEvents);
    }
  }, [events, timeframe]);

  // All representations of timeframes displayed in dropdown.
  // 'All Time' is concatenated, since the `ucsd-quarters-years` package
  // does not include it.
  const yearCodes = ['All Time'].concat(Object.keys(years));
  const menu = (
    <Menu className="menu">
      {yearCodes.map((yearCode, index) => {
        const yearFilteredEvents = events.filter((event) => {
          if (yearCode === 'All Time') {
            return event;
          }
          const eventStart = new Date(event.start);
          const timeframeStart = getYearBounds(yearCode as any).start;
          // If the next year does exist, use its start date as the timeframe bound
          // (to include summertime in previous year), otherwise just use the current yearly bound.
          const timeframeEnd =
            yearCodes[index + 1] !== undefined ? getYearBounds(yearCodes[index + 1] as any).start : getYearBounds(yearCode as any).end;
          return eventStart >= timeframeStart && eventStart < timeframeEnd;
        });

        if (yearFilteredEvents.length === 0) {
          return null;
        }
        return (
          <Menu.Item className="menu-item" key={yearCode}>
            <div
              role="menuitem"
              className="event-timeframe"
              onClick={() => {
                setTimeframe(yearCode);
              }}
              tabIndex={0}
            >
              {yearCode}
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <div>
      <div className="top">
        <h1 className="subtitle">Past Events</h1>
        <Dropdown overlay={menu}>
          <p className="ant-dropdown-link">
            {timeframe} <ArrowsIcon />
          </p>
        </Dropdown>
      </div>
      <EventsList>
        {shownEvents.map((event) => {
          const startTime = formatDate(event.start);
          const endTime = formatDate(event.end);
          const date = startTime === endTime ? startTime : `${startTime} - ${endTime}`;
          const attended = attendance.some((attend) => attend.event.uuid === event.uuid);
          return (
            <EventCard
              key={`past-${event.uuid}`}
              uuid={event.uuid}
              cover={event.cover || background}
              date={date}
              description={event.description}
              location={event.location}
              eventLink={event.eventLink}
              points={event.pointValue}
              title={event.title}
              canEditEvents={canEditEvents}
              attended={attended}
            />
          );
        })}
      </EventsList>
    </div>
  );
};

export default PastEventsContainer;
