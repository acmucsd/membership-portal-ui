import { FETCH_LEADERBOARD, LEADERBOARD_ERROR, ThunkActionCreator } from './leaderboardTypes';
import { logoutUser } from '../auth/authActions';

import Config from '../config';
import { fetchService } from '../utils';

const fetchLeaderboard: ThunkActionCreator = (offset: number = 0, limit: number, from?: number, to?: number) => async (dispatch) => {
  try {
    const url = `${Config.API_URL}${Config.routes.leaderboard}?offset=${offset}&limit=${limit}${from ? `&from=${from}` : ''}${to ? `&to=${to}` : ''}`;
    const data = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
      onFailCallback: () => dispatch(logoutUser()),
    });

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
