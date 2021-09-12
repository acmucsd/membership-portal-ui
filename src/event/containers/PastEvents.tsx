import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'antd';
import { getYearBounds, years } from 'ucsd-quarters-years';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import background from '../../assets/graphics/background.svg';
import { ReactComponent as ArrowsIcon } from '../../assets/icons/caret-icon-double.svg';
import { fetchAttendance as fetchAttendanceConnect, fetchPastEvents as fetchPastEventsConnect } from '../eventActions';
import { formatDate } from '../../utils';

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
  auth: {
    admin: boolean;
  };
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
}

const PastEventsContainer: React.FC<PastEventsContainerProps> = (props) => {
  const { auth, events, attendance, fetchAttendance, fetchPastEvents } = props;

  const [timeframe, setTimeframe] = useState('All Time');
  const [shownEvents, setShownEvents] = useState<any[]>(events);

  useEffect(() => {
    fetchPastEvents();
    fetchAttendance();
  }, [fetchAttendance, fetchPastEvents]);

  useEffect(() => {
    if (timeframe === 'All Time') {
      setShownEvents(events);
    }
  }, [events, timeframe]);

  // All representations of timeframes displayed in dropdown.
  // 'All Time' is concatenated, since the `ucsd-quarters-years` package
  // does not include it.
  const yearCodes = ['All Time'].concat(Object.keys(years));
  const menu = (
    <Menu>
      {yearCodes.map((yearCode, index) => {
        const yearFilteredEvents = events.filter((event) => {
          if (yearCode === 'All Time') {
            return event;
          }
          const eventStart = new Date(event.start);
          const timeframeStart = getYearBounds(yearCode as any).start;
          // If the next year does exist, use its start date as the timeframe bound
          // (to include summertime in previous year), otherwise just use the current yearly bound.
          const timeframeEnd = yearCodes[index + 1] !== null ? getYearBounds(yearCodes[index + 1] as any).start : getYearBounds(yearCode as any).end;
          return eventStart >= timeframeStart && eventStart < timeframeEnd;
        });

        if (yearFilteredEvents.length === 0) {
          return null;
        }
        return (
          <Menu.Item key={yearCode}>
            <div
              role="menuitem"
              className="leader-timeframe"
              onClick={() => {
                setTimeframe(yearCode);
                setShownEvents(yearFilteredEvents);
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
      <Dropdown overlay={menu}>
        <p className="ant-dropdown-link">
          {timeframe} <ArrowsIcon />
        </p>
      </Dropdown>
      <EventsList>
        {shownEvents.map((event) => {
          const startTime = formatDate(event.start);
          const attended = attendance.some((attend) => attend.event.uuid === event.uuid);
          return (
            <EventCard
              key={`past-${event.uuid}`}
              uuid={event.uuid}
              cover={event.cover || background}
              date={startTime}
              description={event.description}
              location={event.location}
              points={event.pointValue}
              title={event.title}
              auth={auth}
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
  auth: state.auth,
  attendance: state.event.attendance,
});

export default connect(mapStateToProps, {
  fetchAttendance: fetchAttendanceConnect,
  fetchPastEvents: fetchPastEventsConnect,
})(PastEventsContainer);
