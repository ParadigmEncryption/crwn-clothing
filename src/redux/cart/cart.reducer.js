import CartActionTypes from './cart.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = ( state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN: 
      return {
        ...state,
        hidden: !state.hidden
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,  // pass in hidden value as well
        cartItems: addItemToCart(state.cartItems, action.payload)  // must be NEW array in order for component to re-render
        // cartItems: [...state.cartItems, action.payload]  // this works, but does not account for items already in cart
      };
    default: {
      return state;
    }
  }
};

export default cartReducer;