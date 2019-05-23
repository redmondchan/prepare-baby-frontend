import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import StatsModal from './StatsModal'
import {connect} from 'react-redux'
import { logOut } from '../actions/actions'
import { withRouter, Redirect } from 'react-router-dom'

class DropdownMenu extends React.Component {
  state = {
    statsModal: false
  }

  openStatsModal = () => {
    this.setState({statsModal: !this.state.statsModal})
  }

  handleLogOut = () => {
    this.props.logOut()
    this.props.history.push('/')
    // return <Redirect to="/" />)
  }

  render(){
    return(
      <Dropdown direction='left' floating labeled button className='dropdown' icon="sidebar big">
        <Dropdown.Menu className='right'>
          <Dropdown.Item onClick={this.openStatsModal}>
          {this.state.statsModal ? <StatsModal open={this.state.statsModal}/>: null}
            <Icon name='area graph' />
            <span className='text'>Stats</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={this.handleLogOut}>
            <Icon name='hand peace outline' />
            <span className='text'>Log Out</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut())
})

export default connect(null, mapDispatchToProps)(withRouter(DropdownMenu))
