import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logoutUser, withLogout } from '../auth/authSlice';
import { AuthError } from '../errors';
import * as utils from './utils';

const initialState = {
  updateSuccess: false,
  error: false,
};

export const updateProfile = createAsyncThunk('utils/updateProfile', async (values, { dispatch }) => {
  try {
    await utils.updateProfile(values);
  } catch (error) {
    if (error instanceof AuthError) dispatch(logoutUser());
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateProfile.fulfilled, (state) => {
        state.updateSuccess = true;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.error = true;
      });
  },
});

const uploadUserImage = withLogout(utils.uploadUserImage, 'utils/uploadUserImage');
const updateEmail = withLogout(utils.updateEmail, 'utils/updateEmail');
export { uploadUserImage, updateEmail };

export default profileSlice.reducer;
