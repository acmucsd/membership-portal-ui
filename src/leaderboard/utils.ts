import Config from '../config';
import { PublicProfile } from '../types';
import { fetchService } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const fetchLeaderboard = async (offset: number = 0, limit: number, from?: number, to?: number) => {
  const url = `${Config.API_URL}${Config.routes.leaderboard}?offset=${offset}&limit=${limit}${from ? `&from=${from}` : ''}${to ? `&to=${to}` : ''}`;
  const data = await fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  });

  return data.leaderboard as PublicProfile[];
};
