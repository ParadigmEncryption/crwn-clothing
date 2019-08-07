import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
  // no need for a payload for a toggling action
})

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
})