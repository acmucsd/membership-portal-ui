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
    case 'GET_RESUMES':
      return {
        ...state,
        resumes: action.payload.resumes,
      };
    default:
      return state;
  }
};

export default AdminReducer;
