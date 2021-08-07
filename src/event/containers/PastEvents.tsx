import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'antd';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import background from '../../assets/graphics/background.svg';
import { ReactComponent as ArrowsIcon } from '../../assets/icons/caret-icon-double.svg';
import { fetchAttendance as fetchAttendanceConnect, fetchPastEvents as fetchPastEventsConnect } from '../eventActions';
import { formatDate, timeframeData } from '../../utils';

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

  const menu = (
    <Menu>
      {timeframeData.map((d) => {
        return (
          <Menu.Item key={d.text}>
            <div
              role="menuitem"
              className="leader-timeframe"
              onClick={() => {
                setTimeframe(d.text);
                setShownEvents(
                  events.filter((event) => {
                    const eventStart = new Date(event.start).getTime() / 1000;
                    return eventStart >= d.start && (d.end === 0 ? true : eventStart < d.end);
                  }),
                );
              }}
              tabIndex={0}
            >
              {d.text}
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
