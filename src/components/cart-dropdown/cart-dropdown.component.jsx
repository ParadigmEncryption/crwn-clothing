import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems }) => (
  <div className='cart-dropdown'>
    <div className='cart-items' />
      {cartItems.map(cartItem => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))}
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

// const mapStateToProps = state => ({ // this works, but returns new WHOLE state and re-renders the component
//   cartItems: state.cart.cartItems
// })

// const mapStateToProps = ({ cart: { cartItems }}) => ({  // this works same as above, but cleaner syntax
//   cartItems
// })

const mapStateToProps = state => ({ // memoized selector prevents component re-render when anything but cart.cartItems changes
  cartItems: selectCartItems(state) 
});

export default connect(mapStateToProps)(CartDropdown);