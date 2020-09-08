import { Order } from '../types/merch';

export const adminOrdersReducer = (state: Order[], action) => {
  switch (action.type) {
    case 'FETCH_ORDERS':
      return action.orders;
    case 'GET_SPECIFIC_ORDER': {
      const newState = state.slice();
      const orderIndex = newState.findIndex((element) => element.uuid === action.order.uuid);
      if (orderIndex !== -1) {
        newState[orderIndex] = action.order;
      } else {
        newState.push(action.order);
      }
      return newState;
    }
    case 'PATCH_ORDER': {
      const newState = state.slice();
      const patchedOrderIndex = newState.findIndex((element) => element.uuid === action.order);
      const patchedOrderItems = newState[patchedOrderIndex].items.map((item) => {
        const patchedItemIndex = action.newItems.findIndex((element) => element.uuid === item.uuid);
        if (patchedItemIndex !== -1) {
          return {
            ...action.newItems[patchedItemIndex],
            ...item,
          };
        } else {
          return item;
        }
      });
      newState[patchedOrderIndex].items = patchedOrderItems;
      return newState;
    }
    default:
      return state;
  }
};
