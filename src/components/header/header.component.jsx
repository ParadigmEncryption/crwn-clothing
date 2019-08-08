import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {
        currentUser ? (
          <div className="option" onClick={() => auth.signOut()}> {/* signOut() is a built-in method */}
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>   
        )}
        <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

// const mapStateToProps = ({ user: {currentUser}, cart: {hidden} })=> ({   // destructure nested values from state to include user and cart
//   currentUser,
//   hidden
// });   // state.user.currentUser, state.cart.hidden

// const mapStateToProps = (state) => ({   // this works, but can get repetitive, so we will use createStructuredSelector
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state)
// });

const mapStateToProps = createStructuredSelector({ // automatically passes in our top level state as arguments to the selectors
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);