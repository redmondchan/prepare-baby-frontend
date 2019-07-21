import React from 'react'
import { Dropdown, Icon, Modal } from 'semantic-ui-react'
import StatsModal from './StatsModal'
import {connect} from 'react-redux'
import { logOut } from '../actions/actions'
import { withRouter } from 'react-router-dom'

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
          <Modal trigger={<Dropdown.Item><Icon name='question'/><span className="text">FAQ</span></Dropdown.Item>} closeIcon>
            <Modal.Header className="faq-header">FAQ</Modal.Header>
            <Modal.Content>
              <h4>How do I keep the baby's HP above 0?</h4>
                <p className='faq-p'>Feed the baby about every 3 hours and change their diaper about every 2.5 hours.</p>
              <h4>What is the heart symbol on the top right?</h4>
                <p className='faq-p'>It'll tell you how many days you've kept the baby's hp above 0.</p>
              <h4>Can I "revive" my baby?</h4>
                <p className='faq-p'>Yes, just feed or change their diaper at the right time.</p>
              <h4>How are the expenses calculated?</h4>
                <p className='faq-p'>It's a rough estimate of local prices here. At the moment, one diaper is $0.30 and one feeding is $1.50.</p>
              <h4>Can I change my baby's name?</h4>
                <p className='faq-p'>Maybe in the future. Names are currently being randomly generated through an API.</p>
            </Modal.Content>
          </Modal>
          <Dropdown.Item onClick={this.handleLogOut}>
            <Icon name='hand peace' />
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

const mapStateToProps = (state) => {
  return{
    baby: state.baby
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DropdownMenu))
