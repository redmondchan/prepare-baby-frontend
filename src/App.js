import React, { Component } from 'react';
import Container from './containers/Container'
import SignUp from './containers/SignUp'
import LogIn from './containers/LogIn'
import {Switch, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from './actions/actions'
import { withRouter } from 'react-router'


class App extends Component {

  componentDidMount(){
    let token = localStorage.token
    token ? this.props.getUser(token) : this.props.history.push('/signin')
  }

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

const mapDispatchToProps = (dispatch) => ({
  getUser: (token) => dispatch(getUser(token))
})

export default connect(null, mapDispatchToProps)(withRouter(App));
