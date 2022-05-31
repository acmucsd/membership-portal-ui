import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { fetchUser, logoutUser, withLogout } from '../auth/authSlice';
import { AuthError } from '../errors';
import type { RootState } from '../redux/store';
import * as utils from './utils';

const initialState = {
  attendance: [] as any[],
  currentEvent: {
    title: '',
    pointValue: 0,
    cover: '',
  },
  event: {
    uuid: '',
    cover: '',
    description: '',
    location: '',
    pointValue: '',
    title: '',
    start: '',
  },
  futureEvents: [] as any[],
  pastEvents: [] as any[],
  checkin: false,
  error: null as any,
};

export const fetchPastEvents = withLogout(utils.fetchPastEvents, 'event/fetchPastEvents');
export const fetchFutureEvents = withLogout(utils.fetchFutureEvents, 'event/fetchFutureEvents');
export const fetchAttendance = withLogout(utils.fetchAttendance, 'event/fetchAttendance');
export const fetchEvent = withLogout(utils.fetchEvent, 'event/fetchEvent');
export const checkIn = createAsyncThunk<any, any>('event/checkIn', async (info, { dispatch }) => {
  try {
    const data = await utils.checkIn(info);
    dispatch(fetchUser());
    dispatch(fetchAttendance());
    dispatch(fetchPastEvents());
    dispatch(fetchFutureEvents());
    return data;
  } catch (error) {
    if (error instanceof AuthError) dispatch(logoutUser());
    throw error;
  }
});

const updateError = (state, { payload }) => {
  state.checkin = false;
  state.error = payload;
};

const updateField = (field: string) => (state, { payload }) => {
  if (!isEqual(state[field], payload)) state[field] = payload;
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    checkOutEvent(state) {
      state.checkin = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPastEvents.fulfilled, updateField('pastEvents')).addCase(fetchPastEvents.rejected, updateError);
    builder.addCase(fetchFutureEvents.fulfilled, updateField('futureEvents')).addCase(fetchFutureEvents.rejected, updateError);
    builder.addCase(fetchAttendance.fulfilled, updateField('attendance')).addCase(fetchAttendance.rejected, updateError);
    builder.addCase(fetchEvent.fulfilled, updateField('event')).addCase(fetchEvent.rejected, updateError);
    builder
      .addCase(checkIn.fulfilled, (state, { payload }) => {
        state.checkin = true;
        state.currentEvent = payload;
      })
      .addCase(checkIn.rejected, updateError);
  },
});

export const eventSelector = (state: RootState) => state.event;
export const { checkOutEvent } = eventSlice.actions;
export default eventSlice.reducer;
