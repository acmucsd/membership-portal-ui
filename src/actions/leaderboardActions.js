import { FETCH_LEADERBOARD, LEADERBOARD_ERROR } from './types';
import { logoutUser } from './authActions';

import Config from '../config';
import Storage from '../storage';

export const fetchLeaderboard = () => async dispatch => {
  try {
    const response = await fetch(Config.API_URL + Config.routes.leaderboard, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
    });

    const status = await response.status;
    if (status === 401 || status === 403) {
      logoutUser();
    }

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
    dispatch({
      type: FETCH_LEADERBOARD,
      payload: data.leaderboard,
    });
  } catch (error) {
    dispatch({
      type: LEADERBOARD_ERROR,
      payload: error,
    });
  }
}
