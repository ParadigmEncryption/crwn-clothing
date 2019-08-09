import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
  const { setCurrentUser } = this.props;  // import and access redux action via props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { // built-in function
      if (userAuth) { // check if Snapshot has changed (probably not, since we're not changing it here)
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => { // built-in function, similar to calling onAuthStateChanged
          setCurrentUser({ // setCurrentUser replaces this.setState
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            } // get id from Snapshot, and displayName, email and createdAt from our database
          }); // get data stored in snapShot, whether user exists in database already, or if new user is created
        });
      } else {
        setCurrentUser(userAuth); 
      }   // replaces: this.setState({ currentUser: userAuth });
  })
}

  componentWillUnmount() {
    this.unsubscribeFromAuth();
      // unsubscribe from the listener we just instantiated to prevent memory leaks
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = ({ user }) => ({  // destructure user.reducer
//   currentUser: user.currentUser
// })  // same as in Header--get access to currentUser

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({ 
  setCurrentUser: user => dispatch(setCurrentUser(user))  // first 'setCurrentUser' can be any name
});  // set setCurrentUser to user by passing in argument (user), invoke setCurrentUser, and return the payload (user)

export default connect(mapStateToProps, mapDispatchToProps)(App);
    // mapStateToProps gives access to this.props.currentUser
