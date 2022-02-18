/* eslint-disable import/prefer-default-export */
import { FETCH_LEADERBOARD, LEADERBOARD_ERROR } from './leaderboardTypes';

import Config from '../config';
import store from '../redux';
import fetchService from '../api/fetchService';

export const fetchLeaderboard = async (offset: number = 0, limit: number, from?: number, to?: number) => {
  try {
    const url = `${Config.API_URL}${Config.routes.leaderboard}?offset=${offset}&limit=${limit}${from ? `&from=${from}` : ''}${to ? `&to=${to}` : ''}`;
    const data = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    });

    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
    store.dispatch({
      type: FETCH_LEADERBOARD,
      payload: data.leaderboard,
      offset,
      limit,
    });
  } catch (error) {
    store.dispatch({
      type: LEADERBOARD_ERROR,
      payload: error,
    });
  }
};
