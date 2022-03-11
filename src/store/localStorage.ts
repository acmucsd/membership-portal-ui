import { Cart } from '../types';

export const loadCart = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) return {};

    const cart = JSON.parse(serializedCart);
    return cart as Cart;
  } catch (err) {
    return {};
  }
};

export const saveCart = (cart: Cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
