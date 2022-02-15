/* eslint-disable import/prefer-default-export */
import { FETCH_LEADERBOARD, LEADERBOARD_ERROR } from './leaderboardTypes';

import Config from '../config';
import { fetchService } from '../utils';

export const fetchLeaderboard = (offset: number = 0, limit: number, from?: number, to?: number) => async (dispatch) => {
  try {
    const url = `${Config.API_URL}${Config.routes.leaderboard}?offset=${offset}&limit=${limit}${from ? `&from=${from}` : ''}${to ? `&to=${to}` : ''}`;
    const data = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
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
