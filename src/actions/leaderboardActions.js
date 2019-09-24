import { FETCH_LEADERBOARD } from './types';

export const fetchLeaderboard = () => async dispatch => {
  // TODO - Submit a request to get all users.

  const users = [
    {
      firstName: 'Emily',
      lastName: 'Nguyen',
      points: 200,
      image: 'http://placekitten.com/g/200/300',
      rank: 'Linear Lemur',
    },
    {
      firstName: 'Sumeet',
      lastName: 'Bansal',
      points: 125,
      image: 'http://placekitten.com/g/200/300',
      rank: 'Linear Lemur',
    },
    {
      firstName: 'Jaden',
      lastName: 'Padua',
      points: 225,
      image: 'http://placekitten.com/g/200/300',
      rank: 'Linear Lemur',
    },
    {
      firstName: 'Ronak',
      lastName: 'Shah',
      points: 50,
      image: 'http://placekitten.com/g/200/300',
      rank: 'Linear Lemur',
    },
    {
      firstName: 'Stanley',
      lastName: 'Lee',
      points: 80,
      image: 'http://placekitten.com/g/200/300',
      rank: 'Linear Lemur',
    }
  ]

  dispatch({
    type: FETCH_LEADERBOARD,
    payload: users,
  });
}
