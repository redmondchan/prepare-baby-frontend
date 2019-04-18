import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import Container from './containers/Container'
import Landing from './containers/Landing'
import {Switch, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from './actions/actions'
import { withRouter } from 'react-router'


class App extends Component {

  componentDidMount(){
    let token = localStorage.token
    token ? this.props.getUser(token) : this.props.history.push('/')
  }

  render() {
    return (
        <Switch>
          <Route exact path= '/' component={Landing} />
          <Route exact path= '/baby' component={Container} />
        </Switch>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUser: (token) => dispatch(getUser(token))
})

export default connect(null, mapDispatchToProps)(withRouter(App));
