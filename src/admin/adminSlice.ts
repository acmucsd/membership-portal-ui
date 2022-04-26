import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { withLogout } from '../auth/authSlice';
import type { RootState } from '../redux/store';
import * as utils from './utils';

const initialState = {
  emails: [] as string[],
  error: false,
};

export const getEmails = createAsyncThunk('admin/getEmails', async () => {
  const emails = await utils.getEmails();
  return emails;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmails.fulfilled, (state, action) => {
      state.emails = action.payload;
    });
  },
});

const postEvent = withLogout(utils.postEvent, 'admin/postEvent');
const editEvent = withLogout(utils.editEvent, 'admin/editEvent');
const deleteEvent = withLogout(utils.deleteEvent, 'admin/deleteEvent');
const awardPoints = withLogout(utils.awardPoints, 'admin/awardPoints');
const addAttendance = withLogout(utils.addAttendance, 'admin/addAttendance');
export { postEvent, editEvent, deleteEvent, awardPoints, addAttendance };

export const adminSelector = (state: RootState) => state.admin;
export default adminSlice.reducer;
