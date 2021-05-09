import { AnyAction } from 'redux';

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
