import { AnyAction } from 'redux';
import { GET_EMAILS } from './adminTypes';

const initialState = {
  emails: [],
  error: false,
};

const AdminReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_EMAILS:
      return {
        ...state,
        emails: action.payload.emails,
      };
    default:
      return state;
  }
};

export default AdminReducer;
