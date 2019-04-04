import React, { Component } from 'react';
import Container from './containers/Container'
import SignUp from './containers/SignUp'
import LogIn from './containers/LogIn'
import {Switch, Route} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path= '/' component={SignUp} />
          <Route exact path= '/signin' component={LogIn} />
          <Route exact path= '/baby' component={Container} />
        </Switch>
      </div>
    );
  }
}

export default App;
