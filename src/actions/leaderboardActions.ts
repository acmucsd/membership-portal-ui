import { FETCH_LEADERBOARD, LEADERBOARD_ERROR, ThunkActionCreator } from './types';
import { logoutUser } from './authActions';

import Config from '../config';
import Storage from '../storage';

const fetchLeaderboard: ThunkActionCreator = (
  offset: number = 0,
  limit: number,
  from?: number,
  to?: number,
) => async (dispatch) => {
  try {
    const response = await fetch(
      `${Config.API_URL}${Config.routes.leaderboard}?offset=${offset}&limit=${limit}${
        from ? `&from=${from}` : ''
      }${to ? `&to=${to}` : ''}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Storage.get('token')}`,
        },
      },
    );

    const { status } = response;
    if (status === 401 || status === 403) {
      dispatch(logoutUser());
    }

    const data = await response.json();
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
