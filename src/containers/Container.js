import React from 'react'
import HappinessPoints from '../components/HappinessPoints'
import HPBar from '../components/HPBar'
import BabyImage from '../components/BabyImage'
import Log from '../components/Log'
import ScenarioModal from '../components/ScenarioModal'
import DropdownMenu from '../components/Dropdown'
import {Container} from 'semantic-ui-react'
import { connect } from 'react-redux'

class Parent extends React.Component{


  render(){
    return(
      <div className="container">

        <ScenarioModal />
        <DropdownMenu />

        <HPBar />
        <BabyImage />
        <Log />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    baby: state.baby
  }
}

export default connect(mapStateToProps)(Parent)
