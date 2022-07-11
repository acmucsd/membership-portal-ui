import backend from '../backend';

// eslint-disable-next-line import/prefer-default-export
export const fetchLeaderboard = async (offset: number = 0, limit: number, from?: number, to?: number) => {
  const data = await backend.getLeaderboard({ offset, limit, from, to });
  return data.leaderboard;
};
