import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import StatsModal from './StatsModal'

class DropdownMenu extends React.Component {
  state = {
    statsModal: false
  }

  openStatsModal = () => {
    this.setState({statsModal: !this.state.statsModal})
  }
  render(){
    return(
      <Dropdown direction='left' floating labeled button className='dropdown' icon="sidebar big">
        <Dropdown.Menu className='right'>
          <Dropdown.Item onClick={this.openStatsModal}>
          {this.state.statsModal ? <StatsModal open={this.state.statsModal}/>: null}
            <Icon name='area graph' />
            <span className='text'>Stats</span>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name='dropdown' />
                <span className='text'>Still Left</span>
                <Dropdown.Menu>
                  <Dropdown.Item>1</Dropdown.Item>
                  <Dropdown.Item>2</Dropdown.Item>
                  <Dropdown.Item>3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>2</Dropdown.Item>
              <Dropdown.Item>3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon name='left dropdown' />
            <span className='text'>Left</span>
            <Dropdown.Menu>
              <Dropdown.Item>1</Dropdown.Item>
              <Dropdown.Item>2</Dropdown.Item>
              <Dropdown.Item>3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}


export default DropdownMenu
