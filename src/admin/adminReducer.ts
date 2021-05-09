import _ from 'lodash';
import { AnyAction } from 'redux';
import { FETCH_EMAILS } from './adminTypes';

const initialState = {
  emailList: [],
  error: false,
};

const AdminReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_EMAILS:
      console.log('got all emails');
      console.log(action.payload);
      if (_.isEqual(state.emailList, action.payload)) {
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
