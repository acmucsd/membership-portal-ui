/* eslint-disable import/prefer-default-export */
import Config from '../config';
import fetchService from './fetchService';
import { generateQuery } from '../utils';
import { SlidingLeaderboardQueryParams } from './ApiRequests';
import { GetLeaderboardResponse } from './ApiResponses';

// @Get('/leaderboard')
export const getLeaderboard = (filters: SlidingLeaderboardQueryParams): Promise<GetLeaderboardResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.leaderboard}${generateQuery(filters)}`;

    fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
