import { CLEAR_LEADERBOARD, FETCH_LEADERBOARD, LEADERBOARD_ERROR, ThunkActionCreator } from './leaderboardTypes';
import { logoutUser } from '../auth/authActions';

import Config from '../config';
import { fetchService } from '../utils';

const fetchLeaderboard: ThunkActionCreator = (offset: number = 0, limit: number, from?: number, to?: number, resetUsers?: boolean) => async (
  dispatch,
) => {
  try {
    if (resetUsers) {
      dispatch({
        type: CLEAR_LEADERBOARD,
      });
    }
    const url = `${Config.API_URL}${Config.routes.leaderboard}?offset=${offset}&limit=${limit}${from ? `&from=${from}` : ''}${to ? `&to=${to}` : ''}`;
    const data = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
      onFailCallback: () => dispatch(logoutUser()),
    });

    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
    dispatch({
      type: FETCH_LEADERBOARD,
      payload: data.leaderboard,
      offset,
      limit,
    });
  } catch (error) {
    dispatch({
      type: LEADERBOARD_ERROR,
      payload: error,
    });
  }
};

export default fetchLeaderboard;
