import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { // built-in function
      if (userAuth) { // check if Snapshot has changed (probably not, since we're not changing it here)
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => { // built-in function, similar to calling onAuthStateChanged
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              } // get id from Snapshot, and displayName, email and createdAt from our database
            }, 
            () => {
              console.log(this.state); // 2nd parameter of setState makes sure the state has updated before running console.log
            }
          ); // get data stored in snapShot, whether user exists in database already, or if new user is created
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
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
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: dispatch
});

export default connect(null, mapDispatchToProps)(App);
