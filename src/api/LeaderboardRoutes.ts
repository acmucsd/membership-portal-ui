import Config from './Config';
import FetchService from './FetchService';
import { SlidingLeaderboardQueryParams } from './ApiRequests';
import { GetLeaderboardResponse } from './ApiResponses';
import { generateQuery } from './Utils';

class LeaderboardRoutes {
  fetchService: FetchService;

  constructor(fetchService: FetchService) {
    this.fetchService = fetchService;
  }

  // @Get('/leaderboard')
  getLeaderboard = (filters: SlidingLeaderboardQueryParams): Promise<GetLeaderboardResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.leaderboard}${generateQuery(filters)}`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
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
}

export default LeaderboardRoutes;
