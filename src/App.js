import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

import './App.css';

const HatsPage = (props) => (
  <div>
    {console.log(props)}
    <h1>HATS</h1>
  </div>
)

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop/hats' component={HatsPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
