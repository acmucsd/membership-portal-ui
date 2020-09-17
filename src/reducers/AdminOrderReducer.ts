import { Order } from '../types/merch';

/**
 * Reducer to keep track of AdminOrderPage's required state.
 * This is simply a reducer keeping track of all the current orders
 * from the API.
 * Three actions are supported:
 * - 'FETCH_ORDERS': get all the orders, initializes order array
 * - 'GET_SPECIFIC_ORDER': gets order by UUID; adds it to list or
 *   replaces existing order with same UUID in state. Requires Order object
 *   assigned as 'order' property in action.
 * - 'PATCH_ORDER': Takes new versions of OrderItems and stores them in their
 *   corresponding order. Requires order UUID to patch as 'order' property,
 *   new OrderItems as 'newItems' property in action.
 * - 'UPDATE_SCRATCH_NOTE': Takes a scratch note and an OrderItem and adds the
 *   scratch note to the orderItem. Additionally requires order UUID as 'order' property.
 */
export default (state: Order[], action) => {
  switch (action.type) {
    case 'FETCH_ORDERS':
      return action.orders.map((ordersElement) => {
        const order = ordersElement;
        order.items = order.items.map((itemsElement) => {
          const item = itemsElement;
          item.scratchNote = item.notes !== undefined ? item.notes : '';
          return item;
        });
        return order;
      });
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
      // get patched order from state
      const patchedOrderIndex = newState.findIndex((element) => element.uuid === action.order);
      // finds all the OrderItems received and patches any new changes
      // in the Order they can be found in
      const patchedOrderItems = newState[patchedOrderIndex].items.map((item) => {
        const patchedItemIndex = action.newItems.findIndex((element) => element.uuid === item.uuid);
        if (patchedItemIndex !== -1) {
          return {
            ...item,
            ...action.newItems[patchedItemIndex],
          };
        }
        return item;
      });
      newState[patchedOrderIndex].items = patchedOrderItems;
      return newState;
    }
    case 'UPDATE_SCRATCH_NOTE': {
      const newState = state.slice();
      // get patched order from state
      const noteOrderIndex = newState.findIndex((element) => element.uuid === action.order);
      // finds all the OrderItems received and patches any new changes
      // in the Order they can be found in
      const newOrderItems = newState[noteOrderIndex].items.map((item) => {
        if (item.uuid === action.item.uuid) {
          return {
            ...item,
            scratchNote: action.scratchNote,
          };
        }
        return item;
      });
      newState[noteOrderIndex].items = newOrderItems;
      return newState;
    }
    default:
      return state;
  }
};
