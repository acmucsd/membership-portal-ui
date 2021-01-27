import { AnyAction } from 'redux';
import {} from './adminTypes';

const initialState = {
  error: false,
};

const AdminReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default AdminReducer;
