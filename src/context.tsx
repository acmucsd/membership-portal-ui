import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { PublicEvent, PrivateProfile, PublicAttendance } from './api';

// This context provides a central location for shared data to be stored, and
// then used throughout the app via a call to useContext. Currently, the data
// stored is the user object, a list of past and future events, and a list of
// attendances.

// For every shared property, its type is defined, a default value is given due
// to the createContext requirement, and then the values are actually filled in
// with a call to useState.

// Given a proerty with type T, the setProperty type is:
// Dispatch<SetStateAction<T | undefined>> if it can be empty, or
// Dispatch<SetStateAction<T[]>> for an array of the type

export const AppContext = createContext<{
  user: PrivateProfile | undefined;
  setUser: Dispatch<SetStateAction<PrivateProfile | undefined>>;
  pastEvents: PublicEvent[];
  setPastEvents: Dispatch<SetStateAction<PublicEvent[]>>;
  futureEvents: PublicEvent[];
  setFutureEvents: Dispatch<SetStateAction<PublicEvent[]>>;
  attendance: PublicAttendance[];
  setAttendance: Dispatch<SetStateAction<PublicAttendance[]>>;
  checkinEvent: PublicEvent | undefined;
  setCheckinEvent: Dispatch<SetStateAction<PublicEvent | undefined>>;
}>({
  user: undefined,
  setUser: () => {},
  pastEvents: [],
  setPastEvents: () => {},
  futureEvents: [],
  setFutureEvents: () => {},
  attendance: [],
  setAttendance: () => {},
  checkinEvent: undefined,
  setCheckinEvent: () => {},
});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState<PrivateProfile>();
  const [pastEvents, setPastEvents] = useState<PublicEvent[]>([]);
  const [futureEvents, setFutureEvents] = useState<PublicEvent[]>([]);
  const [attendance, setAttendance] = useState<PublicAttendance[]>([]);
  const [checkinEvent, setCheckinEvent] = useState<PublicEvent>();

  return (
    <AppContext.Provider
      value={{ user, setUser, pastEvents, setPastEvents, futureEvents, setFutureEvents, attendance, setAttendance, checkinEvent, setCheckinEvent }}
    >
      {children}
    </AppContext.Provider>
  );
};
