import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { PublicEvent, PrivateProfile, PublicAttendance, UserAccessType } from './api';
import { loadCart } from './store/localStorage';
import { Cart } from './types';

// This context provides a central location for shared data to be stored, and
// then used throughout the app via a call to useContext. Currently, the data
// stored is the user object, a list of past and future events, and a list of
// attendances.

// Since the user object can theoretically be undefined before it's loaded, a
// placeholder is used as the default state so the object doesn't have to be
// optional.
export const userPlaceholder: PrivateProfile = {
  uuid: '',
  firstName: '',
  lastName: '',
  profilePicture: '',
  graduationYear: 0,
  major: '',
  bio: '',
  points: 0,
  email: '',
  accessType: UserAccessType.STANDARD,
  state: '',
  credits: 0,
};

// For every shared property, its type is defined, a default value is given due
// to the createContext requirement, and then the values are actually filled in
// with a call to useState.

// Given a proerty with type T, the setProperty type is:
// Dispatch<SetStateAction<T | undefined>> if it can be empty, or
// Dispatch<SetStateAction<T[]>> for an array of the type
export const AppContext = createContext<{
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  user: PrivateProfile;
  setUser: Dispatch<SetStateAction<PrivateProfile>>;
  pastEvents: PublicEvent[];
  setPastEvents: Dispatch<SetStateAction<PublicEvent[]>>;
  futureEvents: PublicEvent[];
  setFutureEvents: Dispatch<SetStateAction<PublicEvent[]>>;
  attendance: PublicAttendance[];
  setAttendance: Dispatch<SetStateAction<PublicAttendance[]>>;
  checkinEvent: PublicEvent | undefined;
  setCheckinEvent: Dispatch<SetStateAction<PublicEvent | undefined>>;
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
  addToCart: Function;
  editInCart: Function;
  removeFromCart: Function;
  clearCart: Function;
}>({
  authenticated: false,
  setAuthenticated: () => {},
  user: userPlaceholder,
  setUser: () => {},
  pastEvents: [],
  setPastEvents: () => {},
  futureEvents: [],
  setFutureEvents: () => {},
  attendance: [],
  setAttendance: () => {},
  checkinEvent: undefined,
  setCheckinEvent: () => {},
  cart: {},
  setCart: () => {},
  addToCart: () => {},
  editInCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const AppProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<PrivateProfile>(userPlaceholder);
  const [pastEvents, setPastEvents] = useState<PublicEvent[]>([]);
  const [futureEvents, setFutureEvents] = useState<PublicEvent[]>([]);
  const [attendance, setAttendance] = useState<PublicAttendance[]>([]);
  const [checkinEvent, setCheckinEvent] = useState<PublicEvent>();
  const [cart, setCart] = useState<Cart>(loadCart());

  const addToCart = (payload) => {
    const {
      option: { uuid },
      quantity,
    } = payload;

    if (quantity < 1) return;

    const newCart = { ...cart };
    if (uuid in cart) newCart[uuid].quantity += quantity;
    else newCart[uuid] = payload;
    setCart(newCart);
  };

  const editInCart = (payload) => {
    const {
      option: { uuid },
      quantity,
    } = payload;

    if (!(uuid in cart)) return;

    const newCart = { ...cart };
    if (quantity < 1) delete newCart[uuid];
    else newCart[uuid].quantity = quantity;
    setCart(newCart);
  };

  const removeFromCart = (payload) => {
    const {
      option: { uuid },
    } = payload;

    const newCart = { ...cart };
    if (uuid in cart) delete newCart[uuid];
    setCart(newCart);
  };

  const clearCart = () => {
    setCart({});
  };

  return (
    <AppContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        user,
        setUser,
        pastEvents,
        setPastEvents,
        futureEvents,
        setFutureEvents,
        attendance,
        setAttendance,
        checkinEvent,
        setCheckinEvent,
        cart,
        setCart,
        addToCart,
        editInCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
