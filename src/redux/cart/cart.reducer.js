import CartActionTypes from './cart.types';

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
        cartItems: [...state.cartItems, action.payload]  // must be NEW array in order for component to re-render, and adding the newest item to the end
      };
    default: {
      return state;
    }
  }
};

export default cartReducer;