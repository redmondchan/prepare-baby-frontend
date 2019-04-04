import React from 'react'
import HappinessPoints from '../components/HappinessPoints'
import BabyImage from '../components/BabyImage'
import Log from '../components/Log'

class Container extends React.Component{
  render(){
    return(
      <div>
        <h1>Container</h1>
        <HappinessPoints />
        <BabyImage />
        <Log />
      </div>
    )
  }
}

export default Container
