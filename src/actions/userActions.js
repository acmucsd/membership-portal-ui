import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  // TODO - This is just mock data until backend is set up.
  // Once the server is up, we'll fetch data from there.

  const user = {
    name: 'Emily Nguyen',
    exp: 40,
    image: 'http://placekitten.com/g/200/200',
    level: 2,
    rank: 'Linear Lemur',
    year: 4,
  };

  dispatch({
    type: FETCH_USER,
    payload: user,
  });
};
