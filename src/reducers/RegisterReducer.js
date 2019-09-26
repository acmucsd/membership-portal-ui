import { browserHistory } from 'react-router'

import { REGISTER_USER } from '../actions/types';

const RegisterReducer = (action) => {
  switch (action.type) {
    // TODO Authentificated should not always be true.
    case REGISTER_USER:
      return ({})
    default:
      return state;
  }
};

export default RegisterReducer;
