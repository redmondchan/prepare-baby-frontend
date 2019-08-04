import React from 'react'
import HPBar from '../components/HPBar'
import BabyImage from '../components/BabyImage'
import Log from '../components/Log'
import ScenarioModal from '../components/ScenarioModal'
import DropdownMenu from '../components/Dropdown'
import { connect } from 'react-redux'

class Container extends React.Component{

  componentDidMount(){
    let token = localStorage.token
    if(token === undefined){
      this.props.history.push('/')
    }
  }


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

export default connect(mapStateToProps, mapDispatchToProps)(Container)
