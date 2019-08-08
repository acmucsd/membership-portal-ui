import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import TempReducer from './TempReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  TempReducer
});
