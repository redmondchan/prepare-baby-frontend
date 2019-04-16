import React from 'react'
import HappinessPoints from '../components/HappinessPoints'
import BabyImage from '../components/BabyImage'
import Log from '../components/Log'
import ScenarioModal from '../components/ScenarioModal'
import DropdownMenu from '../components/Dropdown'
import {Container} from 'semantic-ui-react'
import { connect } from 'react-redux'

class Parent extends React.Component{


  render(){
    return(
      <Container fluid textAlign='center'>

        <ScenarioModal />
        <DropdownMenu />

        <HappinessPoints />
        <BabyImage />
        <Log />
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    baby: state.baby
  }
}

export default connect(mapStateToProps)(Parent)
