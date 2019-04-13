import React from 'react'
import HappinessPoints from '../components/HappinessPoints'
import BabyImage from '../components/BabyImage'
import Log from '../components/Log'
import ScenarioModal from '../components/ScenarioModal'
import { connect } from 'react-redux'

class Container extends React.Component{


  render(){
    return(
      <div>
        <h1>Container</h1>

        <ScenarioModal />

        <HappinessPoints />
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

export default connect(mapStateToProps)(Container)
