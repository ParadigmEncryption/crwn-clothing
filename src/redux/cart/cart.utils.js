export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem => 
      cartItem.id === cartItemToAdd.id // map new array for component to re-render
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem  // no need to re-render component
      )
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]  
    // quantity property gets attached the first time since the 'if' block won't run when it's a new item
};