import { Cart } from '../types';

export const loadCart = () => {
  try {
    console.log('loading cart from localStorage');
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
    console.log('saving cart to localStorage');
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error(err);
  }
};
