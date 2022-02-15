/* eslint-disable import/prefer-default-export */
import Config from '../config';
import { notify, fetchService, generateQuery } from '../utils';
import { SlidingLeaderboardQueryParams } from './ApiRequests';
import { GetLeaderboardResponse } from './ApiResponses';

// @Get('/leaderboard')
export const fetchLeaderboard = (filters: SlidingLeaderboardQueryParams) => {
  const url = `${Config.API_URL}${Config.routes.leaderboard}${generateQuery(filters)}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetLeaderboardResponse) => {
      return data.leaderboard;
    })
    .catch((error) => {
      notify('Unable to fetch leaderboard!', error.message);
    });
};
