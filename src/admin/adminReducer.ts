import _ from 'lodash';
import { AnyAction } from 'redux';
import { FETCH_EMAILS } from './adminTypes';

const initialState = {
  emailsList: [],
  error: false,
};

const AdminReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_EMAILS:
      if (_.isEqual(state.emailsList, action.payload)) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        emailsList: action.payload,
      };
    default:
      return state;
  }
};

export default AdminReducer;
