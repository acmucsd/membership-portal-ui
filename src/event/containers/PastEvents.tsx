import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'antd';
import { getCurrentYear, getYearBounds, years } from 'ucsd-quarters-years';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import background from '../../assets/graphics/background.svg';
import { ReactComponent as ArrowsIcon } from '../../assets/icons/caret-icon-double.svg';
import { fetchAttendance as fetchAttendanceConnect, fetchPastEvents as fetchPastEventsConnect } from '../eventActions';
import { formatDate } from '../../utils';
import { UserAccessType } from '../../types';

interface PastEventsContainerProps {
  attendance: [
    {
      uuid: string;
      user: string;
      event: {
        uuid: string;
        cover: string;
        description: string;
        location: string;
        pointValue: string;
        title: string;
        start: string;
      };
    },
  ];
  events: [
    {
      uuid: string;
      cover: string;
      description: string;
      location: string;
      pointValue: string;
      title: string;
      start: string;
    },
  ];
  fetchAttendance: Function;
  fetchPastEvents: Function;
  canEditEvents: boolean;
}

const PastEventsContainer: React.FC<PastEventsContainerProps> = (props) => {
  const { canEditEvents, events, attendance, fetchAttendance, fetchPastEvents } = props;
  const [timeframe, setTimeframe] = useState(getCurrentYear()?.name ?? 'All Time');
  const [shownEvents, setShownEvents] = useState<any[]>(events);

  useEffect(() => {
    fetchPastEvents();
    fetchAttendance();
  }, [fetchAttendance, fetchPastEvents]);

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

const mapStateToProps = (state: { [key: string]: any }) => ({
  events: state.event.pastEvents,
  attendance: state.event.attendance,
  timeframe: state.event.timeframe,
  canEditEvents: [UserAccessType.MARKETING, UserAccessType.ADMIN].includes(state.auth.profile.accessType),
});

export default connect(mapStateToProps, {
  fetchAttendance: fetchAttendanceConnect,
  fetchPastEvents: fetchPastEventsConnect,
})(PastEventsContainer);
