import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';

import { Order, OrderItem, PatchOrderItemPayload } from '../types/merch';
import { getAllOrders, patchOrder } from '../actions/storeActions';
import adminOrdersReducer from '../reducers/AdminOrderReducer';

import AdminOrderPage from '../components/AdminOrderPage';
import PageLayout from './PageLayout';

const AdminOrderPageContainer: React.FC = () => {
  const [orderList, orderDispatch] = useReducer(adminOrdersReducer, []);

  /**
   * Sets a note for an orderItem.
   *
   * The function takes the original order list, finds the order in which
   * the item is in and patches it using the new note. It will also patch
   * any additional order items, should the quantity ordered in one order
   * be higher than 1.
   *
   * This requires the original order list, primarily to be able to
   * fit the order items back in the original order once we're
   * done patching the order items.
   * @param {OrderItem} newItem orderItem to add note to.
   * @param {string} note Note to add to newItem.
   */
  const setNote = (newItem: OrderItem, note: string) => {
    const newOrder = orderList.find((element: Order) => {
      return element.items.some((item: OrderItem) => item.uuid === newItem.uuid);
    });

    const newOrderItems: PatchOrderItemPayload[] = [];
    newOrderItems.push({
      uuid: newItem.uuid,
      notes: note,
    });

    if (newItem.extras !== undefined) {
      newItem.extras.forEach((extraUuid) => {
        newOrderItems.push({
          uuid: extraUuid,
          notes: note,
        });
      });
    }
    patchOrder(orderDispatch, newOrder, newOrderItems);
  };

  /**
   * Sets a note for an orderItem.
   *
   * The function takes the original order list, finds the order in which
   * the item is in, extracts the UUID and then calls the dispatch to update
   * local state's scratch note for the OrderItem.
   *
   * This requires the original order list, primarily to be able to
   * fit the order item back in the original order once we're
   * done adding the scratch note.
   *
   * Note the 'UPDATE_SCRATCH_NOTE' action DOES NOT hit the API.

   * @param {OrderItem} newItem orderItem to add scratch note to.
   * @param {string} scratchNote Scratch note to add to newItem.
   */
  const setScratchNote = (newItem: OrderItem, scratchNote: string) => {
    const orderForItem: Order = orderList.find((element: Order) => {
      return element.items.some((item: OrderItem) => item.uuid === newItem.uuid);
    });
    orderDispatch({
      type: 'UPDATE_SCRATCH_NOTE',
      order: orderForItem.uuid,
      scratchNote,
      item: newItem,
    });
  };

  /**
   * Fulfills the delivery for an orderItem.
   *
   * The function takes the original order list, finds the order in which
   * the item is in and fulfills the item delivery. It will also patch
   * any additional order items, should the quantity ordered in one order
   * be higher than 1.
   *
   * This requires the original order list, primarily to be able to
   * fit the order items back in the original order once we're
   * done patching the order items.
   *
   * @param {OrderItem} newItem orderItem to add note to.
   * @param {string} note Note to add to newItem.
   */
  const setFulfill = (newItem: OrderItem) => {
    const newOrder = orderList.find((element: Order) => {
      return element.items.some((item: OrderItem) => item.uuid === newItem.uuid);
    });

    const newOrderItems: PatchOrderItemPayload[] = [];
    newOrderItems.push({
      uuid: newItem.uuid,
      fulfilled: true,
    });

    if (newItem.extras !== undefined) {
      newItem.extras.forEach((extraUuid) => {
        newOrderItems.push({
          uuid: extraUuid,
          fulfilled: true,
        });
      });
    }
    patchOrder(orderDispatch, newOrder, newOrderItems);
  };

  useEffect(() => {
    getAllOrders(orderDispatch);
  }, []);

  /**
   * We need to refine the received order list from the API in order to assist
   * with displaying the AdminOrderPage.
   *
   * Essentially, we need a "quantity" property for each item in the order, since
   * the API returns separate OrderItems, even if they represent the same exact item.
   * After generating that property, we remove OrderItems from the state representing
   * the same item.
   * Additionally, we hold an "extras" property, which keeps the UUID's of the OrderItems
   * we removed; this helps us to later patch all the OrderItems representing that
   * item in the order in batch.
   */
  const refinedApiOrders: Order[] = orderList.map((element) => {
    // If just the one item in the order, don't change anything
    if (element.items.length === 1) {
      return element;
    }

    // If we've already defined quantity for that order, it means
    // we've passed through this processing before; skip.
    if (element.items[0].quantity !== undefined) {
      return element;
    }

    const firstOrderItem: OrderItem[] = [
      {
        ...element.items[0],
        quantity: 1,
      },
    ];

    // Copies of the original order and order items, whilst removing the first element
    // that we extracted above
    const newElement = element;
    const orderItemsWithoutFirst = element.items.slice(1);

    // Group up the order items by their item UUID, assign duplicates to "quantity"
    // and "extra" properties.
    const groupedOrderItems = orderItemsWithoutFirst.reduce((acc, curr) => {
      let newAcc = acc.slice();
      // find existing OrderItem with same item UUID
      const existingItemIndex = newAcc.findIndex(
        (itemElement) => itemElement.item.uuid === curr.item.uuid,
      );

      // if there is one...
      if (existingItemIndex !== -1) {
        // tick up quantity by 1 (or set it to 1, if undefined)
        if (newAcc[existingItemIndex].quantity === undefined) {
          newAcc[existingItemIndex].quantity = 1;
        }
        newAcc[existingItemIndex].quantity! += 1;

        // add this OrderItem to the extras of the original one we kept
        if (newAcc[existingItemIndex].extras === undefined) {
          newAcc[existingItemIndex].extras = [];
        }
        newAcc[existingItemIndex].extras!.push(curr.uuid);
      } else {
        // if there isn't one, just add it to the array, with quantity 1
        // and no extras yet.
        newAcc = [
          ...acc,
          {
            ...curr,
            extras: [],
            quantity: 1,
          },
        ];
      }
      return newAcc;
    }, firstOrderItem);
    newElement.items = groupedOrderItems;
    return newElement;
  });

  const [noteVisible, setNoteVisible] = useState(false);
  const [searchedOrders, setSearchedOrders] = useState(refinedApiOrders.slice());
  const [searched, setSearched] = useState(false);
  const orderSearchedFilter = (value: string) => {
    // Search function, simply looks for substring (case-insensitive)
    // within order user name and filters any order that don't have
    // that name.
    //
    // If search bar is empty, just pass the original set of orders
    // received from the API.
    if (value === '') {
      setSearched(false);
    } else {
      setSearched(true);
      setSearchedOrders(
        refinedApiOrders.filter((element) => {
          const nameOfOrderUser = `${element.userInfo!.firstName} ${
            element.userInfo!.lastName
          }`.toLowerCase();
          return nameOfOrderUser.includes(value.toLowerCase());
        }),
      );
    }
  };

  return (
    <PageLayout>
      <AdminOrderPage
        apiOrders={refinedApiOrders}
        setNote={setNote}
        setFulfill={setFulfill}
        searched={searched}
        setSearched={setSearched}
        searchedOrders={searchedOrders}
        setSearchedOrders={setSearchedOrders}
        searchFunc={orderSearchedFilter}
        noteVisible={noteVisible}
        setNoteVisible={setNoteVisible}
        setScratchNote={setScratchNote}
      />
    </PageLayout>
  );
};

export default connect(null, null)(AdminOrderPageContainer);
