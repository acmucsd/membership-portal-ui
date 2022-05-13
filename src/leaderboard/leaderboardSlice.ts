import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logoutUser } from '../auth/authSlice';
import type { RootState } from '../redux/store';
import { PublicProfile } from '../types';
import { getDefaultProfile } from '../utils';
import * as utils from './utils';

const initialState = {
  users: [] as PublicProfile[],
  error: undefined as any,
};

export const fetchLeaderboard = createAsyncThunk<
  Awaited<ReturnType<typeof utils.fetchLeaderboard>>,
  {
    offset: number;
    limit: number;
    from?: number;
    to?: number;
  }
>('leaderboard/fetchLeaderboard', async (args, { dispatch }) => {
  try {
    const data = await utils.fetchLeaderboard(args.offset, args.limit, args.from, args.to);
    return data;
  } catch (error) {
    dispatch(logoutUser());
    throw error;
  }
});

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLeaderboard.fulfilled, (state, { payload }) => {
        payload.forEach((user) => {
          user.profilePicture = user.profilePicture ?? getDefaultProfile();
        });
        state.users = payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const leaderboardSelector = (state: RootState) => state.leaderboard;

export default leaderboardSlice.reducer;
